// ===================================================================
// RAGNAROK SKILL SYSTEM — skills.js
// ===================================================================

const SVG_ADD   = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const SVG_MINUS = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

// ===================================================================
// SKILL ICON IMAGE MAP
// Keys must exactly match skill names in JOB_SKILLS.
// Paths are relative to your project root (adjust if needed).
// ===================================================================

const SKILL_ICONS = {
    // ── Novice ──────────────────────────────────────────────────────
    'Basic Skill':  '../images/skills/n_basicSkills.png',
    'First Aid':    '../images/skills/n_firstAid.png',
    'Trick Dead':   '../images/skills/n_playDead.png',

    // ── Swordsman ───────────────────────────────────────────────────
    'Sword Mastery':               '../images/skills/sw_swordMastery.png',
    'Increase Recuperative Power': '../images/skills/sw_increaseRecuperativePower.png',
    'Bash':                        '../images/skills/sw_bash.png',
    'Provoke':                     '../images/skills/sw_provoke.png',
    'Moving HP Recovery':          '../images/skills/sw_movingHpRecovery.png',
    'Fatal Blow':                  '../images/skills/sw_fatalBlow.png',
    'Auto Berserk':                '../images/skills/sw_autoBerserk.png',
    'Two-Handed Sword Mastery':    '../images/skills/sw_twoHandedSwordMastery.png',
    'Magnum Break':                '../images/skills/sw_magnumBreak.png',
    'Endure':                      '../images/skills/sw_endure.png',

    // ── Magician ────────────────────────────────────────────────────
    'Increase Spiritual Power': 'images/skills/mg_increaseSpiritualPower.png',
    'Sight':                    'images/skills/mg_sight.png',
    'Napalm Beat':              'images/skills/mg_napalmBeat.png',
    'Cold Bolt':                'images/skills/mg_coldBolt.png',
    'Stone Curse':              'images/skills/mg_stoneCurse.png',
    'Fire Bolt':                'images/skills/mg_fireBolt.png',
    'Lightning Bolt':           'images/skills/mg_lightningBolt.png',
    'Energy Coat':              'images/skills/mg_energyCoat.png',
    'Soul Strike':              'images/skills/mg_soulStrike.png',
    'Frost Diver':              'images/skills/mg_frostDiver.png',
    'Fire Ball':                'images/skills/mg_fireBall.png',
    'Fire Wall':                'images/skills/mg_fireWall.png',
    'Thunder Storm':            'images/skills/mg_thunderStorm.png',
    'Safety Wall':              'images/skills/mg_safetyWall.png',

    // ── Archer ──────────────────────────────────────────────────────
    "Owl's Eye":               'images/skills/ac_owlsEye.png',
    'Double Strafing':         'images/skills/ac_doubleStrafing.png',
    'Making Arrow':            'images/skills/ac_makingArrow.png',
    'Charge Arrow':            'images/skills/ac_chargeArrow.png',
    "Vulture's Eye":           'images/skills/ac_vulturesEye.png',
    'Attention Concentrate':   'images/skills/ac_attentionConcentrate.png',
    'Arrow Shower':            'images/skills/ac_arrowShower.png',

    // ── Acolyte ─────────────────────────────────────────────────────
    'Divine Protection': 'images/skills/al_divineProtection.png',
    'Ruwach':            'images/skills/al_ruwach.png',
    'Heal':              'images/skills/al_heal.png',
    'Aqua Benedicta':    'images/skills/al_aquaBenedicta.png',
    'Holy Light':        'images/skills/al_holyLight.png',
    'Demon Bane':        'images/skills/al_demonBane.png',
    'Teleportation':     'images/skills/al_teleportation.png',
    'Warp Portal':       'images/skills/al_warpPortal.png',
    'Pneuma':            'images/skills/al_pneuma.png',
    'Increase Agility':  'images/skills/al_increaseAgility.png',
    'Decrease Agility':  'images/skills/al_decreaseAgility.png',
    'Signum Crucis':     'images/skills/al_signumCrucis.png',
    'Angelus':           'images/skills/al_angelus.png',
    'Blessing':          'images/skills/al_blessing.png',
    'Cure':              'images/skills/al_cure.png',

    // ── Merchant ────────────────────────────────────────────────────
    'Enlarge Weight Limit': 'images/skills/mc_enlargeWeightLimit.png',
    'Identify':             'images/skills/mc_identify.png',
    'Mammonite':            'images/skills/mc_mammonite.png',
    'Cart Revolution':      'images/skills/mc_cartRevolution.png',
    'Change Cart':          'images/skills/mc_changeCart.png',
    'Loud Exclamation':     'images/skills/mc_loudExclamation.png',
    'Cart Decoration':      'images/skills/mc_cartDecoration.png',
    'Discount':             'images/skills/mc_discount.png',
    'Overcharge':           'images/skills/mc_overcharge.png',
    'Pushcart':             'images/skills/mc_pushcart.png',
    'Vending':              'images/skills/mc_vending.png',
    'Buying Store':         'images/skills/mc_buyingStore.png',

    // ── Thief ───────────────────────────────────────────────────────
    'Double Attack':  'images/skills/tf_doubleAttack.png',
    'Increase Dodge': 'images/skills/tf_increaseDodge.png',
    'Steal':          'images/skills/tf_steal.png',
    'Envenom':        'images/skills/tf_envenom.png',
    'Sprinkle Sand':  'images/skills/tf_sprinkleSand.png',
    'Back Sliding':   'images/skills/tf_backSliding.png',
    'Pick Stone':     'images/skills/tf_pickStone.png',
    'Throw Stone':    'images/skills/tf_throwStone.png',
    'Hiding':         'images/skills/tf_hiding.png',
    'Detoxify':       'images/skills/tf_detoxify.png',
};

