// ===================================================================
// RAGNAROK ASPD SYSTEM
// ===================================================================
// Formula: ASPD = Base_ASPD + floor(AGI / 4) + floor(DEX / 4)
// Capped at 190 max ASPD
// ===================================================================

// ===================================================================
// BASE ASPD TABLE
// null = weapon not usable by that class
// ===================================================================

const BASE_ASPD_TABLE = {
  //                        nov   swd   mag   arc   aco   mer   thi
  "bare_handed":          [ 150,  160,  150,  160,  160,  160,  160 ],
  "dagger":               [ 135,  150,  140,  140, null,  140,  150 ],
  "sword_1h":             [ 130,  145, null, null, null,  130,  135 ],
  "sword_2h":             [null,  140, null, null, null, null, null  ],
  "spear_1h":             [null,  135, null, null, null, null, null  ],
  "spear_2h":             [null,  130, null, null, null, null, null  ],
  "axe_1h":               [ 120,  130, null, null, null,  130,  120 ],
  "axe_2h":               [null,  125, null, null, null,  125, null  ],
  "mace_1h":              [ 130,  135, null, null,  140,  130, null  ],
  "mace_2h":              [ 130,  130, null, null,  140,  130, null  ],
  "rod_staff":            [ 135, null,  130, null,  140, null, null  ],
  "rod_2h":               [ 135, null,  130, null,  140, null, null  ],
  "bow":                  [null, null, null,  130, null, null,  120 ],
};

// ===================================================================
// BTBA TABLE (Base Time Between Attacks)
// Mirrors JobData.WeaponBTBAs from the C# backend
// null = weapon not usable by that class
// ===================================================================

const BTBA_TABLE = {
  //                        nov    swd    mag    arc    aco    mer    thi
  "bare_handed":          [ 1.0,   0.8,   1.0,   0.8,   0.8,   0.8,   0.8  ],
  "dagger":               [ 1.3,   1.0,   1.2,   1.2,  null,   1.2,   1.0  ],
  "sword_1h":             [ 1.4,   1.1,  null,  null,  null,   1.4,   1.3  ],
  "sword_2h":             [null,   1.2,  null,  null,  null,  null,  null  ],
  "spear_1h":             [null,   1.3,  null,  null,  null,  null,  null  ],
  "spear_2h":             [null,   1.4,  null,  null,  null,  null,  null  ],
  "axe_1h":               [ 1.6,   1.4,  null,  null,  null,   1.4,   1.6  ],
  "axe_2h":               [null,   1.5,  null,  null,  null,   1.5,  null  ],
  "mace_1h":              [ 1.4,   1.3,  null,  null,   1.2,   1.4,  null  ],
  "mace_2h":              [ 1.4,   1.4,  null,  null,   1.2,   1.4,  null  ],
  "rod_staff":            [ 1.3,  null,   1.4,  null,   1.2,  null,  null  ],
  "rod_2h":               [ 1.3,  null,   1.4,  null,   1.2,  null,  null  ],
  "bow":                  [null,  null,  null,   1.4,  null,  null,   1.6  ],
};


// Class index map — must match the job-select option values in HTML
const CLASS_INDEX = {
  novice:    0,
  swordsman: 1,
  magician:  2,
  archer:    3,
  acolyte:   4,
  merchant:  5,
  thief:     6,
};

// Human-readable weapon labels (for UI population)
const WEAPON_LABELS = {
  bare_handed: "Bare Handed",
  dagger:      "Dagger",
  sword_1h:    "Sword (One Handed)",
  sword_2h:    "Sword (Two Handed)",
  spear_1h:    "Spear (One Handed)",
  spear_2h:    "Spear (Two Handed)",
  axe_1h:      "Axe (One Handed)",
  axe_2h:      "Axe (Two Handed)",
  mace_1h:     "Mace (One Handed)",
  mace_2h:     "Mace (Two Handed)",
  rod_staff:   "Rod / Staff",
  rod_2h:      "Rod (Two Handed)",
  bow:         "Bow",
};

// ===================================================================
// ASPD FORMULA  (matches C# UpdateAspd exactly)
// wd               = 50 * btba
// agiReduction     = floor((wd * agi) / 25)
// dexReduction     = floor((wd * dex) / 100)
// delayAfterStats  = (wd - (agiReduction + dexReduction)) / 10
// internalAspd     = 200 - delayAfterStats
// offset           = 45 + ((btba - 1.0) * 45)
// displayAspd      = floor(internalAspd - offset)   capped at 190
// ===================================================================
/**
 * @param {string} job        - e.g. "swordsman"
 * @param {string} weapon     - e.g. "sword_1h"
 * @param {number} agi        - character AGI stat
 * @param {number} dex        - character DEX stat
 * @param {number} aspdBonus  - flat speed-modifier bonus from potions (0, 6, 12, or 17)
 * @returns {number|null}     - final ASPD (capped 0–199), or null if weapon unusable
 */
 function calculateASPD(job, weapon, agi, dex, aspdBonus = 0) {
  const classIdx = CLASS_INDEX[job];
  if (classIdx === undefined) return null;

  const aspdRow = BASE_ASPD_TABLE[weapon];
  if (!aspdRow) return null;

  const baseASPD = aspdRow[classIdx];
  if (baseASPD === null) return null;

  // RateMyServer formula
  const finalASPD = baseASPD
    + Math.floor(agi / 4)
    + Math.floor(dex / 4)
    + aspdBonus;

  return Math.min(190, finalASPD);
}

