// ===================================================================
// RAGNAROK STAT SYSTEM - PROFESSIONAL VERSION
// Auto-disable buttons instead of alert()
// ===================================================================

// ===================================================================
// FORMULAS
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
  
  function getTotalCostToReachStat(currentStat, targetStat) {
    let totalCost = 0;
    for (let i = currentStat; i < targetStat; i++) {
      totalCost += getStatIncreaseCost(i);
    }
    return totalCost;
  }
  
  // ===================================================================
  // CHARACTER STATE
  // ===================================================================
  
  const character = {
    baseLevel: 1,
    stats: {
      str: 1,
      agi: 1,
      vit: 1,
      int: 1,
      dex: 1,
      luk: 1,
    },
    availablePoints: 0,
  };
  
  // ===================================================================
  // DOM ELEMENTS
  // ===================================================================
  
  let elements = {};
   
  function initializeElements() {
    // Base Level input
    elements.levelInput = document.getElementById("base-level");
  
    // Status Point display
    elements.statusPointInput = Array.from(
      document.querySelectorAll(".data-node")
    ).find(node => node.textContent.includes("STATUS POINT"))
      ?.querySelector(".val");
  
    // Attribute rows
    const statRows = document.querySelectorAll(".stats-box .stat-row");

    elements.statRows = {};
    
    statRows.forEach(row => {
      const name = row.querySelector("span").textContent.trim().toLowerCase();
      elements.statRows[name] = row;
    });
  
    // Info box values
const dataNodes = document.querySelectorAll(".info-box .data-node");

dataNodes.forEach(node => {
  const label = node.children[0].textContent.trim();

  switch (label) {
    case "ATK":
      elements.attackInput = node.querySelector(".val");
      break;

    case "MATK":
      elements.matkMinInput = node.querySelectorAll(".val")[0];
      elements.matkMaxInput = node.querySelectorAll(".val")[1];
      break;

    case "DEF":
      elements.defenseInput = node.querySelectorAll(".val")[1];
      break;

    case "MDEF":
      elements.magicDefenseInput = node.querySelectorAll(".val")[1];
      break;

    case "FLEE":
      elements.fleeBaseInput = node.querySelectorAll(".val")[0];
      elements.fleeLukInput = node.querySelectorAll(".val")[1];
      break;

    case "HIT":
      elements.hitRateInput = node.querySelector(".val");
      break;

    case "CRITICAL":
      elements.critInput = node.querySelector(".val");
      break;

    case "ASPD":
      elements.attackSpeedInput = node.querySelector(".val");
      break;

    case "STATUS POINT":
      elements.statusPointInput = node.querySelector(".val");
      break;
  }
})};
  
  // ===================================================================
  // CORE LOGIC
  // ===================================================================
  
  function calculateRemainingPointsWithChange(statName, newValue) {
    const totalPoints = getTotalStatPointsForLevel(character.baseLevel);
  
    const spentPoints = Object.keys(character.stats).reduce((sum, stat) => {
      const value = stat === statName ? newValue : character.stats[stat];
      return sum + getTotalCostToReachStat(1, value);
    }, 0);
  
    return totalPoints - spentPoints;
  }
  
  function trySetStat(statName, newValue) {
    newValue = Math.max(1, Math.min(99, parseInt(newValue) || 1));
  
    const remaining = calculateRemainingPointsWithChange(statName, newValue);
  
    if (remaining < 0) return;
  
    character.stats[statName] = newValue;
    character.availablePoints = remaining;
  
    updateUI();
  }
  
  // ===================================================================
  // LEVEL UPDATE
  // ===================================================================
  
  function updateLevel(newLevel) {
    newLevel = Math.max(1, Math.min(99, parseInt(newLevel) || 1));
    character.baseLevel = newLevel;
  
    const totalPoints = getTotalStatPointsForLevel(newLevel);
  
    const spentPoints = Object.values(character.stats).reduce((sum, value) => {
      return sum + getTotalCostToReachStat(1, value);
    }, 0);
  
    character.availablePoints = Math.max(0, totalPoints - spentPoints);
  
    updateUI();
  }
  
  // ===================================================================
  // UI UPDATE
  // ===================================================================
  
  function updateUI() {
    const combatStats = calculateCombatStats(character);
  
    elements.attackInput.textContent = combatStats.attack;
    elements.matkMinInput.textContent = combatStats.matkMin;
    elements.matkMaxInput.textContent = combatStats.matkMax;
    elements.critInput.textContent = combatStats.crit;
    elements.defenseInput.textContent = combatStats.defense;
    elements.magicDefenseInput.textContent = combatStats.mdefBase;
    elements.attackSpeedInput.textContent = combatStats.attackSpeed;
    elements.hitRateInput.textContent = combatStats.hit;
  
    if (elements.fleeBaseInput) {
      elements.fleeBaseInput.textContent =
        Math.max(1, character.baseLevel + character.stats.agi);
    }
  
    if (elements.fleeLukInput) {
      const fleeLukBonus = 1 + Math.floor(character.stats.luk / 10);
      elements.fleeLukInput.textContent = fleeLukBonus;
    }
  
    if (document.activeElement !== elements.levelInput) {
      elements.levelInput.value = character.baseLevel;
    }
  
    if (elements.statusPointInput) {
      elements.statusPointInput.textContent = character.availablePoints;
    }
  
    const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];
  
    statOrder.forEach(statName => {
      const row = elements.statRows[statName];
      const input = row.querySelector("input");
      const reqDisplay = row.querySelector(".req");
  
      const currentValue = character.stats[statName];
      const cost = getStatIncreaseCost(currentValue);
  
      input.value = currentValue;
      reqDisplay.textContent = cost;
    });
  
    const maxHP = combatStats.maxHP;
    const currentHP = Math.min(maxHP, Math.floor(maxHP * 0.85));
  
    const hpFill = document.querySelector(".hp-fill");
    if (hpFill) {
      hpFill.style.width = `${Math.floor((currentHP / maxHP) * 100)}%`;
    }
  }
  
  // ===================================================================
  // EVENTS
  // ===================================================================
  
  function attachEventListeners() {
    const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];
  
    statOrder.forEach((statName) => {
      const row = elements.statRows[statName];
      const input = row.querySelector(".stat-input");

        input.setAttribute("maxlength", "2");
  
      input.addEventListener("input", (e) => {
        let raw = e.target.value.replace(/\D/g, "");
        if (raw === "") {
          e.target.value = "";
          return;
        }
  
        let requestedValue = parseInt(raw);
        requestedValue = Math.max(1, Math.min(99, requestedValue));
  
        const totalPoints = getTotalStatPointsForLevel(character.baseLevel);
        const spentPointsExcludingThis = Object.keys(character.stats).reduce(
          (sum, stat) =>
            stat === statName
              ? sum
              : sum + getTotalCostToReachStat(1, character.stats[stat]),
          0,
        );
  
        let maxAllowed = 1;
        for (let i = 1; i <= 99; i++) {
          if (
            spentPointsExcludingThis + getTotalCostToReachStat(1, i) <=
            totalPoints
          ) {
            maxAllowed = i;
          } else {
            break;
          }
        }
  
        if (requestedValue > maxAllowed) {
          requestedValue = maxAllowed;
          row.classList.add("stat-error");
          setTimeout(() => row.classList.remove("stat-error"), 500);
        }
  
        e.target.value = requestedValue;
        trySetStat(statName, requestedValue);
      });
  
      input.addEventListener("blur", () => {
        if (!input.value || parseInt(input.value) < 1) {
          trySetStat(statName, 1);
        }
      });
  
    });
  
    elements.levelInput.addEventListener("input", (e) => {
      // Remove everything that is not a number
      let cleaned = e.target.value.replace(/[^0-9]/g, "");
  
      // If user deleted everything
      if (cleaned === "") {
        e.target.value = "";
        return;
      }
  
      let numericValue = parseInt(cleaned, 10);
  
      // Clamp between 1 and 99
      numericValue = Math.max(1, Math.min(99, numericValue));
  
      // Force cleaned + clamped value back into input
      e.target.value = numericValue;
  
      updateLevel(numericValue);
    });
  
    elements.levelInput.addEventListener("blur", () => {
      if (!elements.levelInput.value || parseInt(elements.levelInput.value) < 1) {
        updateLevel(1);
      }
    });
  }
  
  // ===================================================================
  // INIT
  // ===================================================================
  
  function initialize() {
    initializeElements();
    updateLevel(1);
    attachEventListeners();
  }
  
  document.addEventListener("DOMContentLoaded", initialize);