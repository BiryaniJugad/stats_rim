// ===================================================================
// RAGNAROK REGEN + WEIGHT SYSTEM
// ===================================================================

// ===================================================================
// JOB WEIGHT LIMITS
// ===================================================================

const JOB_WEIGHT = {
  novice:    2030,
  swordsman: 2830,
  magician:  2230,
  archer:    2360,
  acolyte:   2230,
  merchant:  2530,
  thief:     2430,
};

/**
 * Return the base weight limit for a given job.
 * @param {string} job  - e.g. "swordsman"
 * @returns {number}
 */
function getWeightLimit(job) {
  return JOB_WEIGHT[job] ?? 2030;
}

// ===================================================================
// HP NATURAL REGEN
// ===================================================================
//
// Base: max(1, floor(MAX_HP / 200))
// +1 per 5 VIT
// Multiply by (1 + HPR_MOD * 0.01)   [HPR_MOD = sum of item/skill bonuses]
//
// Tick rate (classic RO):
//   Standing : every 6 s
//   Sitting  : every 3 s
// ===================================================================

/**
 * Calculate natural HP recovery per tick.
 *
 * @param {number} maxHP   - character's maximum HP
 * @param {number} vit     - character VIT stat
 * @param {number} hprMod  - flat % modifier from skills/items (default 0)
 * @returns {number}       - HP restored per regen tick
 */
function calculateHPRegen(maxHP, vit, hprMod = 0) {
  let hpr = 1 + Math.floor(maxHP / 200);   // base: 1, then +1 per 200 maxHP
  hpr += Math.floor(vit / 5);              // +1 per 5 VIT
  hpr = Math.floor(hpr * (1 + hprMod * 0.01));
  return Math.max(1, hpr);
}

// ===================================================================
// SP NATURAL REGEN
// ===================================================================
//
// Base: 1
// +1 per 100 MAX_SP
// +1 per 6 INT
// If INT >= 120: additional +1 per 2 INT above 112  (i.e. floor((INT/2) - 56))
// Multiply by (1 + SPR_MOD * 0.01)   [SPR_MOD = sum of item/skill bonuses]
//
// Tick rate (classic RO):
//   Standing : every 8 s
//   Sitting  : every 4 s
// ===================================================================

/**
 * Calculate natural SP recovery per tick.
 *
 * @param {number} maxSP   - character's maximum SP
 * @param {number} int_    - character INT stat  (named int_ to avoid JS keyword)
 * @param {number} sprMod  - flat % modifier from skills/items (default 0)
 * @returns {number}       - SP restored per regen tick
 */
function calculateSPRegen(maxSP, int_, sprMod = 0) {
  let spr = 1;
  spr += Math.floor(maxSP / 100);
  spr += Math.floor(int_ / 6);
  if (int_ >= 120) {
    spr += Math.floor(int_ / 2 - 56);
  }
  spr = Math.floor(spr * (1 + sprMod * 0.01));
  return Math.max(1, spr);
}