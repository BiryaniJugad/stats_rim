// ===================================================================
// RAGNAROK JOB LEVEL STAT BONUSES
// ===================================================================
//
// Each entry: { jl: <job level required>, stat: <stat name> }
//
// A bonus is ACTIVE when:
//   character.jobLevel >= entry.jl
//
// The numbers in the source table ARE the job levels at which each
// +1 is gained. No base level gating — purely job level.
//
// Job level caps:
//   Novice         : 1–9   (no bonuses defined)
//   All 1st classes: 1–50
//
// Every first-class has exactly 18 total bonus points.
// ===================================================================

const JOB_BONUSES = {

    // ── NOVICE ──────────────────────────────────────────────────────
    // No stat bonuses from job levels.
    novice: [],
  
    // ── SWORDSMAN (max JL 50) ───────────────────────────────────────
    // STR: +1 at JL 2,14,33,40,47,49,50   → +7 STR total
    // AGI: +1 at JL 30,46                 → +2 AGI total
    // VIT: +1 at JL 6,18,38,42            → +4 VIT total
    // DEX: +1 at JL 10,22,36              → +3 DEX total
    // LUK: +1 at JL 26,44                 → +2 LUK total  (18 total)
    swordsman: [
      { jl: 2,  stat: "str" }, { jl:14, stat: "str" }, { jl:33, stat: "str" },
      { jl:40,  stat: "str" }, { jl:47, stat: "str" }, { jl:49, stat: "str" },
      { jl:50,  stat: "str" },
  
      { jl:30,  stat: "agi" }, { jl:46, stat: "agi" },
  
      { jl: 6,  stat: "vit" }, { jl:18, stat: "vit" }, { jl:38, stat: "vit" },
      { jl:42,  stat: "vit" },
  
      { jl:10,  stat: "dex" }, { jl:22, stat: "dex" }, { jl:36, stat: "dex" },
  
      { jl:26,  stat: "luk" }, { jl:44, stat: "luk" },
    ],
  
    // ── MAGICIAN (max JL 50) ────────────────────────────────────────
    // AGI: +1 at JL 18,26,40,47           → +4 AGI total
    // INT: +1 at JL 2,14,22,33,38,44,46,50→ +8 INT total
    // DEX: +1 at JL 6,10,36               → +3 DEX total
    // LUK: +1 at JL 30,42,49              → +3 LUK total  (18 total)
    magician: [
      { jl:18,  stat: "agi" }, { jl:26, stat: "agi" }, { jl:40, stat: "agi" },
      { jl:47,  stat: "agi" },
  
      { jl: 2,  stat: "int" }, { jl:14, stat: "int" }, { jl:22, stat: "int" },
      { jl:33,  stat: "int" }, { jl:38, stat: "int" }, { jl:44, stat: "int" },
      { jl:46,  stat: "int" }, { jl:50, stat: "int" },
  
      { jl: 6,  stat: "dex" }, { jl:10, stat: "dex" }, { jl:36, stat: "dex" },
  
      { jl:30,  stat: "luk" }, { jl:42, stat: "luk" }, { jl:49, stat: "luk" },
    ],
  
    // ── ARCHER (max JL 50) ──────────────────────────────────────────
    // STR: +1 at JL 6,38,40              → +3 STR total
    // AGI: +1 at JL 26,33,49             → +3 AGI total
    // VIT: +1 at JL 46                   → +1 VIT total
    // INT: +1 at JL 10,47                → +2 INT total
    // DEX: +1 at JL 2,14,18,30,36,42,50  → +7 DEX total
    // LUK: +1 at JL 22,44                → +2 LUK total  (18 total)
    archer: [
      { jl: 6,  stat: "str" }, { jl:38, stat: "str" }, { jl:40, stat: "str" },
  
      { jl:26,  stat: "agi" }, { jl:33, stat: "agi" }, { jl:49, stat: "agi" },
  
      { jl:46,  stat: "vit" },
  
      { jl:10,  stat: "int" }, { jl:47, stat: "int" },
  
      { jl: 2,  stat: "dex" }, { jl:14, stat: "dex" }, { jl:18, stat: "dex" },
      { jl:30,  stat: "dex" }, { jl:36, stat: "dex" }, { jl:42, stat: "dex" },
      { jl:50,  stat: "dex" },
  
      { jl:22,  stat: "luk" }, { jl:44, stat: "luk" },
    ],
  
    // ── ACOLYTE (max JL 50) ─────────────────────────────────────────
    // STR: +1 at JL 26,42,49             → +3 STR total
    // AGI: +1 at JL 22,40               → +2 AGI total
    // VIT: +1 at JL 6,30,44             → +3 VIT total
    // INT: +1 at JL 10,33,46            → +3 INT total
    // DEX: +1 at JL 14,36,46            → +3 DEX total
    // LUK: +1 at JL 2,18,38,50          → +4 LUK total  (18 total)
    acolyte: [
      { jl:26,  stat: "str" }, { jl:42, stat: "str" }, { jl:49, stat: "str" },
  
      { jl:22,  stat: "agi" }, { jl:40, stat: "agi" },
  
      { jl: 6,  stat: "vit" }, { jl:30, stat: "vit" }, { jl:44, stat: "vit" },
  
      { jl:10,  stat: "int" }, { jl:33, stat: "int" }, { jl:46, stat: "int" },
  
      { jl:14,  stat: "dex" }, { jl:36, stat: "dex" }, { jl:46, stat: "dex" },
  
      { jl: 2,  stat: "luk" }, { jl:18, stat: "luk" }, { jl:38, stat: "luk" },
      { jl:50,  stat: "luk" },
    ],
  
    // ── MERCHANT (max JL 50) ────────────────────────────────────────
    // STR: +1 at JL 10,22,40,44,49      → +5 STR total
    // AGI: +1 at JL 33                  → +1 AGI total
    // VIT: +1 at JL 2,18,30,47          → +4 VIT total
    // INT: +1 at JL 26                  → +1 INT total
    // DEX: +1 at JL 6,14,38,42,50       → +5 DEX total
    // LUK: +1 at JL 36,46               → +2 LUK total  (18 total)
    merchant: [
      { jl:10,  stat: "str" }, { jl:22, stat: "str" }, { jl:40, stat: "str" },
      { jl:44,  stat: "str" }, { jl:49, stat: "str" },
  
      { jl:33,  stat: "agi" },
  
      { jl: 2,  stat: "vit" }, { jl:18, stat: "vit" }, { jl:30, stat: "vit" },
      { jl:47,  stat: "vit" },
  
      { jl:26,  stat: "int" },
  
      { jl: 6,  stat: "dex" }, { jl:14, stat: "dex" }, { jl:38, stat: "dex" },
      { jl:42,  stat: "dex" }, { jl:50, stat: "dex" },
  
      { jl:36,  stat: "luk" }, { jl:46, stat: "luk" },
    ],
  
    // ── THIEF (max JL 50) ───────────────────────────────────────────
    // STR: +1 at JL 6,30,38,47          → +4 STR total
    // AGI: +1 at JL 2,33,36,50          → +4 AGI total
    // VIT: +1 at JL 14,44               → +2 VIT total
    // INT: +1 at JL 18                  → +1 INT total
    // DEX: +1 at JL 10,22,42,49         → +4 DEX total
    // LUK: +1 at JL 26,40,46            → +3 LUK total  (18 total)
    thief: [
      { jl: 6,  stat: "str" }, { jl:30, stat: "str" }, { jl:38, stat: "str" },
      { jl:47,  stat: "str" },
  
      { jl: 2,  stat: "agi" }, { jl:33, stat: "agi" }, { jl:36, stat: "agi" },
      { jl:50,  stat: "agi" },
  
      { jl:14,  stat: "vit" }, { jl:44, stat: "vit" },
  
      { jl:18,  stat: "int" },
  
      { jl:10,  stat: "dex" }, { jl:22, stat: "dex" }, { jl:42, stat: "dex" },
      { jl:49,  stat: "dex" },
  
      { jl:26,  stat: "luk" }, { jl:40, stat: "luk" }, { jl:46, stat: "luk" },
    ],
  };
  
  // ===================================================================
  // PUBLIC API
  // ===================================================================
  
  /**
   * Calculate all active job-level stat bonuses for a character.
   *
   * @param {string} job       - e.g. "swordsman"
   * @param {number} jobLevel  - current job level (0 = none selected)
   * @returns {{ str, agi, vit, int, dex, luk }}
   */
  function calculateJobBonuses(job, jobLevel) {
    const bonuses = { str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0 };
    if (!jobLevel) return bonuses;
  
    const entries = JOB_BONUSES[job];
    if (!entries) return bonuses;
  
    for (const entry of entries) {
      if (jobLevel >= entry.jl) {
        bonuses[entry.stat]++;
      }
    }
  
    return bonuses;
  }