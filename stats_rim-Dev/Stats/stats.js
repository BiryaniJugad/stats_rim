// ===================================================================
// RAGNAROK STAT SYSTEM  —  stats.js
// Wired to new index.html
// Depends on: HPCalc.js, jobBonus.js, aspd.js, regen.js, combat.js
// ===================================================================

// ===================================================================
// STAT POINT MATH
// ===================================================================

function getPointsForLevel(level) {
  if (level <= 4)  return 3;
  if (level >= 95) return 22;
  return Math.floor((level - 1) / 5) + 3;
}

function getTotalStatPointsForLevel(level) {
  const STARTING = 48;
  if (level === 1) return STARTING;
  let total = STARTING;
  for (let i = 2; i <= level; i++) total += getPointsForLevel(i);
  return total;
}

function getStatIncreaseCost(currentStatValue) {
  return Math.min(Math.floor((currentStatValue - 1) / 10) + 2, 11);
}

function getTotalCostToReachStat(fromStat, toStat) {
  let cost = 0;
  for (let i = fromStat; i < toStat; i++) cost += getStatIncreaseCost(i);
  return cost;
}

// ===================================================================
// JOB MAP  (dropdown selectVal → job string used by combat.js etc.)
// HTML li: selectJob('Swordsman', 'swordsman.png', '1')
//   ''  → novice
//   '1' → swordsman
//   '2' → magician   (HTML calls it "Mage" but internals use "magician")
//   '3' → archer
//   '4' → thief       ← NOTE: HTML order has Thief at '4', Acolyte at '5'
//   '5' → acolyte
//   '6' → merchant
// ===================================================================

const JOB_MAP = {
  "":  "novice",
  "1": "swordsman",
  "2": "magician",
  "3": "archer",
  "4": "thief",
  "5": "acolyte",
  "6": "merchant",
};

// Max job level per class
const JOB_MAX_LEVEL = {
  novice: 9, swordsman: 50, magician: 50,
  archer: 50, acolyte: 50, merchant: 50, thief: 50,
};

// ===================================================================
// CHARACTER STATE
// ===================================================================

