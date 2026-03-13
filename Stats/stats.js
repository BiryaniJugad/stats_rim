// ===================================================================
// RAGNAROK STAT SYSTEM
// ===================================================================
function getPointsForLevel(level) {
  if (level <= 4) return 3;
  if (level >= 95) return 22;
  return Math.floor((level - 1) / 5) + 3;
}

function getTotalStatPointsForLevel(level) {
  const STARTING_STATUS_POINTS = 48;
  if (level === 1) return STARTING_STATUS_POINTS;
  let total = STARTING_STATUS_POINTS;
  for (let i = 2; i <= level; i++) {
    total += getPointsForLevel(i);
  }
  return total;
}

function getStatIncreaseCost(currentStatValue) {
  return Math.min(Math.floor((currentStatValue - 1) / 10) + 2, 11);
}

function getTotalCostToReachStat(fromStat, toStat) {
  let cost = 0;
  for (let i = fromStat; i < toStat; i++) {
    cost += getStatIncreaseCost(i);
  }
  return cost;
}

// ===================================================================
// CHARACTER STATE
// ===================================================================

const character = {
  baseLevel: 1,
  job: "novice",
  stats: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
  availablePoints: 48,
  // Simulated current HP/SP (as fractions, 0–1) — full by default
  currentHPFrac: 1,
  currentSPFrac: 1,
};

// ===================================================================
// DOM ELEMENT CACHE
// ===================================================================

let el = {};

function initializeElements() {
  // Controls
  el.levelInput    = document.getElementById("base-level");
  el.jobSelect     = document.getElementById("job-select");
  el.statusPoints  = document.querySelector(".status-value");
  el.lvlDisplay    = document.getElementById("lvl-display");

  // Vitals — bar fills + text labels
  el.hpBarFill  = document.getElementById("hp-bar-fill");
  el.spBarFill  = document.getElementById("sp-bar-fill");
  el.hpBarText  = document.getElementById("hp-bar-text");
  el.spBarText  = document.getElementById("sp-bar-text");

  // ASPD
  el.aspdValue = document.getElementById("aspd-value");

  // Derived stat inputs (right column) — addressed by ID
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

  // Cost spans (middle column)
  el.costSpans = {
    str: document.getElementById("cost-str"),
    agi: document.getElementById("cost-agi"),
    vit: document.getElementById("cost-vit"),
    int: document.getElementById("cost-int"),
    dex: document.getElementById("cost-dex"),
    luk: document.getElementById("cost-luk"),
  };

  // Regen + weight display
  el.hpRegenVal     = document.getElementById("hp-regen-val");
  el.spRegenVal     = document.getElementById("sp-regen-val");
  el.weightLimitVal = document.getElementById("weight-limit-val");
  el.weightDisplay  = document.getElementById("weight-display"); // top bar

  // Stat rows — keyed by data-stat attribute
  el.statRows = {};
  document.querySelectorAll(".table-row[data-stat]").forEach(row => {
    el.statRows[row.dataset.stat] = row;
  });
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
// MAIN UI UPDATE
// ===================================================================

function updateUI() {
  const cs = calculateCombatStats(character);

  // ── Vitals bars ─────────────────────────────────────────────────
  // Use full HP/SP as "current" (simulator is always at full for now)
  const maxHP = cs.maxHP;
  const maxSP = cs.maxSP;
  const curHP = Math.round(maxHP * character.currentHPFrac);
  const curSP = Math.round(maxSP * character.currentSPFrac);

  if (el.hpBarFill) el.hpBarFill.style.width = `${Math.round((curHP / maxHP) * 100)}%`;
  if (el.spBarFill) el.spBarFill.style.width  = `${Math.round((curSP / maxSP) * 100)}%`;
  if (el.hpBarText) el.hpBarText.textContent  = `${curHP} / ${maxHP}`;
  if (el.spBarText) el.spBarText.textContent  = `${curSP} / ${maxSP}`;

  // ── Derived stats ────────────────────────────────────────────────
  if (el.dAtk)      el.dAtk.value      = cs.attack;
  if (el.dAtkBonus) el.dAtkBonus.value = 0;           // weapon bonus placeholder
  if (el.dMatkMin)  el.dMatkMin.value  = cs.matkMin;
  if (el.dMatkMax)  el.dMatkMax.value  = cs.matkMax;
  if (el.dHit)      el.dHit.value      = cs.hit;
  if (el.dCrit)     el.dCrit.value     = cs.crit;
  if (el.dDefBase)  el.dDefBase.value  = 0;           // armor DEF placeholder
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

  // ── Weight limit ─────────────────────────────────────────────────
  const weightLimit = getWeightLimit(character.job);
  const weightFmt   = weightLimit.toLocaleString();
  if (el.weightLimitVal) el.weightLimitVal.textContent = weightFmt;
  if (el.weightDisplay)  el.weightDisplay.textContent  = weightFmt;
  // Also update info card footer
  const infoWeight = document.getElementById("info-weight-limit");
  if (infoWeight) infoWeight.textContent = weightFmt;

  // ── ASPD ─────────────────────────────────────────────────────────
  updateASPD(character);

  // ── Level display ────────────────────────────────────────────────
  if (el.lvlDisplay && document.activeElement !== el.levelInput) {
    el.lvlDisplay.value = character.baseLevel;
  }
  if (document.activeElement !== el.levelInput) {
    el.levelInput.value = character.baseLevel;
  }

  // ── Status points ────────────────────────────────────────────────
  if (el.statusPoints) el.statusPoints.value = character.availablePoints;

  // ── Stat inputs + cost spans ─────────────────────────────────────
  const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];
  statOrder.forEach(s => {
    const row = el.statRows[s];
    if (!row) return;

    const val  = character.stats[s];
    const cost = getStatIncreaseCost(val);
    const canAfford = character.availablePoints >= cost;

    const input   = row.querySelector(".stat-input");
    const btnPlus = row.querySelector(".stat-btn.plus");
    const btnMinus = row.querySelector(".stat-btn.minus");

    if (input)  input.value = val;
    if (btnPlus)  btnPlus.disabled  = !canAfford || val >= 99;
    if (btnMinus) btnMinus.disabled = val <= 1;

    if (el.costSpans[s]) {
      el.costSpans[s].textContent = `+${cost}`;
      el.costSpans[s].style.color = canAfford ? "#e0b040" : "#5a4020";
    }
  });
}

