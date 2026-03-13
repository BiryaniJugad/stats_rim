// ===================================================================
// RAGNAROK STAT SYSTEM  —  stats.js
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
// CHARACTER STATE
// ===================================================================

const character = {
  baseLevel: 1,
  jobLevel: 0,
  job: "novice",
  stats: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
  availablePoints: 48,
  currentHPFrac:   1,
  currentSPFrac:   1,
};

// ===================================================================
// JOB DATA
// ===================================================================

const JOB_MAP = {
  "":  "novice",
  "1": "swordsman",
  "2": "magician",
  "3": "archer",
  "4": "acolyte",
  "5": "merchant",
  "6": "thief",
};

const JOB_INFO = {
  novice: {
    badge: "Beginner Class",
    desc:  "The <strong>Novice</strong> is the starting class for all adventurers. Armed with little more than courage, the Novice stands at the threshold of a grand journey and can advance to any first class.",
    traits: [
      ["⚔️", "Balanced base stats"],
      ["🛡️", "Can advance to any class"],
      ["✨", "High potential growth"],
      ["📖", "Starts with 48 status points"],
    ],
    expBase: "100%", expJob: "100%",
  },
  swordsman: {
    badge: "1st Class — Warrior",
    desc:  "The <strong>Swordsman</strong> is a front-line warrior who excels in physical combat. High HP and VIT make them tough to kill, and they can advance into Knight or Crusader.",
    traits: [
      ["⚔️", "High STR & VIT growth"],
      ["🛡️", "Excellent HP pool"],
      ["🗡️", "Wide weapon variety"],
      ["📈", "Advances to Knight / Crusader"],
    ],
    expBase: "100%", expJob: "100%",
  },
  magician: {
    badge: "1st Class — Mage",
    desc:  "The <strong>Magician</strong> wields devastating elemental magic. With the highest INT growth of any class, they deal massive MATK at the cost of low HP and physical defense.",
    traits: [
      ["🔥", "Highest INT bonus"],
      ["💥", "Powerful AOE spells"],
      ["🧪", "SP-hungry caster"],
      ["📈", "Advances to Wizard / Sage"],
    ],
    expBase: "100%", expJob: "100%",
  },
  archer: {
    badge: "1st Class — Ranger",
    desc:  "The <strong>Archer</strong> attacks from range with exceptional DEX, making them reliable damage-dealers. Their accuracy and flee make them effective against physical monsters.",
    traits: [
      ["🏹", "Highest DEX bonus"],
      ["👟", "Strong AGI & FLEE"],
      ["🎯", "High HIT accuracy"],
      ["📈", "Advances to Hunter / Bard / Dancer"],
    ],
    expBase: "100%", expJob: "100%",
  },
  acolyte: {
    badge: "1st Class — Healer",
    desc:  "The <strong>Acolyte</strong> serves as healer and support. Their INT and SP pool give them strong recovery skills, and they can wield maces to contribute in combat.",
    traits: [
      ["💚", "Strong HP and SP regen"],
      ["🙏", "Support & heal focused"],
      ["📿", "High LUK growth"],
      ["📈", "Advances to Priest / Monk"],
    ],
    expBase: "100%", expJob: "100%",
  },
  merchant: {
    badge: "1st Class — Trader",
    desc:  "The <strong>Merchant</strong> combines combat skill with economic prowess. High STR and a large weight limit make them self-sufficient adventurers.",
    traits: [
      ["💪", "High STR & carry weight"],
      ["🪙", "Best weight limit"],
      ["🔨", "Axe & mace specialist"],
      ["📈", "Advances to Blacksmith / Alchemist"],
    ],
    expBase: "100%", expJob: "100%",
  },
  thief: {
    badge: "1st Class — Rogue",
    desc:  "The <strong>Thief</strong> relies on speed and cunning rather than brute force. High AGI gives them exceptional flee and attack speed, making them elusive fighters.",
    traits: [
      ["💨", "Highest AGI bonus"],
      ["🗡️", "Fast attack speed"],
      ["👻", "High FLEE & dodge"],
      ["📈", "Advances to Assassin / Rogue"],
    ],
    expBase: "100%", expJob: "100%",
  },
};

