// ======================================
// LEVEL 1 STARTING VALUES
// ======================================

const JOB_BASE_HP = {
  novice: 40,
  swordsman: 40,
  magician: 40,
  archer: 40,
  acolyte: 40,
  merchant: 40,
  thief: 40
};

const JOB_BASE_SP = {
  novice: 11,
  swordsman: 12,
  magician: 16,
  archer: 12,
  acolyte: 15,
  merchant: 13,
  thief: 12
};

// ===========================================
// JOB MODIFIERS
// ===========================================

const JOB_HP_MOD = {
  novice:   { A: 0.4, B: 5 },
  swordsman:{ A: 0.7, B: 7 },
  magician: { A: 0.5, B: 6 },
  archer:   { A: 0.55, B: 6 },
  acolyte:  { A: 0.5, B: 6 },
  merchant: { A: 0.5, B: 6 },
  thief:    { A: 0.55, B: 6 }
};

const JOB_SP_MOD = {
  novice:   { A: 0.3, B: 3 },
  swordsman:{ A: 0.2, B: 2 },
  magician: { A: 0.6, B: 5 },
  archer:   { A: 0.4, B: 3 },
  acolyte:  { A: 0.5, B: 4 },
  merchant: { A: 0.3, B: 3 },
  thief:    { A: 0.3, B: 3 }
};

// ===============================
// BASE HP FORMULA
// ===============================

function calculateBaseHP(level, job) {

  const mod = JOB_HP_MOD[job];
  const A = mod.A;
  const B = mod.B;

  let baseHP = 40 + (level * B);

  for (let i = 2; i <= level; i++) {
    baseHP += Math.round(A * i);
  }

  return baseHP;
}

// ===============================
// BASE SP FORMULA
// ===============================

function calculateBaseSP(level, job) {

  const mod = JOB_SP_MOD[job];
  const A = mod.A;
  const B = mod.B;

  let baseSP = 10 + (level * B);

  for (let i = 2; i <= level; i++) {
    baseSP += Math.round(A * i);
  }

  return baseSP;
}

const SP_JOB_TABLE = {
  novice: 1,
  swordsman: 2,
  archer: 2,
  thief: 2,
  acolyte: 5,
  merchant: 3,
  magician: 6
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
    maxSP: MAX_SP
  };
}