// ===================================================================
// HELPER — returns an <img> tag if the skill has a mapped icon,
// otherwise falls back to the empty placeholder div.
// ===================================================================

function getSkillIcon(skillName) {
    const src = SKILL_ICONS[skillName];
    if (src) {
        return `<img src="${src}" alt="${skillName}" class="skill-icon-img" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
                <div class="skill-icon" style="display:none"></div>`;
    }
    return `<div class="skill-icon"></div>`;
}

// ===================================================================
// SKILL DATA
// ===================================================================

const JOB_SKILLS = {

    'Novice': {
        label: 'Novice',
        unlocked: [
            { name: 'Basic Skill', cur: 0, max: 9, type: 'active' },
            { name: 'First Aid',   cur: 1, max: 1, type: 'quest'  },
            { name: 'Trick Dead',  cur: 1, max: 1, type: 'quest'  },
        ],
        locked: [],
    },

    'Swordsman': {
        label: 'Swordsman',
        unlocked: [
            { name: 'Sword Mastery',               cur: 0, max: 10, type: 'active' },
            { name: 'Increase Recuperative Power', cur: 0, max: 10, type: 'active' },
            { name: 'Bash',                        cur: 0, max: 10, type: 'active' },
            { name: 'Provoke',                     cur: 0, max: 10, type: 'active' },
            { name: 'Moving HP Recovery',          cur: 1, max: 1,  type: 'quest'  },
            { name: 'Fatal Blow',                  cur: 1, max: 1,  type: 'quest'  },
            { name: 'Auto Berserk',                cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Two-Handed Sword Mastery', max: 10, req: 'Sword Mastery Lv 1' },
            { name: 'Magnum Break',             max: 10, req: 'Bash Lv 5'          },
            { name: 'Endure',                   max: 10, req: 'Provoke Lv 5'       },
        ],
    },

    'Magician': {
        label: 'Magician',
        unlocked: [
            { name: 'Increase Spiritual Power', cur: 0, max: 10, type: 'active' },
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
            { name: "Owl's Eye",       cur: 0, max: 10, type: 'active' },
            { name: 'Double Strafing', cur: 0, max: 10, type: 'active' },
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
            { name: 'Divine Protection', cur: 0, max: 10, type: 'active' },
            { name: 'Ruwach',            cur: 0, max: 1,  type: 'active' },
            { name: 'Heal',              cur: 0, max: 10, type: 'active' },
            { name: 'Aqua Benedicta',    cur: 0, max: 1,  type: 'active' },
            { name: 'Holy Light',        cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Demon Bane',       max: 10, req: 'Divine Protection Lv 3'  },
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
            { name: 'Enlarge Weight Limit', cur: 0, max: 10, type: 'active' },
            { name: 'Identify',             cur: 0, max: 1,  type: 'active' },
            { name: 'Mammonite',            cur: 0, max: 10, type: 'active' },
            { name: 'Cart Revolution',      cur: 1, max: 1,  type: 'quest'  },
            { name: 'Change Cart',          cur: 1, max: 1,  type: 'quest'  },
            { name: 'Loud Exclamation',     cur: 1, max: 1,  type: 'quest'  },
            { name: 'Cart Decoration',      cur: 1, max: 1,  type: 'quest'  },
        ],
        locked: [
            { name: 'Discount',     max: 10, req: 'Enlarge Weight Limit Lv 3' },
            { name: 'Overcharge',   max: 10, req: 'Discount Lv 3'             },
            { name: 'Pushcart',     max: 10, req: 'Enlarge Weight Limit Lv 5' },
            { name: 'Vending',      max: 10, req: 'Pushcart Lv 3'             },
            { name: 'Buying Store', max: 1,  req: 'Vending Lv 1'              },
        ],
    },

    'Thief': {
        label: 'Thief',
        unlocked: [
            { name: 'Double Attack',  cur: 0, max: 10, type: 'active' },
            { name: 'Increase Dodge', cur: 0, max: 10, type: 'active' },
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
// ===================================================================

let activeSkillData = null;

// ===================================================================
// PREREQUISITE PARSER
// ===================================================================

function parseReqs(reqStr) {
    return reqStr.split(', ').map(part => {
        const m = part.match(/^(.+?)\s+Lv\s+(\d+)$/);
        if (!m) return null;
        return { skillName: m[1].trim(), level: parseInt(m[2], 10) };
    }).filter(Boolean);
}

// ===================================================================
// LEVEL LOOKUP MAP
// ===================================================================

function buildLevelMap() {
    const map = {};
    activeSkillData.unlocked.forEach(s => { map[s.name] = s.cur; });
    return map;
}

// ===================================================================
// CHECK UNLOCKS
// ===================================================================

function checkUnlocks() {
    let anyPromoted = true;
    while (anyPromoted) {
        anyPromoted = false;
        const levels      = buildLevelMap();
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
// ===================================================================

function checkLocks() {
    let anyDemoted = true;
    while (anyDemoted) {
        anyDemoted = false;
        const levels         = buildLevelMap();
        const remainUnlocked = [];

        activeSkillData.unlocked.forEach(s => {
            const orig = activeSkillData._allLocked.find(l => l.name === s.name);
            if (!orig) {
                remainUnlocked.push(s);
                return;
            }

            const levelsWithout = { ...levels };
            delete levelsWithout[s.name];

            const reqs = parseReqs(orig.req);
            const met  = reqs.every(r => (levelsWithout[r.skillName] ?? 0) >= r.level);

            if (met) {
                remainUnlocked.push(s);
            } else {
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
            <td><div class="skill-icon-wrap">${getSkillIcon(s.name)}</div></td>
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
                <td><div class="skill-icon-wrap">${getSkillIcon(s.name)}</div></td>
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
        checkUnlocks();
    } else {
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

    activeSkillData = JSON.parse(JSON.stringify(raw));
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