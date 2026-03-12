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

  let baseHP = 35 + (level * B);

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
