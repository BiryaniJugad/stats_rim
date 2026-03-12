function calculateCombatStats(character) {
    const { str, agi, vit, int, dex, luk } = character.stats;
    const level = character.baseLevel;
  
    // ----------------------------
    // STR (Strength)
    const strBonus = Math.floor(str / 10) ** 2;
  
    // DEX melee bonus (every 5 DEX = +1 ATK)
    const dexMeleeBonus = Math.floor(dex / 5);
  
    // LUK bonus to attack (every 5 LUK = +1 ATK)
    const lukAttackBonus = Math.floor(luk / 5);
  
    const attack = str + strBonus + dexMeleeBonus + lukAttackBonus;
    const weightLimit = str * 30;
  
    // ----------------------------
    // AGI (Agility)
    // Base flee: level + AGI
    let flee = level + agi;
  
    // LUK contributes to flee rate (every 10 LUK = +1)
    const fleeBonusFromLuk = Math.floor(luk / 10);
    flee += fleeBonusFromLuk;
  
    // ----------------------------
    // ADDED: DEX minor ASPD bonus
    const dexAspdBonus = Math.floor(dex / 20);
    const attackSpeed = 150 + Math.floor(agi / 5) + dexAspdBonus;
  
    // ----------------------------
    // VIT (Vitality)
    const defense = vit;
    const job = character.job || "novice";

    const baseHP = calculateBaseHP(level, job);
    const maxHP = Math.floor(baseHP * (1 + vit / 100));

    const baseSP = calculateBaseSP(level, job);
    const maxSP = Math.floor(baseSP * (1 + int / 100));
  
    // ----------------------------
    // INT (Intelligence)
    const baseMatk = int;
    const minMatkBonus = Math.floor(int / 7) ** 2;
    const maxMatkBonus = Math.floor(int / 5) ** 2;
  
    const matkMin = baseMatk + minMatkBonus;
    const matkMax = baseMatk + maxMatkBonus;
  
    const mdefBase = int;
    // ----------------------------
    // DEX (Dexterity)
    const hit = level + dex;
  
    // ----------------------------
    // LUK (Luck)
    const crit = Math.max(1, Math.floor(luk * 0.3) + 1); // base 1 + LUK effect
  
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
      weightLimit,
      maxHP,
      maxSP,
      spRegen,
      spRecoveryBonusPercent,
    };
  }
