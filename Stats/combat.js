// ===================================================================
// RAGNAROK COMBAT STATS  —  combat.js
// Depends on: HPCalc.js  (calculateMaxHP)
//             jobBonus.js (calculateJobBonuses)
// ===================================================================

// ===================================================================
// SP TABLE  (base SP per job level)
// Formula: BASE_SP = 10 + (BASE_LEVEL * SP_JOB)
//          MAX_SP  = floor(BASE_SP * (1 + INT * 0.01))
// ===================================================================

const SP_JOB_TABLE = {
  novice:    1,
  swordsman: 1,
  archer:    1,
  thief:     1,
  acolyte:   5,
  merchant:  3,
  magician:  6,
};

function calculateSP(BASE_LEVEL, INT, job, SP_MOD_A = 0, SP_MOD_B = 0) {
  const SP_JOB = SP_JOB_TABLE[job] ?? 1;
  let BASE_SP  = 10 + (BASE_LEVEL * SP_JOB);
  let MAX_SP   = Math.floor(BASE_SP * (1 + INT * 0.01));
  MAX_SP      += SP_MOD_A;
  MAX_SP       = Math.floor(MAX_SP * (1 + SP_MOD_B * 0.01));
  return { baseSP: BASE_SP, maxSP: MAX_SP };
}

// ===================================================================
// MAIN COMBAT STATS
// ===================================================================

function calculateCombatStats(character) {
  const level    = character.baseLevel;
  const job      = character.job || "novice";
  const jobLevel = character.jobLevel || 0;

  // ── Job level bonuses ─────────────────────────────────────────────
  const jb  = calculateJobBonuses(job, jobLevel);
  const str = character.stats.str + (jb.str || 0);
  const agi = character.stats.agi + (jb.agi || 0);
  const vit = character.stats.vit + (jb.vit || 0);
  const int = character.stats.int + (jb.int || 0);
  const dex = character.stats.dex + (jb.dex || 0);
  const luk = character.stats.luk + (jb.luk || 0);

  // ── ATK ──────────────────────────────────────────────────────────
  // batk = STR + floor(STR/10)^2 + floor(DEX/5) + floor(LUK/5)
  const dStr           = Math.floor(str / 10);
  const strBonus       = dStr * dStr;
  const dexMeleeBonus  = Math.floor(dex / 5);
  const lukAttackBonus = Math.floor(luk / 5);
  const attack         = str + strBonus + dexMeleeBonus + lukAttackBonus;

  // ── FLEE ─────────────────────────────────────────────────────────
  // flee = level + AGI   (perfect dodge via LUK handled in updateUI)
  const flee = level + agi;

  // ── DEF (soft) ───────────────────────────────────────────────────
  // Soft DEF = VIT (Angelus multiplied in buff layer if needed)
  const defense = vit;

  // ── HP  (uses lookup table from HPCalc.js) ────────────────────────
  const maxHP = calculateMaxHP(level, job, vit);

  // ── SP ───────────────────────────────────────────────────────────
  const spData = calculateSP(level, int, job);
  const maxSP  = spData.maxSP;

  // ── MATK ─────────────────────────────────────────────────────────
  const matkMin = int + Math.floor(int / 7) ** 2;
  const matkMax = int + Math.floor(int / 5) ** 2;

  // ── MDEF ─────────────────────────────────────────────────────────
  const mdefBase = int;

  // ── HIT ──────────────────────────────────────────────────────────
  const hit = level + dex;

  // ── CRIT ─────────────────────────────────────────────────────────
  // floor((LUK * 3 + 10) * 10 / 100)
  const crit = Math.floor((luk * 3 + 10) * 10 / 100);

  // ── ASPD (placeholder — overridden by aspd.js updateASPD) ────────
  const attackSpeed = 150;

  return {
    attack,
    matkMin,
    matkMax,
    mdefBase,
    hit,
    flee,
    crit,
    defense,
    attackSpeed,
    maxHP,
    maxSP,
  };
}