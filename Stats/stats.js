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
// JOB MAP
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
  job:             "novice",
  weaponKey:       "bare_handed",
  potionVal:       "",
  stats:    { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
  availablePoints: 48,
  currentHPFrac:   1,
  currentSPFrac:   1,
};

// ===================================================================
// ASPD BRIDGE
// ===================================================================

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
// JOB INFO
// ===================================================================

const JOB_INFO = {
  novice: {
    badge: "Beginner Class",
    desc: "The <strong>Novice</strong> is the starting class for all adventurers. Armed with little more than courage, the Novice stands at the threshold of a grand journey and can advance to any first class.",
    traits: [["⚔️","Balanced base stats"],["🛡️","Can advance to any class"],["✨","High potential growth"],["📖","Starts with 48 status points"]],
    expBase: "100%", expJob: "100%",
  },
  swordsman: {
    badge: "1st Class — Warrior",
    desc: "The <strong>Swordsman</strong> is a front-line warrior who excels in physical combat. High HP and VIT make them tough to kill.",
    traits: [["⚔️","High STR & VIT growth"],["🛡️","Excellent HP pool"],["🗡️","Wide weapon variety"],["📈","Advances to Knight / Crusader"]],
    expBase: "100%", expJob: "100%",
  },
  magician: {
    badge: "1st Class — Mage",
    desc: "The <strong>Magician</strong> wields devastating elemental magic. With the highest INT growth, they deal massive MATK at the cost of low HP.",
    traits: [["🔥","Highest INT bonus"],["💥","Powerful AOE spells"],["🧪","SP-hungry caster"],["📈","Advances to Wizard / Sage"]],
    expBase: "100%", expJob: "100%",
  },
  archer: {
    badge: "1st Class — Ranger",
    desc: "The <strong>Archer</strong> attacks from range with exceptional DEX, making them reliable damage-dealers with high HIT and FLEE.",
    traits: [["🏹","Highest DEX bonus"],["👟","Strong AGI & FLEE"],["🎯","High HIT accuracy"],["📈","Advances to Hunter / Bard / Dancer"]],
    expBase: "100%", expJob: "100%",
  },
  acolyte: {
    badge: "1st Class — Healer",
    desc: "The <strong>Acolyte</strong> serves as healer and support. Their INT and SP pool give them strong recovery skills.",
    traits: [["💚","Strong HP and SP regen"],["🙏","Support & heal focused"],["📿","High LUK growth"],["📈","Advances to Priest / Monk"]],
    expBase: "100%", expJob: "100%",
  },
  merchant: {
    badge: "1st Class — Trader",
    desc: "The <strong>Merchant</strong> combines combat skill with economic prowess. High STR and a large weight limit make them self-sufficient.",
    traits: [["💪","High STR & carry weight"],["🪙","Best weight limit"],["🔨","Axe & mace specialist"],["📈","Advances to Blacksmith / Alchemist"]],
    expBase: "100%", expJob: "100%",
  },
  thief: {
    badge: "1st Class — Rogue",
    desc: "The <strong>Thief</strong> relies on speed and cunning. High AGI gives them exceptional FLEE and attack speed.",
    traits: [["💨","Highest AGI bonus"],["🗡️","Fast attack speed"],["👻","High FLEE & dodge"],["📈","Advances to Assassin / Rogue"]],
    expBase: "100%", expJob: "100%",
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
// JOB LEVEL DROPDOWN BUILDER
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

  document.getElementById("jobLevelDropdown")?.classList.remove("active");
  updateUI();
}

// ===================================================================
// JOB SELECT
// ===================================================================

function selectJob(displayName, fileName, selectVal) {
  const curJob = document.getElementById("current-job");
  if (curJob) curJob.textContent = displayName;

  const title = document.getElementById("character-title");
  if (title) title.textContent = displayName.toUpperCase();

  const img = document.getElementById("character-img");
  if (img) img.src = `../images/${fileName}`;

  character.job      = JOB_MAP[selectVal] ?? "novice";
  character.jobLevel = 0;

  const curJL = document.getElementById("current-jl");
  if (curJL) curJL.textContent = "—";

  document.getElementById("jobDropdown")?.classList.remove("active");

  updateJobLevelOptions(character.job);
  populateWeaponSelect(character.job);
  updateUI();
}

// ===================================================================
// WEAPON SELECT
// ===================================================================

function selectWeapon(weaponLabel) {
  const entry = Object.entries(WEAPON_LABELS).find(([, lbl]) => lbl === weaponLabel);
  const weaponKey = entry ? entry[0] : "bare_handed";

  character.weaponKey = weaponKey;

  const curW = document.getElementById("current-weapon");
  if (curW) curW.textContent = WEAPON_LABELS[weaponKey] ?? weaponLabel;

  document.getElementById("weaponDropdown")?.classList.remove("active");
  updateASPD(character);
}

function populateWeaponSelect(job) {
  const classIdx = CLASS_INDEX[job];

  const visualList = document.querySelector(".weapon-menu");
  if (visualList) visualList.innerHTML = "";

  let currentKeyStillValid = false;

  for (const [weaponKey, label] of Object.entries(WEAPON_LABELS)) {
    const row  = BASE_ASPD_TABLE[weaponKey];
    const aspd = row[classIdx];
    if (aspd === null) continue;

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

  if (!currentKeyStillValid) {
    character.weaponKey = "bare_handed";
    const curW = document.getElementById("current-weapon");
    if (curW) curW.textContent = WEAPON_LABELS["bare_handed"];
  }
}

// ===================================================================
// DROPDOWN TOGGLE HELPERS
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
  const wl          = (getWeightLimit(job) + character.stats.str * 300).toLocaleString();

  // These IDs exist in the static info-tab HTML (index.html)
  // We query by class since the static HTML doesn't have dynamic IDs
  const heroCard = document.querySelector(".info-hero-card");
  if (!heroCard) return;

  const infoTitle   = heroCard.querySelector(".info-hero-title");
  const infoBadge   = heroCard.querySelector(".info-hero-class-badge");
  const infoDesc    = heroCard.querySelector(".info-hero-desc");
  const infoTraits  = heroCard.querySelector(".info-hero-traits");
  const footerVals  = heroCard.querySelectorAll(".info-footer-val");

  if (infoTitle)  infoTitle.textContent  = displayName.toUpperCase();
  if (infoBadge)  infoBadge.textContent  = info.badge;
  if (infoDesc)   infoDesc.innerHTML     = info.desc;

  if (infoTraits) {
    infoTraits.innerHTML = info.traits
      .map(([icon, text]) =>
        `<div class="info-trait"><span class="info-trait-icon">${icon}</span><span>${text}</span></div>`)
      .join("");
  }

  // Footer order: Base EXP Rate, Job EXP Rate, Weight Limit
  if (footerVals[0]) footerVals[0].textContent = info.expBase;
  if (footerVals[1]) footerVals[1].textContent = info.expJob;
  if (footerVals[2]) footerVals[2].textContent = wl;
}

// ===================================================================
// MAIN UI UPDATE
// ===================================================================

function updateUI() {
  const cs = calculateCombatStats(character);

  // ── HP ────────────────────────────────────────────────────────────
  const maxHP = cs.maxHP;
  const curHP = Math.round(maxHP * character.currentHPFrac);

  const hpFill = document.getElementById("hp-bar-fill");
  if (hpFill) hpFill.style.width = `${Math.round((curHP / maxHP) * 100)}%`;

  // .bar-text-input[0] = HP bar, [1] = SP bar
  const barInputs = document.querySelectorAll(".bar-text-input");
  if (barInputs[0]) barInputs[0].value = `${curHP} / ${maxHP}`;

  // ── SP ────────────────────────────────────────────────────────────
  const maxSP = cs.maxSP;
  const curSP = Math.round(maxSP * character.currentSPFrac);

  const spFill = document.getElementById("sp-bar-fill");
  if (spFill) spFill.style.width = `${Math.round((curSP / maxSP) * 100)}%`;

  if (barInputs[1]) barInputs[1].value = `${curSP} / ${maxSP}`;

  // ── Combat stat inputs ────────────────────────────────────────────
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };

  set("d-atk",       cs.attack);
  set("d-atk-bonus", 0);
  set("d-matk-min",  cs.matkMin);
  set("d-matk-max",  cs.matkMax);
  set("d-hit",       cs.hit);
  set("d-crit",      cs.crit);
  set("d-def-base",  0);
  set("d-def",       cs.defense);
  set("d-mdef-base", 0);
  set("d-mdef",      cs.mdefBase);
  set("d-flee",      cs.flee);
  set("d-flee-luk",  Math.floor((character.stats.luk + (calculateJobBonuses(character.job, character.jobLevel).luk || 0) + 10) * 10 / 100));

  // ── ASPD ──────────────────────────────────────────────────────────
  updateASPD(character);

  // ── Status Points ─────────────────────────────────────────────────
  // HTML uses id="status-value" with class "status-value"
  const spDisplay = document.getElementById("status-value");
  if (spDisplay) spDisplay.value = character.availablePoints;

  // ── Stat rows + Bonus column + Points Req column ──────────────────
  const statOrder  = ["str", "agi", "vit", "int", "dex", "luk"];
  const jobBonuses = calculateJobBonuses(character.job, character.jobLevel);

  // The 2nd .column = bonus column, 3rd .column = points req column
  // They are direct children of .stats-grid
  const allColumns   = document.querySelectorAll(".stats-grid .column");
  // column[0] = stat inputs, column[1] = bonus, column[2] = points req, column[3] = status info
  const bonusRows    = allColumns[1] ? allColumns[1].querySelectorAll(".table-row") : [];
  const ptsReqRows   = allColumns[2] ? allColumns[2].querySelectorAll(".table-row") : [];

  statOrder.forEach((s, idx) => {
    // ── Stat input row ──
    const row = document.querySelector(`.table-row[data-stat="${s}"]`);
    if (row) {
      const val       = character.stats[s];
      const cost      = getStatIncreaseCost(val);
      const canAfford = character.availablePoints >= cost;
      const bonus     = jobBonuses[s] || 0;

      const input    = row.querySelector(".stat-input");
      const btnPlus  = row.querySelector(".stat-btn.plus");
      const btnMinus = row.querySelector(".stat-btn.minus");

      if (input)    input.value       = val;
      if (btnPlus)  btnPlus.disabled  = !canAfford || val >= 99;
      if (btnMinus) btnMinus.disabled = val <= 1;

      // ── Bonus column (column[1]) ──
      const bonusRow = bonusRows[idx];
      if (bonusRow) {
        const symSpan = bonusRow.querySelector(".symbol");
        const valSpan = bonusRow.querySelector(".value");
        if (symSpan) symSpan.textContent = `+ ${bonus}`;
        if (valSpan) valSpan.textContent = cost;
      }

      // ── Points Req column (column[2]) ──
      const ptsRow = ptsReqRows[idx];
      if (ptsRow) {
        const valSpan = ptsRow.querySelector(".value");
        if (valSpan) valSpan.textContent = cost;
      }
    }
  });

  // ── Weight ────────────────────────────────────────────────────────
  const baseWeight  = getWeightLimit(character.job);
  const totalWeight = baseWeight + character.stats.str * 30;
  const wDisplay    = document.getElementById("weight-display");
  if (wDisplay) wDisplay.textContent = totalWeight.toLocaleString();

  // ── Base Level display ────────────────────────────────────────────
  const levelInput = document.getElementById("base-level");
  if (levelInput && document.activeElement !== levelInput) {
    levelInput.value = character.baseLevel;
  }

  // ── HP / SP Regen ─────────────────────────────────────────────────
  const effVIT = character.stats.vit + (jobBonuses.vit || 0);
  const effINT = character.stats.int + (jobBonuses.int || 0);
  const hpr = calculateHPRegen(maxHP, effVIT);
  const spr = calculateSPRegen(maxSP, effINT);

  const regenItems = document.querySelectorAll(".dib-regen-item");
  if (regenItems[0]) {
    const el = regenItems[0].querySelector(".dib-regen");
    if (el) el.textContent = `${hpr} per 6s standing · per 3s sitting`;
  }
  if (regenItems[1]) {
    const el = regenItems[1].querySelector(".dib-regen");
    if (el) el.textContent = `${spr} per 8s standing · per 4s sitting`;
  }

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
  populateWeaponSelect(character.job);
  updateJobLevelOptions(character.job);
  updateLevel(1);
  attachEventListeners();
  updateUI();
}

document.addEventListener("DOMContentLoaded", initialize);