const character = {
  baseLevel:       1,
  jobLevel:        0,
  job:             "novice",      // string used by HPCalc / jobBonus / aspd
  weaponKey:       "bare_handed", // current weapon — read by getCurrentWeapon()
  potionVal:       "",            // current potion — read by getPotionASPDBonus()
  stats:    { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
  availablePoints: 48,
  currentHPFrac:   1,
  currentSPFrac:   1,
};

// ===================================================================
// ASPD BRIDGE
// aspd.js calls getCurrentJob(), getCurrentWeapon(), getPotionASPDBonus()
// and uses `elements.attackSpeedInput`.
// We expose all of those here so aspd.js works without modification.
// ===================================================================

// Hidden <select> elements that keep the real values
// (the visual custom dropdowns update these hidden selects)
const _hiddenJobSel    = (() => { const s = document.createElement("select"); return s; })();
const _hiddenWeaponSel = (() => { const s = document.createElement("select"); return s; })();
const _hiddenPotionSel = (() => { const s = document.createElement("select"); return s; })();

// `elements` object that aspd.js reads
const elements = {
  get attackSpeedInput() { return document.getElementById("aspd-value"); }
};

function getCurrentJob()   { return character.job; }
function getCurrentWeapon(){ return character.weaponKey || "bare_handed"; }
function getPotionASPDBonus() {
  const POTION_MAP = { "": 0, "1": 6, "2": 12, "3": 17 };
  return POTION_MAP[character.potionVal ?? ""] ?? 0;
}

// ===================================================================
// JOB INFO  (for the Info tab card)
// ===================================================================

const JOB_INFO = {
  novice: {
    badge: "Beginner Class",
    desc: "The <strong>Novice</strong> is the starting class for all adventurers. Armed with little more than courage, the Novice stands at the threshold of a grand journey and can advance to any first class.",
    traits: [["⚔️","Balanced base stats"],["🛡️","Can advance to any class"],["✨","High potential growth"],["📖","Starts with 48 status points"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,030",
  },
  swordsman: {
    badge: "1st Class — Warrior",
    desc: "The <strong>Swordsman</strong> is a front-line warrior who excels in physical combat. High HP and VIT make them tough to kill.",
    traits: [["⚔️","High STR & VIT growth"],["🛡️","Excellent HP pool"],["🗡️","Wide weapon variety"],["📈","Advances to Knight / Crusader"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,830",
  },
  magician: {
    badge: "1st Class — Mage",
    desc: "The <strong>Magician</strong> wields devastating elemental magic. With the highest INT growth, they deal massive MATK at the cost of low HP.",
    traits: [["🔥","Highest INT bonus"],["💥","Powerful AOE spells"],["🧪","SP-hungry caster"],["📈","Advances to Wizard / Sage"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,230",
  },
  archer: {
    badge: "1st Class — Ranger",
    desc: "The <strong>Archer</strong> attacks from range with exceptional DEX, making them reliable damage-dealers with high HIT and FLEE.",
    traits: [["🏹","Highest DEX bonus"],["👟","Strong AGI & FLEE"],["🎯","High HIT accuracy"],["📈","Advances to Hunter / Bard / Dancer"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,630",
  },
  acolyte: {
    badge: "1st Class — Healer",
    desc: "The <strong>Acolyte</strong> serves as healer and support. Their INT and SP pool give them strong recovery skills.",
    traits: [["💚","Strong HP and SP regen"],["🙏","Support & heal focused"],["📿","High LUK growth"],["📈","Advances to Priest / Monk"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,430",
  },
  merchant: {
    badge: "1st Class — Trader",
    desc: "The <strong>Merchant</strong> combines combat skill with economic prowess. High STR and a large weight limit make them self-sufficient.",
    traits: [["💪","High STR & carry weight"],["🪙","Best weight limit"],["🔨","Axe & mace specialist"],["📈","Advances to Blacksmith / Alchemist"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,830"
  },
  thief: {
    badge: "1st Class — Rogue",
    desc: "The <strong>Thief</strong> relies on speed and cunning. High AGI gives them exceptional FLEE and attack speed.",
    traits: [["💨","Highest AGI bonus"],["🗡️","Fast attack speed"],["👻","High FLEE & dodge"],["📈","Advances to Assassin / Rogue"]],
    expBase: "100%", expJob: "100%",
    weightLimit: "2,430",
  },
};

// ===================================================================
// POINT ACCOUNTING
// ===================================================================

function calcRemainingWithChange(statName, newValue) {
  const total = getTotalStatPointsForLevel(character.baseLevel);
  const spent = Object.keys(character.stats).reduce((sum, s) => {
    const v = s === statName ? newValue : character.stats[s];
    return sum + getTotalCostToReachStat(1, v);
  }, 0);
  const penalty = character.baseLevel >= 95 ? 1 : 0;
  return total - spent - penalty;
}

function trySetStat(statName, newValue) {
  newValue = Math.max(1, Math.min(99, parseInt(newValue) || 1));
  const remaining = calcRemainingWithChange(statName, newValue);
  if (remaining < 0) return false;
  character.stats[statName] = newValue;
  character.availablePoints = remaining;
  updateUI();
  return true;
}

// ===================================================================
// LEVEL UPDATE
// ===================================================================

function updateLevel(newLevel) {
  newLevel = Math.max(1, Math.min(99, parseInt(newLevel) || 1));
  character.baseLevel = newLevel;
  const total = getTotalStatPointsForLevel(newLevel);
  const spent = Object.values(character.stats).reduce(
    (sum, v) => sum + getTotalCostToReachStat(1, v), 0
  );
  const penalty = newLevel >= 95 ? 1 : 0;
  character.availablePoints = Math.max(0, total - spent - penalty);
  updateUI();
}

// ===================================================================
// JOB LEVEL DROPDOWN BUILDER
// Builds the visual <ul> list for the custom job-level dropdown
// ===================================================================

function updateJobLevelOptions(job) {
  const max = JOB_MAX_LEVEL[job] ?? 0;

  const visualList = document.getElementById("jl-menu-list");
  if (visualList) {
    visualList.innerHTML = "";

    const liNone = document.createElement("li");
    liNone.textContent = "—";
    liNone.onclick = () => selectJobLevel(0);
    visualList.appendChild(liNone);

    for (let i = 1; i <= max; i++) {
      const li = document.createElement("li");
      li.textContent = i;
      li.onclick = () => selectJobLevel(i);
      visualList.appendChild(li);
    }
  }
}

function selectJobLevel(numVal) {
  character.jobLevel = numVal;

  const display = document.getElementById("current-jl");
  if (display) display.textContent = numVal > 0 ? numVal : "—";

  const dibJL = document.getElementById("dib-job-level");
  if (dibJL) dibJL.textContent = numVal > 0 ? numVal : "—";

  document.getElementById("jobLevelDropdown")?.classList.remove("active");
  updateUI();
}

// ===================================================================
// JOB SELECT  (called by the visual dropdown <li> onclick)
// selectJob('Swordsman', 'swordsman.png', '1')
// ===================================================================

function selectJob(displayName, fileName, selectVal) {
  // Update visual elements
  const curJob = document.getElementById("current-job");
  if (curJob) curJob.textContent = displayName;

  const title = document.getElementById("character-title");
  if (title) title.textContent = displayName.toUpperCase();

  const img = document.getElementById("character-img");
  if (img) img.src = `../images/${fileName}`;

  // Update character state
  character.job      = JOB_MAP[selectVal] ?? "novice";
  character.jobLevel = 0;

  // Reset job level display
  const curJL = document.getElementById("current-jl");
  if (curJL) curJL.textContent = "—";
  const dibJL = document.getElementById("dib-job-level");
  if (dibJL) dibJL.textContent = "—";

  // Close job dropdown
  document.getElementById("jobDropdown")?.classList.remove("active");

  // Rebuild job level options for new class
  updateJobLevelOptions(character.job);

  // Rebuild weapon dropdown for new class
  populateWeaponSelect(character.job);

  updateUI();
}

// ===================================================================
// WEAPON SELECT  (called by visual <li> onclick)
// ===================================================================

function selectWeapon(weaponLabel) {
  // Find the weapon key from the human-readable label
  const entry = Object.entries(WEAPON_LABELS).find(([, lbl]) => lbl === weaponLabel);
  const weaponKey = entry ? entry[0] : "bare_handed";

  // Store on character — this is what getCurrentWeapon() reads
  character.weaponKey = weaponKey;

  const curW = document.getElementById("current-weapon");
  if (curW) curW.textContent = WEAPON_LABELS[weaponKey] ?? weaponLabel;

  document.getElementById("weaponDropdown")?.classList.remove("active");
  updateASPD(character);
}

// Override populateWeaponSelect from aspd.js to build the visual <ul>
// and keep character.weaponKey in sync — no hidden <select> needed.
function populateWeaponSelect(job) {
  const classIdx = CLASS_INDEX[job];

  const visualList = document.querySelector(".weapon-menu");
  if (visualList) visualList.innerHTML = "";

  let currentKeyStillValid = false;

  for (const [weaponKey, label] of Object.entries(WEAPON_LABELS)) {
    const row  = BASE_ASPD_TABLE[weaponKey];
    const aspd = row[classIdx];
    if (aspd === null) continue; // not usable by this class

    if (weaponKey === character.weaponKey) currentKeyStillValid = true;

    if (visualList) {
      const li = document.createElement("li");
      li.textContent = label;
      li.onclick = () => {
        character.weaponKey = weaponKey;
        const curW = document.getElementById("current-weapon");
        if (curW) curW.textContent = label;
        document.getElementById("weaponDropdown")?.classList.remove("active");
        updateASPD(character);
      };
      visualList.appendChild(li);
    }
  }

  // If previous weapon isn't valid for this class, reset to bare_handed
  if (!currentKeyStillValid) {
    character.weaponKey = "bare_handed";
    const curW = document.getElementById("current-weapon");
    if (curW) curW.textContent = WEAPON_LABELS["bare_handed"];
  }
}

// ===================================================================
// DROPDOWN TOGGLE HELPERS
// (Defined here — override any stub versions in regen.js)
// ===================================================================

function toggleMenu() {
  document.getElementById("jobDropdown")?.classList.toggle("active");
}

function toggleJobLevelMenu() {
  document.getElementById("jobLevelDropdown")?.classList.toggle("active");
}

function toggleWeaponMenu() {
  document.getElementById("weaponDropdown")?.classList.toggle("active");
}

function togglePotionMenu() {
  document.getElementById("potionDropdown")?.classList.toggle("active");
}

function selectPotion(displayName, val) {
  character.potionVal = val;
  const display = document.getElementById("current-potion");
  if (display) display.textContent = displayName;
  document.getElementById("potionDropdown")?.classList.remove("active");
  updateASPD(character);
}

// ===================================================================
// INFO TAB UPDATE
// ===================================================================

function updateInfoTab(job) {
  const info        = JOB_INFO[job] ?? JOB_INFO.novice;
  const displayName = job.charAt(0).toUpperCase() + job.slice(1);
  const wl          = JOB_INFO[job] ?? JOB_INFO.novice;

  const infoTitle   = document.getElementById("info-job-title");
  const infoBadge   = document.getElementById("info-class-badge");
  const infoDesc    = document.getElementById("info-job-desc");
  const infoTraits  = document.getElementById("info-job-traits");
  const infoExpBase = document.getElementById("info-exp-base");
  const infoExpJob  = document.getElementById("info-exp-job");
  const infoWeight  = document.getElementById("info-weight-limit");

  if (infoTitle)   infoTitle.textContent  = displayName.toUpperCase();
  if (infoBadge)   infoBadge.textContent  = info.badge;
  if (infoDesc)    infoDesc.innerHTML     = info.desc;
  if (infoExpBase) infoExpBase.textContent= info.expBase;
  if (infoExpJob)  infoExpJob.textContent = info.expJob;
  if (infoWeight)  infoWeight.textContent = wl.weightLimit;

  if (infoTraits) {
    infoTraits.innerHTML = info.traits
      .map(([icon, text]) =>
        `<div class="info-trait"><span class="info-trait-icon">${icon}</span><span>${text}</span></div>`)
      .join("");
  }
}

// ===================================================================
// MAIN UI UPDATE
// ===================================================================

function updateUI() {
  // calculateCombatStats comes from combat.js — pass full character
  const cs = calculateCombatStats(character);

  // ── HP ────────────────────────────────────────────────────────────
  const maxHP = cs.maxHP;
  const curHP = Math.round(maxHP * character.currentHPFrac);

  const hpFill = document.getElementById("hp-bar-fill");
  if (hpFill) hpFill.style.width = `${Math.round((curHP / maxHP) * 100)}%`;

  // Bar text inputs: first = HP, second = SP
  const barInputs = document.querySelectorAll(".bar-text-input");
  if (barInputs[0]) barInputs[0].value = `${maxHP} / ${maxHP}`;

  // Dedicated HP value display (id="hp-value")
  const hpValueEl = document.getElementById("hp-value");
  if (hpValueEl) hpValueEl.textContent = maxHP;

  // ── SP ────────────────────────────────────────────────────────────
  const maxSP = cs.maxSP;
  const curSP = Math.round(maxSP * character.currentSPFrac);

  const spFill = document.getElementById("sp-bar-fill");
  if (spFill) spFill.style.width = `${Math.round((curSP / maxSP) * 100)}%`;

  if (barInputs[1]) barInputs[1].value = `${maxSP} / ${maxSP}`;

  // Dedicated SP value display (id="sp-value")
  const spValueEl = document.getElementById("sp-value");
  if (spValueEl) spValueEl.textContent = maxSP;

  // ── Combat stat inputs ────────────────────────────────────────────
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };

  set("d-atk",       cs.attack);
  set("d-atk-bonus", 0);           // equipment bonus placeholder
  set("d-matk-min",  cs.matkMin);
  set("d-matk-max",  cs.matkMax);
  set("d-hit",       cs.hit);
  set("d-crit",      cs.crit);
  set("d-def-base",  0);           // equipment DEF placeholder
  set("d-def",       cs.defense);
  set("d-mdef-base", 0);           // equipment MDEF placeholder
  set("d-mdef",      cs.mdefBase);
  set("d-flee",      cs.flee);
  set("d-flee-luk",  Math.floor((character.stats.luk + (calculateJobBonuses(character.job, character.jobLevel).luk || 0) + 10) * 10 / 100));

  // ── ASPD (via aspd.js) ────────────────────────────────────────────
  updateASPD(character);

  // ── Status Points ─────────────────────────────────────────────────
  const spDisplay = document.querySelector(".status-value");
  if (spDisplay) spDisplay.value = character.availablePoints;

  // ── Stat rows (inputs + +/- buttons) ─────────────────────────────
  const statOrder  = ["str", "agi", "vit", "int", "dex", "luk"];
  const jobBonuses = calculateJobBonuses(character.job, character.jobLevel);

  statOrder.forEach(s => {
    const row = document.querySelector(`.table-row[data-stat="${s}"]`);
    if (!row) return;

    const val       = character.stats[s];
    const cost      = getStatIncreaseCost(val);
    const canAfford = character.availablePoints >= cost;
    const bonus     = jobBonuses[s] || 0;

    const input    = row.querySelector(".stat-input");
    const btnPlus  = row.querySelector(".stat-btn.plus");
    const btnMinus = row.querySelector(".stat-btn.minus");

    if (input)    input.value        = val;
    if (btnPlus)  btnPlus.disabled   = !canAfford || val >= 99;
    if (btnMinus) btnMinus.disabled  = val <= 1;

    // Second column: bonus + cost
    // The second .column rows are siblings — find matching index
    const allColumns = document.querySelectorAll(".stats-grid .column");
    const idx        = statOrder.indexOf(s);

    // Bonus column (2nd .column)
    const bonusRow = allColumns[1]?.querySelectorAll(".table-row")[idx];
    if (bonusRow) {
      const symSpan = bonusRow.querySelector(".symbol");
      if (symSpan) symSpan.textContent = `+ ${bonus}`;
    }

    // Points Req. column (3rd .column)
    const costRow = allColumns[2]?.querySelectorAll(".table-row")[idx];
    if (costRow) {
      const valSpan = costRow.querySelector(".value");
      if (valSpan) valSpan.textContent = cost;
    } 
  });

  // ── Weight ────────────────────────────────────────────────────────
  const baseWeight  = getWeightLimit(character.job);
  const totalWeight = baseWeight + character.stats.str * 30;
  const wDisplay    = document.getElementById("weight-display");
  if (wDisplay) wDisplay.textContent = totalWeight.toLocaleString();

  // ── Level / Job Level display ─────────────────────────────────────
  const levelInput = document.getElementById("base-level");
  if (levelInput && document.activeElement !== levelInput) {
    levelInput.value = character.baseLevel;
  }

  const dibBL = document.getElementById("dib-base-level");
  if (dibBL) dibBL.textContent = character.baseLevel;

  // ── HP / SP Regen ─────────────────────────────────────────────────
  const effVIT = character.stats.vit + (jobBonuses.vit || 0);
  const effINT = character.stats.int + (jobBonuses.int || 0);
  const hpr = calculateHPRegen(maxHP, effVIT);
  const spr = calculateSPRegen(maxSP, effINT);

  const hpRegenEl = document.querySelector(".dib-regen-item:nth-child(1) .dib-regen");
  const spRegenEl = document.querySelector(".dib-regen-item:nth-child(2) .dib-regen");
  if (hpRegenEl) hpRegenEl.textContent = `${hpr} per 6s standing · per 3s sitting`;
  if (spRegenEl) spRegenEl.textContent = `${spr} per 8s standing · per 4s sitting`;

  // ── Info tab ──────────────────────────────────────────────────────
  updateInfoTab(character.job);
}

// ===================================================================
// TAB SWITCHER
// ===================================================================

function switchTab(evt, tabId) {
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab-item").forEach(b => b.classList.remove("active"));
  document.getElementById(tabId)?.classList.add("active");
  evt.currentTarget.classList.add("active");
}

// ===================================================================
// EVENT LISTENERS
// ===================================================================

function attachEventListeners() {
  const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];

  // ── +/- buttons ───────────────────────────────────────────────────
  statOrder.forEach(statName => {
    const row = document.querySelector(`.table-row[data-stat="${statName}"]`);
    if (!row) return;

    const btnPlus  = row.querySelector(".stat-btn.plus");
    const btnMinus = row.querySelector(".stat-btn.minus");
    const input    = row.querySelector(".stat-input");

    btnPlus?.addEventListener("click", () => {
      const cur  = character.stats[statName];
      const cost = getStatIncreaseCost(cur);
      if (character.availablePoints >= cost && cur < 99) trySetStat(statName, cur + 1);
    });

    btnMinus?.addEventListener("click", () => {
      const cur = character.stats[statName];
      if (cur > 1) trySetStat(statName, cur - 1);
    });

    // Direct text input editing
    input?.addEventListener("input", e => {
      let raw = e.target.value.replace(/\D/g, "");
      if (raw === "") { e.target.value = ""; return; }
      let req = Math.max(1, Math.min(99, parseInt(raw)));

      const total  = getTotalStatPointsForLevel(character.baseLevel);
      const others = Object.keys(character.stats).reduce(
        (sum, s) => s === statName ? sum : sum + getTotalCostToReachStat(1, character.stats[s]), 0
      );
      let maxAllowed = 1;
      for (let i = 1; i <= 99; i++) {
        if (others + getTotalCostToReachStat(1, i) <= total) maxAllowed = i;
        else break;
      }
      if (req > maxAllowed) {
        req = maxAllowed;
        row.classList.add("stat-error");
        setTimeout(() => row.classList.remove("stat-error"), 300);
      }
      e.target.value = req;
      trySetStat(statName, req);
    });

    input?.addEventListener("blur", () => {
      if (!input.value || parseInt(input.value) < 1) trySetStat(statName, 1);
    });
  });

  // ── Base level input ──────────────────────────────────────────────
  const levelInput = document.getElementById("base-level");
  levelInput?.addEventListener("input", e => {
    const cleaned = e.target.value.replace(/[^0-9]/g, "");
    if (cleaned === "") { e.target.value = ""; return; }
    const val = Math.max(1, Math.min(99, parseInt(cleaned, 10)));
    e.target.value = val;
    updateLevel(val);
  });
  levelInput?.addEventListener("blur", () => {
    if (!levelInput.value || parseInt(levelInput.value) < 1) updateLevel(1);
  });

  // ── Close dropdowns on outside click ─────────────────────────────
  window.addEventListener("click", e => {
    if (!e.target.closest("#jobDropdown"))      document.getElementById("jobDropdown")?.classList.remove("active");
    if (!e.target.closest("#weaponDropdown"))   document.getElementById("weaponDropdown")?.classList.remove("active");
    if (!e.target.closest("#jobLevelDropdown")) document.getElementById("jobLevelDropdown")?.classList.remove("active");
    if (!e.target.closest("#potionDropdown"))   document.getElementById("potionDropdown")?.classList.remove("active");
  });
}

// ===================================================================
// INIT
// ===================================================================

function initialize() {
  // Build initial weapon dropdown for novice
  populateWeaponSelect(character.job);

  // Build job level options for novice
  updateJobLevelOptions(character.job);

  updateLevel(1);
  attachEventListeners();
  updateUI();
}

document.addEventListener("DOMContentLoaded", initialize);