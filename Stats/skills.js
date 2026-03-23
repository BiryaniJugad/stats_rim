// ===================================================================
// RAGNAROK SKILL SYSTEM — skills.js
// ===================================================================

const SVG_ADD   = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const SVG_MINUS = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

// ===================================================================
// SKILL DATA
// ===================================================================

const JOB_SKILLS = {

    'Novice': {
        label: 'Novice',
        unlocked: [
            { name: 'Basic Skill', cur: 0, max: 9, type: 'active' },
            { name: 'First Aid',   cur: 1, max: 1, type: 'quest'  }, //active but quest
            { name: 'Trick Dead',  cur: 1, max: 1, type: 'quest'  },
        ],
        locked: [],
    },

    'Swordsman': {
        label: 'Swordsman',
        unlocked: [
            { name: 'Sword Mastery',               cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Increase Recuperative Power', cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Bash',                        cur: 0, max: 10, type: 'active' },
            { name: 'Provoke',                     cur: 0, max: 10, type: 'active' }, 
            { name: 'Moving HP Recovery',          cur: 1, max: 1,  type: 'quest'  }, //passive but quest
            { name: 'Fatal Blow',                  cur: 1, max: 1,  type: 'quest'  }, //passive but quest
            { name: 'Auto Berserk',                cur: 1, max: 1,  type: 'quest'  }, //active but quest
        ],
        locked: [
            { name: 'Two-Handed Sword Mastery', max: 10, req: 'Sword Mastery Lv 1' },//passive
            { name: 'Magnum Break',             max: 10, req: 'Bash Lv 5'          },
            { name: 'Endure',                   max: 10, req: 'Provoke Lv 5'       },
        ],
    },

    'Magician': {
        label: 'Magician',
        unlocked: [
            { name: 'Increase Spiritual Power', cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Sight',                    cur: 0, max: 1,  type: 'active' },
            { name: 'Napalm Beat',              cur: 0, max: 10, type: 'active' }, 
            { name: 'Cold Bolt',                cur: 0, max: 10, type: 'active' },
            { name: 'Stone Curse',              cur: 0, max: 10, type: 'active' },
            { name: 'Fire Bolt',                cur: 0, max: 10, type: 'active' },
            { name: 'Lightning Bolt',           cur: 0, max: 10, type: 'active' },
            { name: 'Energy Coat',              cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Soul Strike',   max: 10, req: 'Napalm Beat Lv 4'                   },
            { name: 'Frost Diver',   max: 10, req: 'Cold Bolt Lv 5'                     },
            { name: 'Fire Ball',     max: 10, req: 'Fire Bolt Lv 4'                     },
            { name: 'Fire Wall',     max: 10, req: 'Sight Lv 1, Fire Ball Lv 5'         },
            { name: 'Thunder Storm', max: 10, req: 'Lightning Bolt Lv 4'                },
            { name: 'Safety Wall',   max: 10, req: 'Napalm Beat Lv 7, Soul Strike Lv 5' },
        ],
    },

    'Archer': {
        label: 'Archer',
        unlocked: [
            { name: "Owl's Eye",       cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Double Strafing', cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Making Arrow',    cur: 1, max: 1,  type: 'quest'  },
            { name: 'Charge Arrow',    cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: "Vulture's Eye",         max: 10, req: "Owl's Eye Lv 3"       },
            { name: 'Attention Concentrate', max: 10, req: "Vulture's Eye Lv 1"   },
            { name: 'Arrow Shower',          max: 10, req: 'Double Strafing Lv 5' },
        ],
    },

    'Acolyte': {
        label: 'Acolyte',
        unlocked: [
            { name: 'Divine Protection', cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Ruwach',            cur: 0, max: 1,  type: 'active' }, 
            { name: 'Heal',              cur: 0, max: 10, type: 'active' },
            { name: 'Aqua Benedicta',    cur: 0, max: 1,  type: 'active' },
            { name: 'Holy Light',        cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Demon Bane',       max: 10, req: 'Divine Protection Lv 3'  }, //passive
            { name: 'Teleportation',    max: 2,  req: 'Ruwach Lv 1'             },
            { name: 'Warp Portal',      max: 4,  req: 'Teleportation Lv 2'      },
            { name: 'Pneuma',           max: 1,  req: 'Warp Portal Lv 4'        },
            { name: 'Increase Agility', max: 10, req: 'Heal Lv 3'               },
            { name: 'Decrease Agility', max: 10, req: 'Increase Agility Lv 1'   },
            { name: 'Signum Crucis',    max: 10, req: 'Demon Bane Lv 3'         },
            { name: 'Angelus',          max: 10, req: 'Divine Protection Lv 3'  },
            { name: 'Blessing',         max: 10, req: 'Divine Protection Lv 5'  },
            { name: 'Cure',             max: 1,  req: 'Heal Lv 2'               },
        ],
    },

    'Merchant': {
        label: 'Merchant',
        unlocked: [
            { name: 'Enlarge Weight Limit', cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Identify',             cur: 0, max: 1,  type: 'active' },
            { name: 'Mammonite',            cur: 0, max: 10, type: 'active' },
            { name: 'Cart Revolution',      cur: 1, max: 1,  type: 'quest'  },
            { name: 'Change Cart',          cur: 1, max: 1,  type: 'quest'  },
            { name: 'Loud Exclamation',     cur: 1, max: 1,  type: 'quest'  },
            { name: 'Cart Decoration',      cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Discount',     max: 10, req: 'Enlarge Weight Limit Lv 3' }, //passive
            { name: 'Overcharge',   max: 10, req: 'Discount Lv 3'             }, //passive
            { name: 'Pushcart',     max: 10, req: 'Enlarge Weight Limit Lv 5' }, //passive
            { name: 'Vending',      max: 10, req: 'Pushcart Lv 3'             },
            { name: 'Buying Store', max: 1,  req: 'Vending Lv 1'              },
        ],
    },

    'Thief': {
        label: 'Thief',
        unlocked: [
            { name: 'Double Attack',  cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Increase Dodge', cur: 0, max: 10, type: 'active' }, //passive
            { name: 'Steal',          cur: 0, max: 10, type: 'active' }, 
            { name: 'Envenom',        cur: 0, max: 10, type: 'active' },
            { name: 'Sprinkle Sand',  cur: 1, max: 1,  type: 'quest'  },
            { name: 'Back Sliding',   cur: 1, max: 1,  type: 'quest'  },
            { name: 'Pick Stone',     cur: 1, max: 1,  type: 'quest'  },
            { name: 'Throw Stone',    cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Hiding',   max: 10, req: 'Steal Lv 5'   },
            { name: 'Detoxify', max: 1,  req: 'Envenom Lv 3' },
        ],
    },
};

// ===================================================================
// RUNTIME STATE
// activeSkillData holds the live (deep-cloned) skill state.
// _allLocked is a frozen copy of the original locked list so we can
// restore req strings when re-locking skills on level reduction.
// ===================================================================

let activeSkillData = null;

// ===================================================================
// PREREQUISITE PARSER
// "Bash Lv 5"                    → [{ skillName:"Bash", level:5 }]
// "Sight Lv 1, Fire Ball Lv 5"  → [{ skillName:"Sight", level:1 },
//                                    { skillName:"Fire Ball", level:5 }]
// ===================================================================

function parseReqs(reqStr) {
    return reqStr.split(', ').map(part => {
        const m = part.match(/^(.+?)\s+Lv\s+(\d+)$/);
        if (!m) return null;
        return { skillName: m[1].trim(), level: parseInt(m[2], 10) };
    }).filter(Boolean);
}

// ===================================================================
// LEVEL LOOKUP MAP  (name → cur level, from unlocked[])
// ===================================================================

function buildLevelMap() {
    const map = {};
    activeSkillData.unlocked.forEach(s => { map[s.name] = s.cur; });
    return map;
}

// ===================================================================
// CHECK UNLOCKS
// Promotes any locked skill whose every prerequisite is now satisfied.
// Runs repeatedly until no more promotions happen (handles chains:
// e.g. Ruwach → Teleportation → Warp Portal → Pneuma).
// ===================================================================

function checkUnlocks() {
    let anyPromoted = true;
    while (anyPromoted) {
        anyPromoted = false;
        const levels     = buildLevelMap();
        const stillLocked = [];

        activeSkillData.locked.forEach(s => {
            const reqs = parseReqs(s.req);
            const met  = reqs.every(r => (levels[r.skillName] ?? 0) >= r.level);
            if (met) {
                activeSkillData.unlocked.push({ name: s.name, cur: 0, max: s.max, type: 'active' });
                anyPromoted = true;
            } else {
                stillLocked.push(s);
            }
        });

        activeSkillData.locked = stillLocked;
    }
}

// ===================================================================
// CHECK LOCKS
// When a skill's level drops, any promoted skill that no longer meets
// its prerequisites moves back to the locked table.
// Runs repeatedly to handle cascading de-promotions (e.g. if Ruwach
// drops to 0, Teleportation goes back, and then Warp Portal and Pneuma
// must also go back).
// ===================================================================

function checkLocks() {
    let anyDemoted = true;
    while (anyDemoted) {
        anyDemoted = false;
        const levels        = buildLevelMap();
        const remainUnlocked = [];

        activeSkillData.unlocked.forEach(s => {
            // Find original locked entry (has the req string)
            const orig = activeSkillData._allLocked.find(l => l.name === s.name);
            if (!orig) {
                // Always-available skill — never demote
                remainUnlocked.push(s);
                return;
            }

            // Check prereqs without counting this skill itself
            const levelsWithout = { ...levels };
            delete levelsWithout[s.name];

            const reqs = parseReqs(orig.req);
            const met  = reqs.every(r => (levelsWithout[r.skillName] ?? 0) >= r.level);

            if (met) {
                remainUnlocked.push(s);
            } else {
                // Return to locked list with original req intact
                activeSkillData.locked.push({ name: orig.name, max: orig.max, req: orig.req });
                anyDemoted = true;
            }
        });

        activeSkillData.unlocked = remainUnlocked;
    }
}

// ===================================================================
// FOOTER
// ===================================================================

function updateFooter() {
    if (!activeSkillData) return;
    const pts  = Math.max(0, (character.jobLevel || 0) - 1);
    const used = activeSkillData.unlocked.reduce(
        (sum, s) => sum + (s.type !== 'quest' ? s.cur : 0), 0
    );
    const usedEl = document.getElementById('skill-pts-used');
    const leftEl = document.getElementById('skill-pts-left');
    if (usedEl) usedEl.textContent = used;
    if (leftEl) leftEl.textContent = Math.max(0, pts - used);
}

// ===================================================================
// RENDER BOTH TABLES
// Called after any state change so both sides stay in sync.
// ===================================================================

function renderSkillTables() {
    if (!activeSkillData) return;

    const label        = activeSkillData.label;
    const unlockedBody = document.getElementById('skills-unlocked-body');
    const lockedBody   = document.getElementById('skills-locked-body');
    if (!unlockedBody || !lockedBody) return;

    // ── Unlocked ──────────────────────────────────────────────────
    let uHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills ~</td></tr>`;

    activeSkillData.unlocked.forEach((s, idx) => {
        const isQuest = s.type === 'quest';
        const typeTag = isQuest
            ? `<span class="skill-tag quest">Quest</span>`
            : `<span class="skill-tag active">Active</span>`;
        const minBtn = `<button class="skill-adj-btn minus" ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx}, -1)"`}>${SVG_MINUS}</button>`;
        const addBtn = `<button class="skill-adj-btn add"   ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx},  1)"`}>${SVG_ADD}</button>`;

        uHTML += `
        <tr data-skill-idx="${idx}">
            <td><div class="skill-icon"></div></td>
            <td><span class="skill-name-link">${s.name}</span></td>
            <td>
                <div class="skill-lvl-cell">
                    ${minBtn}
                    <span class="skill-level-badge">${s.cur} / ${s.max}</span>
                    ${addBtn}
                </div>
            </td>
            <td>${typeTag}</td>
        </tr>`;
    });

    unlockedBody.innerHTML = uHTML;

    // ── Locked ────────────────────────────────────────────────────
    let lHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills ~</td></tr>`;

    if (activeSkillData.locked.length === 0) {
        lHTML += `<tr><td colspan="4" class="skills-sub-label" style="padding:10px 0;">—</td></tr>`;
    } else {
        activeSkillData.locked.forEach(s => {
            lHTML += `
            <tr>
                <td><div class="skill-icon"></div></td>
                <td><span class="skill-name-link">${s.name}</span></td>
                <td><span class="skill-level-badge">${s.max}</span></td>
                <td><span class="skill-req">${s.req}</span></td>
            </tr>`;
        });
    }

    lockedBody.innerHTML = lHTML;
}

// ===================================================================
// ADJUST SKILL LEVEL  (+1 / -1)
// ===================================================================

function adjustSkill(idx, delta) {
    const s = activeSkillData.unlocked[idx];
    if (s.type === 'quest') return;

    const pts  = Math.max(0, (character.jobLevel || 0) - 1);
    const used = activeSkillData.unlocked.reduce(
        (sum, sk) => sum + (sk.type !== 'quest' ? sk.cur : 0), 0
    );
    const left = pts - used;

    if (delta > 0 && (s.cur >= s.max || left <= 0)) return;
    if (delta < 0 && s.cur <= 0) return;

    s.cur += delta;

    if (delta > 0) {
        // Level up — check if any locked skills are now available
        checkUnlocks();
    } else {
        // Level down — check if any promoted skills must go back,
        // then re-check if anything newly satisfies prereqs
        checkLocks();
        checkUnlocks();
    }

    renderSkillTables();
    updateFooter();

    if (typeof updateUI === "function") updateUI();
}

// ===================================================================
// RENDER SKILLS  (full init for a job)
// ===================================================================

function renderSkills(jobName) {
    const raw = JOB_SKILLS[jobName];
    if (!raw) return;

    // Deep clone so edits don't mutate master data
    activeSkillData = JSON.parse(JSON.stringify(raw));

    // Freeze a copy of the original locked list so checkLocks() can
    // always look up req strings even after skills are promoted
    activeSkillData._allLocked = JSON.parse(JSON.stringify(raw.locked));

    renderSkillTables();
    updateFooter();

    if (typeof updateUI === "function") updateUI();
}

// ===================================================================
// JOB BUTTON SELECTION
// ===================================================================

function selectJobBtn(btn) {
    document.querySelectorAll('.job-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.title);
}

// ===================================================================
// INIT
// ===================================================================

document.addEventListener('DOMContentLoaded', () => renderSkills('Novice'));