// ===================================================================
// POTION ASPD BONUS TABLE
// ===================================================================

const POTION_ASPD_BONUS = {
  "":          0,
  "1":         6,   // Concentration Potion
  "2":        12,   // Awakening Potion
  "3":        17,   // Berserk Potion
};

// ===================================================================
// WEAPON SELECTOR POPULATION
// Populates the weapon <select> with only weapons valid for the class
// ===================================================================

/**
 * Rebuild the weapon dropdown based on the currently selected job.
 *
 * @param {string} job            - e.g. "swordsman"
 * @param {HTMLSelectElement} sel - the weapon <select> element
 */
 function populateWeaponSelect(job, sel) {
  const classIdx = CLASS_INDEX[job];
  if (classIdx === undefined) return;

  // Guard: sel may be null if called from stats.js override path
  if (!sel) return;

  const currentVal = sel.value;
  sel.innerHTML = "";

  for (const [weaponKey, label] of Object.entries(WEAPON_LABELS)) {
    const row  = BASE_ASPD_TABLE[weaponKey];
    const btbaRow = BTBA_TABLE[weaponKey];
    // Skip if unusable by either table
    if (!row || row[classIdx] === null) continue;
    if (!btbaRow || btbaRow[classIdx] === null) continue;

    const opt = document.createElement("option");
    opt.value = weaponKey;
    opt.textContent = label;
    sel.appendChild(opt);
  }

  if ([...sel.options].some(o => o.value === currentVal)) {
    sel.value = currentVal;
  } else {
    sel.value = "bare_handed";
  }
}

// ===================================================================
// INTEGRATION HOOKS
// Call these from stats.js where appropriate
// ===================================================================

/**
 * Read current job string from the job-select dropdown.
 * Maps the numeric option values back to job names.
 */
function getCurrentJob() {
  return JOB_MAP[val] ?? "novice";
}

/**
 * Read current weapon from the weapon selector.
 */
function getCurrentWeapon() {
  const weaponSel = document.querySelector(".weapon-selector select");
  return weaponSel?.value || "bare_handed";
}

/**
 * Read current speed potion bonus.
 */
function getPotionASPDBonus() {
  const potionSel = document.querySelector('select[name="levels"].level-select');
  // More specific: target the speed potion select inside .items-row
  const potionSelSpecific = document.querySelector(".items-row .level-select");
  const val = potionSelSpecific?.value ?? "";
  return POTION_ASPD_BONUS[val] ?? 0;
}

/**
 * Full ASPD update — call this inside updateUI() in stats.js
 * instead of whatever is currently setting attackSpeedInput.
 *
 * @param {object} character - the character object from stats.js
 */
 function updateASPD(character) {
  const job    = character.job;
  const weapon = character.weaponKey || "bare_handed";

  // Use effective stats (base + job level bonuses) — mirrors C# totalAgi / totalDex
  const jobBonuses = calculateJobBonuses(character.job, character.jobLevel);
  const agi = character.stats.agi + (jobBonuses.agi || 0);
  const dex = character.stats.dex + (jobBonuses.dex || 0);

  // Potion bonus
  const POTION_MAP = { "": 0, "1": 6, "2": 12, "3": 17 };
  const bonus = POTION_MAP[character.potionVal ?? ""] ?? 0;

  const aspd = calculateASPD(job, weapon, agi, dex, bonus);

  if (elements?.attackSpeedInput) {
    elements.attackSpeedInput.value = aspd !== null ? aspd : "—";
  }

  return aspd;
}

// ===================================================================
// EVENT LISTENERS FOR ASPD TRIGGERS
// Call attachASPDListeners() inside initialize() in stats.js
// ===================================================================

function attachASPDListeners() {
  const jobSelect    = document.querySelector(".job-select");
  const weaponSel    = document.querySelector(".weapon-selector select");
  const potionSel    = document.querySelector(".items-row .level-select");

  // When job changes: repopulate weapon list, then recalc
  jobSelect?.addEventListener("change", () => {
    const job = getCurrentJob();
    if (weaponSel) populateWeaponSelect(job, weaponSel);
    updateASPD(character);
  });

  // When weapon changes: recalc
  weaponSel?.addEventListener("change", () => updateASPD(character));

  // When potion changes: recalc
  potionSel?.addEventListener("change", () => updateASPD(character));

  // Initial population of weapon dropdown
  if (weaponSel) {
    populateWeaponSelect(getCurrentJob(), weaponSel);
  }
}