// ===================================================================
// DOM ELEMENT CACHE
// ===================================================================

let el = {};

function initializeElements() {
  el.levelInput    = document.getElementById("base-level");
  el.jobSelect     = document.getElementById("job-select");
  el.jobLevelSelect = document.getElementById("job-level-select");
  el.statusPoints  = document.querySelector(".status-value");

  // Vitals — bar fills + text inputs
  el.hpBarFill = document.getElementById("hp-bar-fill");
  el.spBarFill = document.getElementById("sp-bar-fill");
  el.hpBarText = document.getElementById("hp-bar-text");   // <input readonly>
  el.spBarText = document.getElementById("sp-bar-text");   // <input readonly>

  // ASPD
  el.aspdValue = document.getElementById("aspd-value");

  // Derived stat inputs
  el.dAtk      = document.getElementById("d-atk");
  el.dAtkBonus = document.getElementById("d-atk-bonus");
  el.dMatkMin  = document.getElementById("d-matk-min");
  el.dMatkMax  = document.getElementById("d-matk-max");
  el.dHit      = document.getElementById("d-hit");
  el.dCrit     = document.getElementById("d-crit");
  el.dDefBase  = document.getElementById("d-def-base");
  el.dDef      = document.getElementById("d-def");
  el.dMdefBase = document.getElementById("d-mdef-base");
  el.dMdef     = document.getElementById("d-mdef");
  el.dFlee     = document.getElementById("d-flee");
  el.dFleeLuk  = document.getElementById("d-flee-luk");

  // Cost spans
  el.costSpans = {
    str: document.getElementById("cost-str"),
    agi: document.getElementById("cost-agi"),
    vit: document.getElementById("cost-vit"),
    int: document.getElementById("cost-int"),
    dex: document.getElementById("cost-dex"),
    luk: document.getElementById("cost-luk"),
  };

  // Regen + weight
  el.hpRegenVal    = document.getElementById("hp-regen-val");
  el.spRegenVal    = document.getElementById("sp-regen-val");
  el.weightDisplay = document.getElementById("weight-display");

  // Dib level/jl labels
  el.dibBaseLevel = document.getElementById("dib-base-level");
  el.dibJobLevel  = document.getElementById("dib-job-level");

  // Job-level dropdown display
  el.currentJL = document.getElementById("current-jl");

  // Info tab
  el.infoTitle   = document.getElementById("info-job-title");
  el.infoBadge   = document.getElementById("info-class-badge");
  el.infoDesc    = document.getElementById("info-job-desc");
  el.infoTraits  = document.getElementById("info-job-traits");
  el.infoExpBase = document.getElementById("info-exp-base");
  el.infoExpJob  = document.getElementById("info-exp-job");
  el.infoWeight  = document.getElementById("info-weight-limit");

  // Stat rows — col-stat has the inputs, col-btns has the buttons.
  // Both sets of rows share the same data-stat attribute.
  el.statRows = {};   // input rows  (col-stat)
  el.btnRows  = {};   // button rows (col-btns)

  document.querySelectorAll(".col-stat .table-row[data-stat]").forEach(row => {
    el.statRows[row.dataset.stat] = row;
  });
  document.querySelectorAll(".col-btns .table-row[data-stat]").forEach(row => {
    el.btnRows[row.dataset.stat] = row;
  });

  // Fallback: if the page uses a single-column layout where buttons and
  // inputs share the same row, populate both maps from the same elements.
  if (Object.keys(el.statRows).length === 0) {
    document.querySelectorAll(".table-row[data-stat]").forEach(row => {
      el.statRows[row.dataset.stat] = row;
      el.btnRows[row.dataset.stat]  = row;
    });
  }
}

// ===================================================================
// ASPD BRIDGE
// aspd.js reads `elements.attackSpeedInput` and calls getCurrentJob /
// getCurrentWeapon / getPotionASPDBonus — we provide all of these.
// ===================================================================