// ===================================================================
// ASPD BRIDGE
// aspd.js expects: getCurrentJob(), getCurrentWeapon(), getPotionASPDBonus()
// and writes to elements.attackSpeedInput.
// We bridge those here so aspd.js doesn't need changes.
// ===================================================================

// aspd.js reads `elements.attackSpeedInput` — point it at our element
const elements = {
  get attackSpeedInput() { return el.aspdValue; }
};

function getCurrentJob() {
  const JOB_MAP = {
    "": "novice", "1": "swordsman", "2": "magician",
    "3": "archer", "4": "acolyte",  "5": "merchant", "6": "thief",
  };
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
// EVENT LISTENERS
// ===================================================================

function attachEventListeners() {
  const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];

  // ── Stat rows: input field + +/- buttons ────────────────────────
  statOrder.forEach(statName => {
    const row = el.statRows[statName];
    if (!row) return;

    const input    = row.querySelector(".stat-input");
    const btnPlus  = row.querySelector(".stat-btn.plus");
    const btnMinus = row.querySelector(".stat-btn.minus");

    // Typed input
    if (input) {
      input.setAttribute("maxlength", "2");

      input.addEventListener("input", e => {
        let raw = e.target.value.replace(/\D/g, "");
        if (raw === "") { e.target.value = ""; return; }

        let req = Math.max(1, Math.min(99, parseInt(raw)));

        // Clamp to what we can actually afford
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
    }

    // Plus button
    if (btnPlus) {
      btnPlus.addEventListener("click", () => {
        const cur  = character.stats[statName];
        const cost = getStatIncreaseCost(cur);
        if (character.availablePoints >= cost && cur < 99) {
          trySetStat(statName, cur + 1);
        }
      });
    }

    // Minus button
    if (btnMinus) {
      btnMinus.addEventListener("click", () => {
        const cur = character.stats[statName];
        if (cur > 1) trySetStat(statName, cur - 1);
      });
    }
  });

  // ── Level input ──────────────────────────────────────────────────
  el.levelInput.addEventListener("input", e => {
    let cleaned = e.target.value.replace(/[^0-9]/g, "");
    if (cleaned === "") { e.target.value = ""; return; }
    let val = Math.max(1, Math.min(99, parseInt(cleaned, 10)));
    e.target.value = val;
    updateLevel(val);
  });

  el.levelInput.addEventListener("blur", () => {
    if (!el.levelInput.value || parseInt(el.levelInput.value) < 1) updateLevel(1);
  });

  // ── Job select ───────────────────────────────────────────────────
  const JOB_MAP = {
    "": "novice", "1": "swordsman", "2": "magician",
    "3": "archer", "4": "acolyte",  "5": "merchant", "6": "thief",
  };

  el.jobSelect?.addEventListener("change", e => {
    character.job = JOB_MAP[e.target.value] ?? "novice";
    // Repopulate weapon dropdown for new class
    const wSel = document.getElementById("weapon-select");
    if (wSel) populateWeaponSelect(character.job, wSel);
    updateUI();
  });

  // ── Weapon select ────────────────────────────────────────────────
  document.getElementById("weapon-select")?.addEventListener("change", () => updateASPD(character));

  // ── Potion select ────────────────────────────────────────────────
  document.getElementById("potion-select")?.addEventListener("change", () => updateASPD(character));
}

// ===================================================================
// ASPD LISTENERS (from aspd.js) — override to use our IDs
// ===================================================================

function attachASPDListeners() {
  // aspd.js's attachASPDListeners looks for .job-select, .weapon-selector select,
  // and .items-row .level-select — our HTML uses different IDs, so we re-implement
  // this here and skip calling aspd.js's version directly.

  const weaponSel = document.getElementById("weapon-select");
  if (weaponSel) {
    populateWeaponSelect(getCurrentJob(), weaponSel);
  }
  // Listeners already attached in attachEventListeners(); nothing extra needed.
}

// ===================================================================
// INIT
// ===================================================================

function initialize() {
  initializeElements();
  updateLevel(1);
  attachEventListeners();
  // Populate weapon dropdown on startup
  const weaponSel = document.getElementById("weapon-select");
  if (weaponSel) populateWeaponSelect(getCurrentJob(), weaponSel);
  updateUI();
}

document.addEventListener("DOMContentLoaded", initialize);