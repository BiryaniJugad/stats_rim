// ===================================================================
// RAGNAROK COMBAT STATS
// Depends on: HPCalc.js (calculateMaxHP), HPCalc.js (calculateSP)
// ===================================================================

function calculateCombatStats(character) {
  const { str, agi, vit, int, dex, luk } = character.stats;
  const level = character.baseLevel;
  const job   = character.job || "novice";

  // ── ATK ──────────────────────────────────────────────────────────
  const strBonus       = Math.floor(str / 10) ** 2;
  const dexMeleeBonus  = Math.floor(dex / 5);
  const lukAttackBonus = Math.floor(luk / 5);
  const attack         = str + strBonus + dexMeleeBonus + lukAttackBonus;

  // ── FLEE ─────────────────────────────────────────────────────────
  const flee            = level + agi + 1 + Math.floor(luk / 10);

  // ── VIT / DEF ────────────────────────────────────────────────────
  const defense = vit;

  // ── HP — uses exact lookup table + VIT scaling ───────────────────
  const maxHP = calculateMaxHP(level, job, vit);

  // ── SP ───────────────────────────────────────────────────────────
  const spData = calculateSP(level, int, job);
  const maxSP  = spData.maxSP;

  // ── MATK ─────────────────────────────────────────────────────────
  const baseMatk    = int;
  const minMatkBonus = Math.floor(int / 7) ** 2;
  const maxMatkBonus = Math.floor(int / 5) ** 2;
  const matkMin      = baseMatk + minMatkBonus;
  const matkMax      = baseMatk + maxMatkBonus;

  // ── MDEF ─────────────────────────────────────────────────────────
  const mdefBase = int;

  // ── HIT ──────────────────────────────────────────────────────────
  const hit = level + dex;

  // ── CRIT ─────────────────────────────────────────────────────────
  const crit = Math.max(1, Math.floor(luk * 0.3) + 1);

  // ── ASPD (base formula — overridden by aspd.js updateASPD) ───────
  const attackSpeed = 150 + Math.floor(agi / 5) + Math.floor(dex / 20);

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

// ===================================================================
// SP FORMULA
// ===================================================================

const SP_JOB_TABLE = {
  novice:    1,
  swordsman: 2,
  archer:    2,
  thief:     2,
  acolyte:   5,
  merchant:  3,
  magician:  6,
};

const JOB_BASE_SP = {
  novice:    11,
  swordsman: 12,
  magician:  16,
  archer:    12,
  acolyte:   15,
  merchant:  13,
  thief:     12,
};

function calculateSP(BASE_LEVEL, INT, job, SP_MOD_A = 0, SP_MOD_B = 0) {
  const SP_JOB = SP_JOB_TABLE[job] ?? 1;

  // Base SP
  let BASE_SP = 10 + (BASE_LEVEL * SP_JOB);

  // Apply INT bonus
  let MAX_SP = Math.floor(BASE_SP * (1 + INT * 0.01));

  // Additive modifiers
  MAX_SP += SP_MOD_A;

  // Multiplicative modifiers
  MAX_SP = Math.floor(MAX_SP * (1 + SP_MOD_B * 0.01));

  return {
    baseSP: BASE_SP,
    maxSP:  MAX_SP,
  };
}