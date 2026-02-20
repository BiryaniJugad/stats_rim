// ===================================================================
// UTILITY FORMULAS
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
    stats: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
    availablePoints: 0,
};

let elements = {};

// Optional: SFX Helper
function playSound(type) {
    // If you have audio files, uncomment below
    // new Audio(`assets/${type}.mp3`).play().catch(()=>{});
}

// ===================================================================
// DOM ELEMENT SELECTION
// ===================================================================
function initializeElements() {
    const derivedCol = document.querySelector(".status-columns .column:nth-child(3)");
    const rows = derivedCol.querySelectorAll(".table-row");

    elements.attackInput = rows[0].querySelector("input"); 
    
    const matkInputs = rows[1].querySelectorAll("input");
    elements.MinmagicAttackInput = matkInputs[0];
    elements.MaxmagicAttackInput = matkInputs[1];

    elements.hitRateInput = rows[2].querySelector("input");
    elements.critInput = rows[3].querySelector("input");

    const defInputs = rows[4].querySelectorAll("input");
    elements.defenseInput = defInputs[0]; 

    const mdefInputs = rows[5].querySelectorAll("input");
    elements.magicDefenseInput = mdefInputs[0];

    const fleeInputs = rows[6].querySelectorAll("input");
    elements.fleeBaseInput = fleeInputs[0];
    elements.fleeLukInput = fleeInputs[1];

    elements.attackSpeedInput = rows[7].querySelector("input");

    elements.levelInput = document.querySelector(".lvl-value-input");
    elements.statusPointInput = document.querySelector(".status-value");

    const statRows = document.querySelectorAll(".column:first-child .table-row");
    elements.statRows = {
        str: statRows[0], agi: statRows[1], vit: statRows[2],
        int: statRows[3], dex: statRows[4], luk: statRows[5]
    };

    elements.ptsReqDisplays = document.querySelectorAll(".column:nth-child(3) .table-row .value");
}

// ===================================================================
// LOGIC & UI UPDATES
// ===================================================================
function updateUI() {
    if (typeof calculateCombatStats !== 'function') {
        console.error("calculateCombatStats is not defined. Is combat.js loaded?");
        return;
    }
    
    const combatStats = calculateCombatStats(character);

    elements.attackInput.value = combatStats.attack;
    elements.MinmagicAttackInput.value = combatStats.matkMin;
    elements.MaxmagicAttackInput.value = combatStats.matkMax;
    elements.critInput.value = combatStats.crit;
    elements.defenseInput.value = combatStats.defense;
    elements.magicDefenseInput.value = combatStats.mdefBase;
    elements.attackSpeedInput.value = combatStats.attackSpeed;
    elements.hitRateInput.value = combatStats.hit;

    if (elements.fleeBaseInput) elements.fleeBaseInput.value = character.baseLevel + character.stats.agi;
    if (elements.fleeLukInput) elements.fleeLukInput.value = 1 + Math.floor(character.stats.luk / 10);

    elements.levelInput.value = character.baseLevel;
    elements.statusPointInput.value = character.availablePoints;

    const statOrder = ["str", "agi", "vit", "int", "dex", "luk"];
    statOrder.forEach((statName, index) => {
        const row = elements.statRows[statName];
        if (!row) return;
        const input = row.querySelector(".stat-input");
        const cost = getStatIncreaseCost(character.stats[statName]);

        input.value = character.stats[statName];
        if (elements.ptsReqDisplays[index]) elements.ptsReqDisplays[index].textContent = cost;

        row.querySelector(".stat-btn.plus").disabled = character.stats[statName] >= 99 || character.availablePoints < cost;
        row.querySelector(".stat-btn.minus").disabled = character.stats[statName] <= 1;
    });

    const hpFill = document.querySelector(".hp-fill");
    const hpText = document.querySelector(".bar-text-input");
    const maxHP = combatStats.maxHP || 100;
    if (hpFill) hpFill.style.width = "85%"; 
    if (hpText) hpText.value = `${Math.floor(maxHP * 0.85).toLocaleString()} / ${maxHP.toLocaleString()}`;
}

function trySetStat(statName, newValue) {
    newValue = Math.max(1, Math.min(99, parseInt(newValue) || 1));
    const totalPoints = getTotalStatPointsForLevel(character.baseLevel);
    
    // Calculate total cost if this change were applied
    const spentPoints = Object.keys(character.stats).reduce((sum, s) => {
        const val = s === statName ? newValue : character.stats[s];
        return sum + getTotalCostToReachStat(1, val);
    }, 0);

    if (totalPoints - spentPoints >= 0) {
        character.stats[statName] = newValue;
        character.availablePoints = totalPoints - spentPoints;
        updateUI();
        return true;
    }
    return false;
}

function updateLevel(newLevel) {
    character.baseLevel = Math.max(1, Math.min(99, parseInt(newLevel) || 1));
    const totalPoints = getTotalStatPointsForLevel(character.baseLevel);
    const spentPoints = Object.values(character.stats).reduce((sum, val) => sum + getTotalCostToReachStat(1, val), 0);
    character.availablePoints = Math.max(0, totalPoints - spentPoints);
    updateUI();
}

// ===================================================================
// EVENT LISTENERS (CLICK + TYPE)
// ===================================================================
function attachEventListeners() {
    Object.keys(character.stats).forEach((statName) => {
        const row = elements.statRows[statName];
        const input = row.querySelector(".stat-input");
        const plusBtn = row.querySelector(".stat-btn.plus");
        const minusBtn = row.querySelector(".stat-btn.minus");

        // Typing logic
        input.oninput = (e) => {
            let val = e.target.value.replace(/\D/g, ""); // Only numbers
            if (val !== "") {
                const requestedValue = parseInt(val);
                const success = trySetStat(statName, requestedValue);
                
                if (!success) {
                    // Revert UI if points insufficient
                    e.target.value = character.stats[statName];
                    row.classList.add("stat-error");
                    setTimeout(() => row.classList.remove("stat-error"), 300);
                }
            }
        };

        input.onblur = (e) => {
            if (e.target.value === "") e.target.value = character.stats[statName];
        };

        // Button logic
        plusBtn.onclick = () => {
            playSound('click');
            trySetStat(statName, character.stats[statName] + 1);
        };

        minusBtn.onclick = () => {
            playSound('click');
            trySetStat(statName, character.stats[statName] - 1);
        };
    });

    elements.levelInput.oninput = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val !== "") {
            updateLevel(val);
        }
    };
}

// ===================================================================
// INITIALIZE
// ===================================================================
function initialize() {
    initializeElements();
    updateLevel(1);
    attachEventListeners();
}

document.addEventListener("DOMContentLoaded", initialize);