const elements = {
  get attackSpeedInput() { return el.aspdValue; }
};

function getCurrentJob() {
  return JOB_MAP[el.jobSelect?.value] ?? "novice";
}

function getCurrentWeapon() {
  return document.getElementById("weapon-select")?.value || "bare_handed";
}

function getPotionASPDBonus() {
  const POTION_MAP = { "": 0, "1": 6, "2": 12, "3": 17 };
  return POTION_MAP[document.getElementById("potion-select")?.value] ?? 0;
}

// ===================================================================
// POINT ACCOUNTING
// ===================================================================

function calcRemainingWithChange(statName, newValue) {
  const total = getTotalStatPointsForLevel(character.baseLevel);
  const spent = Object.keys(character.stats).reduce((sum, s) => {
    const v = s === statName ? newValue : character.stats[s];
    return sum + getTotalCostToReachStat(1, v);
  }, 0);
  return total - spent;
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
  character.availablePoints = Math.max(0, total - spent);
  updateUI();
}

// ===================================================================
// JOB LEVEL DROPDOWN
// ===================================================================

function updateJobLevelOptions(job) {
  const sel = document.getElementById("job-level-select");
  const max = JOB_MAX_LEVEL[job] ?? 0;

  if (sel) {
    sel.innerHTML = '<option value="">—</option>';
    for (let i = 1; i <= max; i++) {
      const opt = document.createElement("option");
      opt.value = i; opt.textContent = i;
      sel.appendChild(opt);
    }
  }

  const visualList = document.getElementById("jl-menu-list");
  if (visualList) {
    visualList.innerHTML = "";
    const liNone = document.createElement("li");
    liNone.textContent = "—";
    liNone.onclick = () => selectJobLevel("", 0);
    visualList.appendChild(liNone);

    for (let i = 1; i <= max; i++) {
      const li = document.createElement("li");
      li.textContent = i;
      li.onclick = () => selectJobLevel(String(i), i);
      visualList.appendChild(li);
    }
  }
}

function selectJobLevel(selectVal, numVal) {
  character.jobLevel = numVal;
  const sel = document.getElementById("job-level-select");
  if (sel) sel.value = selectVal;
  if (el.currentJL)  el.currentJL.textContent  = numVal > 0 ? numVal : "—";
  if (el.dibJobLevel) el.dibJobLevel.textContent = numVal > 0 ? numVal : "—";
  document.getElementById("jobLevelDropdown")?.classList.remove("active");
  updateUI();
}

// ===================================================================
// INFO TAB
// ===================================================================

function updateInfoTab(job) {
  const info = JOB_INFO[job] ?? JOB_INFO.novice;
  const displayName = job.charAt(0).toUpperCase() + job.slice(1);
  const weightFmt   = getWeightLimit(job).toLocaleString();

  if (el.infoTitle)   el.infoTitle.textContent  = displayName.toUpperCase();
  if (el.infoBadge)   el.infoBadge.textContent  = info.badge;
  if (el.infoDesc)    el.infoDesc.innerHTML      = info.desc;
  if (el.infoExpBase) el.infoExpBase.textContent = info.expBase;
  if (el.infoExpJob)  el.infoExpJob.textContent  = info.expJob;
  if (el.infoWeight)  el.infoWeight.textContent  = weightFmt;

  if (el.infoTraits) {
    el.infoTraits.innerHTML = info.traits
      .map(([icon, text]) =>
        `<div class="info-trait"><span class="info-trait-icon">${icon}</span><span>${text}</span></div>`)
      .join("");
  }
}

// ===================================================================
// MAIN UI UPDATE
// ===================================================================

