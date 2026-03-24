// ===================================================================
// RAGNAROK COMBAT STATS  —  combat.js
// Depends on: HPCalc.js (calculateMaxHP, calculateSP)
//             jobBonus.js (calculateJobBonuses)
//             skills.js   (calculateSkillBonuses)
// ===================================================================

function calculateCombatStats(character) {
  const level    = character.baseLevel;
  const job      = character.job || "novice";
  const jobLevel = character.jobLevel || 0;

  // ── Job level stat bonuses ────────────────────────────────────────
  const jb = calculateJobBonuses(job, jobLevel);

  // Base effective stats (character stats + job level bonuses)
  const baseStr = character.stats.str + (jb.str || 0);
  const baseAgi = character.stats.agi + (jb.agi || 0);
  const baseVit = character.stats.vit + (jb.vit || 0);
  const baseInt = character.stats.int + (jb.int || 0);
  const baseDex = character.stats.dex + (jb.dex || 0);
  const baseLuk = character.stats.luk + (jb.luk || 0);

  // ── HP & SP (computed from base stats before skill bonuses) ───────
  // Pool sizes must be known first so pool-based skill formulas work
  // (e.g. Increase Spiritual Power: floor((maxSP/500 + 3) * level)).
  const maxHP = calculateMaxHP(level, job, baseVit);
  const maxSP = calculateSP(level, baseInt, job).maxSP;

  // ── Skill bonuses ─────────────────────────────────────────────────
  const sb = (typeof calculateSkillBonuses === "function")
    ? calculateSkillBonuses(character, maxHP, maxSP)
    : { str:0, agi:0, vit:0, int:0, dex:0, luk:0,
        atk:0, matk:0, def:0, mdef:0, flee:0, hit:0, aspdFlat:0,
        hprMod:0, sprMod:0, flatHPRegen:0, flatSPRegen:0,
        healItemMod:0, spItemMod:0, weightBonus:0 };

  // ── Effective stats (base + skill stat bonuses) ───────────────────
  // These feed every downstream formula so Blessing (+STR/DEX/INT),
  // Increase Agility (+AGI), Owl's Eye (+DEX), Increase Dodge (+AGI),
  // and Attention Concentrate (+AGI/DEX) all automatically propagate.
  const str = baseStr + (sb.str || 0);
  const agi = baseAgi + (sb.agi || 0);
  const vit = baseVit + (sb.vit || 0);
  const INT = baseInt + (sb.int || 0);
  const dex = baseDex + (sb.dex || 0);
  const luk = baseLuk + (sb.luk || 0);

  // ── Re-derive maxHP/maxSP with boosted VIT/INT ────────────────────
  // Skills like Angelus boost effective VIT, so HP pool grows with it.
  const finalMaxHP = calculateMaxHP(level, job, vit);
  const finalMaxSP = calculateSP(level, INT, job).maxSP;

  // ── ATK ──────────────────────────────────────────────────────────
  const dStr           = Math.floor(str / 10);
  const strBonus       = dStr * dStr;
  const dexMeleeBonus  = Math.floor(dex / 5);
  const lukAttackBonus = Math.floor(luk / 5);
  const attack         = str + strBonus + dexMeleeBonus + lukAttackBonus + (sb.atk || 0);

  // ── FLEE ─────────────────────────────────────────────────────────
  const flee = level + agi + (sb.flee || 0);

  // ── DEF ──────────────────────────────────────────────────────────
  const defense = vit + (sb.def || 0);

  // ── MATK ─────────────────────────────────────────────────────────
  const matkMin = INT + Math.floor(INT / 7) ** 2 + (sb.matk || 0);
  const matkMax = INT + Math.floor(INT / 5) ** 2 + (sb.matk || 0);

  // ── MDEF ─────────────────────────────────────────────────────────
  const mdefBase = INT + (sb.mdef || 0);

  // ── HIT ──────────────────────────────────────────────────────────
  const hit = level + dex + (sb.hit || 0);

  // ── CRIT ─────────────────────────────────────────────────────────
  const crit = Math.floor((luk * 3 + 10) * 10 / 100);

  // ── ASPD placeholder (real ASPD computed by aspd.js updateASPD) ──
  const attackSpeed = 150;

  return {
    attack, matkMin, matkMax, mdefBase,
    hit, flee, crit, defense, attackSpeed,
    maxHP: finalMaxHP, maxSP: finalMaxSP,
    // Skill stat bonuses forwarded so stats.js can pass them to updateASPD
    skillAgi: sb.agi || 0,
    skillDex: sb.dex || 0,
    aspdFlat: sb.aspdFlat || 0,
    // Regen modifiers
    hprMod:      sb.hprMod      || 0,
    sprMod:      sb.sprMod      || 0,
    flatHPRegen: sb.flatHPRegen || 0,
    flatSPRegen: sb.flatSPRegen || 0,
    healItemMod:  sb.healItemMod  || 0,
    spItemMod:    sb.spItemMod    || 0,
    weightBonus:  sb.weightBonus  || 0,
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

function calculateSP(BASE_LEVEL, INT, job, SP_MOD_A = 0, SP_MOD_B = 0) {
  const SP_JOB = SP_JOB_TABLE[job] ?? 1;
  let BASE_SP  = 10 + (BASE_LEVEL * SP_JOB);
  let MAX_SP   = Math.floor(BASE_SP * (1 + INT * 0.01));
  MAX_SP      += SP_MOD_A;
  MAX_SP       = Math.floor(MAX_SP * (1 + SP_MOD_B * 0.01));
  return { baseSP: BASE_SP, maxSP: MAX_SP };
}