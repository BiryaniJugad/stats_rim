import { Primary } from './Primary.js';
import { Secondary } from './Secondary.js';

// === Grab primary stat inputs and cost spans ===
const statRows = document.querySelectorAll('.stat-row');
const statInputs = [];
const statReqs = [];

statRows.forEach(row => {
    const input = row.querySelector('input[type="number"]');
    const req = row.querySelector('.req');
    if (input && req) {
        statInputs.push(input);
        statReqs.push(req);
    }
});

// === Grab secondary stat outputs ===
const txtATK = document.querySelectorAll('.data-node:nth-child(1) .val');
const txtMATK = document.querySelectorAll('.data-node:nth-child(2) .val');
const txtDEF = document.querySelectorAll('.data-node:nth-child(3) .val');
const txtMDEF = document.querySelectorAll('.data-node:nth-child(4) .val');
const txtFLEE = document.querySelectorAll('.data-node:nth-child(5) .val');
const txtHIT = document.querySelectorAll('.data-node:nth-child(6) .val');
const txtCRIT = document.querySelectorAll('.data-node:nth-child(7) .val');
const txtASPD = document.querySelectorAll('.data-node:nth-child(8) .val');
const txtSP = document.querySelector('.data-node:nth-child(9) .val'); // remaining SP

// === Starting stat points ===
let totalSP = 48;

// === Stat cost function ===
function getStatCost(statValue) {
    if (statValue <= 11) return 2;
    if (statValue <= 21) return 3;
    if (statValue <= 31) return 4;
    if (statValue <= 41) return 5;
    if (statValue <= 51) return 6;
    if (statValue <= 61) return 7;
    if (statValue <= 71) return 8;
    if (statValue <= 81) return 9;
    if (statValue <= 91) return 10;
    return 11;
}

// === Recalculate secondary stats and stat costs ===
function recalcStats() {
    const str = parseInt(statInputs[0].value);
    const agi = parseInt(statInputs[1].value);
    const vit = parseInt(statInputs[2].value);
    const intel = parseInt(statInputs[3].value);
    const dex = parseInt(statInputs[4].value);
    const luk = parseInt(statInputs[5].value);

    const primary = new Primary(str, agi, vit, intel, dex, luk);
    const secondary = new Secondary(primary);

    // --- Update secondary stats ---
    txtATK[0].textContent = txtATK[1].textContent = secondary.getATK();
    txtMATK[0].textContent = secondary.getMATKMin();
    txtMATK[1].textContent = secondary.getMATKMax();
    txtDEF[0].textContent = txtDEF[1].textContent = secondary.getDEF();
    txtMDEF[0].textContent = txtMDEF[1].textContent = secondary.getMDEF();
    txtFLEE[0].textContent = txtFLEE[1].textContent = secondary.getFLEE();
    txtHIT[0].textContent = secondary.getHIT();
    txtCRIT[0].textContent = secondary.getCRIT();
    txtASPD[0].textContent = secondary.getASPD();

    // --- Update required points per stat ---
    let spentSP = 0;
    statInputs.forEach((input, i) => {
        const cost = getStatCost(parseInt(input.value));
        statReqs[i].textContent = cost;
        spentSP += (parseInt(input.value) - 1) * cost; // base stat 1 costs nothing
    });

    // --- Update remaining SP ---
    let remainingSP = totalSP - spentSP;
    if (remainingSP < 0) remainingSP = 0;
    if (txtSP) txtSP.textContent = remainingSP;
}

// --- Attach input listeners ---
statInputs.forEach(input => {
    input.addEventListener('input', recalcStats);
});

// --- Initial calculation ---
recalcStats();