function updateUI() {
  const cs = calculateCombatStats(character);

  // ── Vitals bars ──────────────────────────────────────────────────
  const maxHP = cs.maxHP;
  const maxSP = cs.maxSP;
  const curHP = Math.round(maxHP * character.currentHPFrac);
  const curSP = Math.round(maxSP * character.currentSPFrac);

  if (el.hpBarFill) el.hpBarFill.style.width = `${Math.round((curHP / maxHP) * 100)}%`;
  if (el.spBarFill) el.spBarFill.style.width  = `${Math.round((curSP / maxSP) * 100)}%`;
  // hp-bar-text / sp-bar-text are <input readonly> elements → use .value
  if (el.hpBarText) el.hpBarText.value = `${curHP} / ${maxHP}`;
  if (el.spBarText) el.spBarText.value = `${curSP} / ${maxSP}`;

  // ── Derived stats ────────────────────────────────────────────────
  if (el.dAtk)      el.dAtk.value      = cs.attack;
  if (el.dAtkBonus) el.dAtkBonus.value = 0;
  if (el.dMatkMin)  el.dMatkMin.value  = cs.matkMin;
  if (el.dMatkMax)  el.dMatkMax.value  = cs.matkMax;
  if (el.dHit)      el.dHit.value      = cs.hit;
  if (el.dCrit)     el.dCrit.value     = cs.crit;
  if (el.dDefBase)  el.dDefBase.value  = 0;
  if (el.dDef)      el.dDef.value      = cs.defense;
  if (el.dMdefBase) el.dMdefBase.value = 0;
  if (el.dMdef)     el.dMdef.value     = cs.mdefBase;
  if (el.dFlee)     el.dFlee.value     = Math.max(1, character.baseLevel + character.stats.agi);
  if (el.dFleeLuk)  el.dFleeLuk.value  = 1 + Math.floor(character.stats.luk / 10);

  // ── HP / SP Regen ────────────────────────────────────────────────
  const hpr = calculateHPRegen(maxHP, character.stats.vit);
  const spr = calculateSPRegen(maxSP, character.stats.int);
  if (el.hpRegenVal) el.hpRegenVal.textContent = hpr;
  if (el.spRegenVal) el.spRegenVal.textContent = spr;

  // ── Weight + level display ───────────────────────────────────────
  const weightFmt = getWeightLimit(character.job).toLocaleString();
  if (el.weightDisplay) el.weightDisplay.textContent = weightFmt;
  if (el.dibBaseLevel)  el.dibBaseLevel.textContent  = character.baseLevel;
  if (el.dibJobLevel)   el.dibJobLevel.textContent   = character.jobLevel > 0 ? character.jobLevel : "—";

  if (document.activeElement !== el.levelInput && el.levelInput) {
    el.levelInput.value = character.baseLevel;
  }

  // ── Status points ─────────────────────────────────────────────────
  if (el.statusPoints) el.statusPoints.value = character.availablePoints;

  // ── Stat inputs + cost spans + job bonus indicators ──────────────
  const jobBonuses = calculateJobBonuses(character.job, character.jobLevel);
const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];

statOrder.forEach(s => {
  const row = el.statRows[s];
  if (!row) return;

  const val       = character.stats[s];
  const cost      = getStatIncreaseCost(val);
  const canAfford = character.availablePoints >= cost;
  const bonus     = jobBonuses[s] || 0;

  const input    = row.querySelector(".stat-input");
  const btnPlus  = row.querySelector(".stat-btn.plus");
  const btnMinus = row.querySelector(".stat-btn.minus");

  if (input) input.value = val;
  if (btnPlus)  btnPlus.disabled  = !canAfford || val >= 99;
  if (btnMinus) btnMinus.disabled = val <= 1;

  if (el.costSpans[s]) {
    const span = el.costSpans[s];
    span.innerHTML = canAfford
      ? `+${cost}<span style="color:#4060c0;font-size:10px;">pts</span>`
      : `+${cost}<span style="color:#5a4020;font-size:10px;">pts</span>`;
    span.style.color = canAfford ? "#e0b040" : "#5a4020";
  }

  const badgeId = `jbonus-${s}`;
  let badge = document.getElementById(badgeId);

  if (!badge) {
    const costRow = el.costSpans[s]?.closest(".cost-row");
    if (costRow) {
      badge = document.createElement("span");
      badge.id = badgeId;
      badge.style.cssText = "font-size:10px;font-weight:700;margin-left:3px;";
      costRow.appendChild(badge);
    }
  }

  if (badge) {
    if (bonus > 0) {
      badge.textContent = `+${bonus}`;
      badge.style.color = "#4888ff";
      badge.title = `Job bonus: +${bonus} ${s.toUpperCase()}`;
    } else {
      badge.textContent = "";
    }
  }
});
}

// ===================================================================
// CUSTOM DROPDOWN HANDLERS
// All visual dropdown toggles live here — tabs.js must NOT redefine them.
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

// ===================================================================
// JOB LEVEL DROPDOWN — update max options per class
// ===================================================================

const JOB_MAX_LEVEL = {
  novice: 9, swordsman: 50, magician: 50,
  archer: 50, acolyte: 50, merchant: 50, thief: 50,
};

// ===================================================================
// EVENT LISTENERS
// ===================================================================

function switchTab(evt, tabId) {
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab-item").forEach(b => b.classList.remove("active"));
  document.getElementById(tabId)?.classList.add("active");
  evt.currentTarget.classList.add("active");
}

function selectPotion(displayName, val) {
  const display = document.getElementById("current-potion");
  if (display) display.textContent = displayName;
  const sel = document.getElementById("potion-select");
  if (sel) sel.value = val;
  document.getElementById("potionDropdown")?.classList.remove("active");
  updateASPD(character);
}

/**
 * Called by each <li> in the job dropdown.
 * @param {string} displayName  e.g. "Swordsman"
 * @param {string} fileName     e.g. "swordsman.png"
 * @param {string} selectVal    hidden select value: "", "1"…"6"
 */
function selectJob(displayName, fileName, selectVal) {
  document.getElementById("current-job").textContent     = displayName;
  document.getElementById("character-title").textContent = displayName.toUpperCase();

  const img = document.getElementById("character-img");
  if (img) img.src = `../images/${fileName}`;

  if (el.jobSelect) el.jobSelect.value = selectVal;

  character.job      = JOB_MAP[selectVal] ?? "novice";
  character.jobLevel = 0;

  updateJobLevelOptions(character.job);
  if (el.currentJL)  el.currentJL.textContent  = "—";
  if (el.dibJobLevel) el.dibJobLevel.textContent = "—";

  // Repopulate weapon dropdown for new class
  const wSel = document.getElementById("weapon-select");
  if (wSel) populateWeaponSelect(character.job, wSel);

  document.getElementById("jobDropdown")?.classList.remove("active");
  updateUI();
}

// ===================================================================
// EVENT LISTENERS
// ===================================================================

function attachEventListeners() {
  const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];

  // ── Stat inputs (col-stat rows) ───────────────────────────────────
  statOrder.forEach(statName => {
    const row = el.statRows[statName];
    if (!row) return;
    const input = row.querySelector(".stat-input");
    if (!input) return;

    input.setAttribute("maxlength", "2");

    input.addEventListener("input", e => {
      let raw = e.target.value.replace(/\D/g, "");
      if (raw === "") { e.target.value = ""; return; }
      let req = Math.max(1, Math.min(99, parseInt(raw)));

      const total = getTotalStatPointsForLevel(character.baseLevel);
      const spentOthers = Object.keys(character.stats).reduce((sum, s) =>
        s === statName ? sum : sum + getTotalCostToReachStat(1, character.stats[s]), 0);

      let maxAllowed = 1;
      for (let i = 1; i <= 99; i++) {
        if (spentOthers + getTotalCostToReachStat(1, i) <= total) maxAllowed = i;
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

    input.addEventListener("blur", () => {
      if (!input.value || parseInt(input.value) < 1) trySetStat(statName, 1);
    });
  });

  // ── +/- buttons (col-btns rows) ───────────────────────────────────
  statOrder.forEach(statName => {
    const btnRow = el.btnRows[statName];
    if (!btnRow) return;

    const btnPlus  = btnRow.querySelector(".stat-btn.plus");
    const btnMinus = btnRow.querySelector(".stat-btn.minus");

    btnPlus?.addEventListener("click", () => {
      const cur  = character.stats[statName];
      const cost = getStatIncreaseCost(cur);
      if (character.availablePoints >= cost && cur < 99) trySetStat(statName, cur + 1);
    });

    btnMinus?.addEventListener("click", () => {
      const cur = character.stats[statName];
      if (cur > 1) trySetStat(statName, cur - 1);
    });
  });

  // ── Base level input ──────────────────────────────────────────────
  el.levelInput?.addEventListener("input", e => {
    let cleaned = e.target.value.replace(/[^0-9]/g, "");
    if (cleaned === "") { e.target.value = ""; return; }
    const val = Math.max(1, Math.min(99, parseInt(cleaned, 10)));
    e.target.value = val;
    updateLevel(val);
  });

  el.levelInput?.addEventListener("blur", () => {
    if (!el.levelInput.value || parseInt(el.levelInput.value) < 1) updateLevel(1);
  });

  // ── Job select ───────────────────────────────────────────────────
  el.jobSelect?.addEventListener("change", e => {
    character.job = JOB_MAP[e.target.value] ?? "novice";
    character.jobLevel = 0; // reset job level on class change
    if (el.jobLevelSelect) {
      el.jobLevelSelect.value = "";
      updateJobLevelOptions(character.job);
    }
    const wSel = document.getElementById("weapon-select");
    if (wSel) populateWeaponSelect(character.job, wSel);
    updateUI();
  });

  // ── Job level select ─────────────────────────────────────────────
  el.jobLevelSelect?.addEventListener("change", e => {
    character.jobLevel = parseInt(e.target.value) || 0;
    updateUI();
  });

  // ── Weapon select ────────────────────────────────────────────────
  document.getElementById("weapon-select")?.addEventListener("change", () => updateASPD(character));

  // ── Potion select ────────────────────────────────────────────────
  document.getElementById("potion-select")?.addEventListener("change", () => updateASPD(character));
}

// ===================================================================
// WEAPON DROPDOWN — keeps hidden <select> + visual list in sync
// (Overrides the version in aspd.js so we control the visual list ID)
// ===================================================================

function populateWeaponSelect(job, hiddenSel) {
  if (!hiddenSel) return;

  const classIdx   = CLASS_INDEX[job];
  const currentVal = hiddenSel.value;

  hiddenSel.innerHTML = "";

  const visualList = document.getElementById("weapon-menu-list");
  if (visualList) visualList.innerHTML = "";

  for (const [weaponKey, label] of Object.entries(WEAPON_LABELS)) {
    const row  = BASE_ASPD_TABLE[weaponKey];
    const aspd = row[classIdx];
    if (aspd === null) continue;

    const opt = document.createElement("option");
    opt.value = weaponKey; opt.textContent = label;
    hiddenSel.appendChild(opt);

    if (visualList) {
      const li = document.createElement("li");
      li.textContent = label;
      li.onclick = () => {
        hiddenSel.value = weaponKey;
        const cur = document.getElementById("current-weapon");
        if (cur) cur.textContent = label;
        document.getElementById("weaponDropdown")?.classList.remove("active");
        updateASPD(character);
      };
      visualList.appendChild(li);
    }
  }

  if ([...hiddenSel.options].some(o => o.value === currentVal)) {
    hiddenSel.value = currentVal;
    const lbl = WEAPON_LABELS[currentVal];
    if (lbl) {
      const cur = document.getElementById("current-weapon");
      if (cur) cur.textContent = lbl;
    }
  } else {
    hiddenSel.value = "bare_handed";
    const cur = document.getElementById("current-weapon");
    if (cur) cur.textContent = "Bare Handed";
  }
}

// ===================================================================
// INIT
// ===================================================================

function initialize() {
  initializeElements();
  updateJobLevelOptions(character.job);

  const weaponSel = document.getElementById("weapon-select");
  if (weaponSel) populateWeaponSelect(character.job, weaponSel);

  updateLevel(1);
  attachEventListeners();
  updateUI();
}

document.addEventListener("DOMContentLoaded", initialize);