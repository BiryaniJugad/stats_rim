// ===================================================================
// RAGNAROK SKILL SYSTEM — skills.js
// ===================================================================

const SVG_ADD   = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const SVG_MINUS = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

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
    'Increase Spiritual Power': '../images/skills/mg_increaseSpiritualPower.png',
    'Sight':                    '../images/skills/mg_sight.png',
    'Napalm Beat':              '../images/skills/mg_napalmBeat.png',
    'Cold Bolt':                '../images/skills/mg_coldBolt.png',
    'Stone Curse':              '../images/skills/mg_stoneCurse.png',
    'Fire Bolt':                '../images/skills/mg_fireBolt.png',
    'Lightning Bolt':           '../images/skills/mg_lightningBolt.png',
    'Energy Coat':              '../images/skills/mg_energyCoat.png',
    'Soul Strike':              '../images/skills/mg_soulStrike.png',
    'Frost Diver':              '../images/skills/mg_frostDiver.png',
    'Fire Ball':                '../images/skills/mg_fireBall.png',
    'Fire Wall':                '../images/skills/mg_fireWall.png',
    'Thunder Storm':            '../images/skills/mg_thunderStorm.png',
    'Safety Wall':              '../images/skills/mg_safetyWall.png',

    // ── Archer ──────────────────────────────────────────────────────
    "Owl's Eye":               '../images/skills/ac_owlsEye.png',
    'Double Strafing':         '../images/skills/ac_doubleStrafing.png',
    'Making Arrow':            '../images/skills/ac_makingArrow.png',
    'Charge Arrow':            '../images/skills/ac_chargeArrow.png',
    "Vulture's Eye":           '../images/skills/ac_vulturesEye.png',
    'Attention Concentrate':   '../images/skills/ac_attentionConcentrate.png',
    'Arrow Shower':            '../images/skills/ac_arrowShower.png',

    // ── Acolyte ─────────────────────────────────────────────────────
    'Divine Protection': '../images/skills/al_divineProtection.png',
    'Ruwach':            '../images/skills/al_ruwach.png',
    'Heal':              '../images/skills/al_heal.png',
    'Aqua Benedicta':    '../images/skills/al_aquaBenedicta.png',
    'Holy Light':        '../images/skills/al_holyLight.png',
    'Demon Bane':        '../images/skills/al_demonBane.png',
    'Teleportation':     '../images/skills/al_teleportation.png',
    'Warp Portal':       '../images/skills/al_warpPortal.png',
    'Pneuma':            '../images/skills/al_pneuma.png',
    'Increase Agility':  '../images/skills/al_increaseAgility.png',
    'Decrease Agility':  '../images/skills/al_decreaseAgility.png',
    'Signum Crucis':     '../images/skills/al_signumCrucis.png',
    'Angelus':           '../images/skills/al_angelus.png',
    'Blessing':          '../images/skills/al_blessing.png',
    'Cure':              '../images/skills/al_cure.png',

    // ── Merchant ────────────────────────────────────────────────────
    'Enlarge Weight Limit': '../images/skills/mc_enlargeWeightLimit.png',
    'Identify':             '../images/skills/mc_identify.png',
    'Mammonite':            '../images/skills/mc_mammonite.png',
    'Cart Revolution':      '../images/skills/mc_cartRevolution.png',
    'Change Cart':          '../images/skills/mc_changeCart.png',
    'Loud Exclamation':     '../images/skills/mc_loudExclamation.png',
    'Cart Decoration':      '../images/skills/mc_cartDecoration.png',
    'Discount':             '../images/skills/mc_discount.png',
    'Overcharge':           '../images/skills/mc_overcharge.png',
    'Pushcart':             '../images/skills/mc_pushcart.png',
    'Vending':              '../images/skills/mc_vending.png',
    'Buying Store':         '../images/skills/mc_buyingStore.png',

    // ── Thief ───────────────────────────────────────────────────────
    'Double Attack':  '../images/skills/tf_doubleAttack.png',
    'Increase Dodge': '../images/skills/tf_increaseDodge.png',
    'Steal':          '../images/skills/tf_steal.png',
    'Envenom':        '../images/skills/tf_envenom.png',
    'Sprinkle Sand':  '../images/skills/tf_sprinkleSand.png',
    'Back Sliding':   '../images/skills/tf_backSliding.png',
    'Pick Stone':     '../images/skills/tf_pickStone.png',
    'Throw Stone':    '../images/skills/tf_throwStone.png',     
    'Hiding':         '../images/skills/tf_hiding.png',
    'Detoxify':       '../images/skills/tf_detoxify.png',
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
// type: 'active'  — spendable, active use skill
// type: 'passive' — spendable, passive skill
// type: 'quest'   — fixed at cur level, no points spent
//                   add questType: 'active' or 'passive' for the badge
// ===================================================================

const JOB_SKILLS = {

    'Novice': {
        label: 'Novice',
        unlocked: [
            { name: 'Basic Skill', cur: 0, max: 9, type: 'passive'                      },
            { name: 'First Aid',   cur: 1, max: 1, type: 'quest', questType: 'active'   },
            { name: 'Trick Dead',  cur: 1, max: 1, type: 'quest', questType: 'active'   },
        ],
        locked: [],
    },

    'Swordsman': {
        label: 'Swordsman',
        unlocked: [
            { name: 'Sword Mastery',               cur: 0, max: 10, type: 'passive' },
            { name: 'Increase Recuperative Power', cur: 0, max: 10, type: 'passive' },
            { name: 'Bash',                        cur: 0, max: 10, type: 'active'  },
            { name: 'Provoke',                     cur: 0, max: 10, type: 'active'  },
            { name: 'Moving HP Recovery', cur: 1, max: 1, type: 'quest', questType: 'passive' },
            { name: 'Fatal Blow',         cur: 1, max: 1, type: 'quest', questType: 'passive' },
            { name: 'Auto Berserk',       cur: 1, max: 1, type: 'quest', questType: 'active'  },
        ],
        locked: [
            { name: 'Two-Handed Sword Mastery', max: 10, req: 'Sword Mastery Lv 1', lockedType: 'passive' },
            { name: 'Magnum Break',             max: 10, req: 'Bash Lv 5',          lockedType: 'active'  },
            { name: 'Endure',                   max: 10, req: 'Provoke Lv 5',       lockedType: 'active'  },
        ],
    },

    'Magician': {
        label: 'Magician',
        unlocked: [
            { name: 'Increase Spiritual Power', cur: 0, max: 10, type: 'passive' },
            { name: 'Sight',                    cur: 0, max: 1,  type: 'active'  },
            { name: 'Napalm Beat',              cur: 0, max: 10, type: 'active'  },
            { name: 'Cold Bolt',                cur: 0, max: 10, type: 'active'  },
            { name: 'Stone Curse',              cur: 0, max: 10, type: 'active'  },
            { name: 'Fire Bolt',                cur: 0, max: 10, type: 'active'  },
            { name: 'Lightning Bolt',           cur: 0, max: 10, type: 'active'  },
            { name: 'Energy Coat', cur: 1, max: 1, type: 'quest', questType: 'active' },
        ],
        locked: [
            { name: 'Soul Strike',   max: 10, req: 'Napalm Beat Lv 4',                   lockedType: 'active' },
            { name: 'Frost Diver',   max: 10, req: 'Cold Bolt Lv 5',                     lockedType: 'active' },
            { name: 'Fire Ball',     max: 10, req: 'Fire Bolt Lv 4',                     lockedType: 'active' },
            { name: 'Fire Wall',     max: 10, req: 'Sight Lv 1, Fire Ball Lv 5',         lockedType: 'active' },
            { name: 'Thunder Storm', max: 10, req: 'Lightning Bolt Lv 4',                lockedType: 'active' },
            { name: 'Safety Wall',   max: 10, req: 'Napalm Beat Lv 7, Soul Strike Lv 5', lockedType: 'active' },
        ],
    },

    'Archer': {
        label: 'Archer',
        unlocked: [
            { name: "Owl's Eye",       cur: 0, max: 10, type: 'passive' },
            { name: 'Double Strafing', cur: 0, max: 10, type: 'active'  },
            { name: 'Making Arrow', cur: 1, max: 1, type: 'quest', questType: 'active' },
            { name: 'Charge Arrow', cur: 1, max: 1, type: 'quest', questType: 'active' },
        ],
        locked: [
            { name: "Vulture's Eye",         max: 10, req: "Owl's Eye Lv 3",       lockedType: 'passive' },
            { name: 'Attention Concentrate', max: 10, req: "Vulture's Eye Lv 1",   lockedType: 'active' },
            { name: 'Arrow Shower',          max: 10, req: 'Double Strafing Lv 5', lockedType: 'active'  },
        ],
    },

    'Acolyte': {
        label: 'Acolyte',
        unlocked: [
            { name: 'Divine Protection', cur: 0, max: 10, type: 'passive' },
            { name: 'Ruwach',            cur: 0, max: 1,  type: 'active'  },
            { name: 'Heal',              cur: 0, max: 10, type: 'active'  },
            { name: 'Aqua Benedicta',    cur: 0, max: 1,  type: 'active'  },
            { name: 'Holy Light', cur: 1, max: 1, type: 'quest', questType: 'active' },
        ],
        locked: [
            { name: 'Demon Bane',       max: 10, req: 'Divine Protection Lv 3',  lockedType: 'passive' },
            { name: 'Teleportation',    max: 2,  req: 'Ruwach Lv 1',             lockedType: 'active'  },
            { name: 'Warp Portal',      max: 4,  req: 'Teleportation Lv 2',      lockedType: 'active'  },
            { name: 'Pneuma',           max: 1,  req: 'Warp Portal Lv 4',        lockedType: 'active'  },
            { name: 'Increase Agility', max: 10, req: 'Heal Lv 3',               lockedType: 'active'  },
            { name: 'Decrease Agility', max: 10, req: 'Increase Agility Lv 1',   lockedType: 'active'  },
            { name: 'Signum Crucis',    max: 10, req: 'Demon Bane Lv 3',         lockedType: 'active' },
            { name: 'Angelus',          max: 10, req: 'Divine Protection Lv 3',  lockedType: 'active' },
            { name: 'Blessing',         max: 10, req: 'Divine Protection Lv 5',  lockedType: 'active'  },
            { name: 'Cure',             max: 1,  req: 'Heal Lv 2',               lockedType: 'active'  },
        ],
    },

    'Merchant': {
        label: 'Merchant',
        unlocked: [
            { name: 'Enlarge Weight Limit', cur: 0, max: 10, type: 'passive' },
            { name: 'Identify',             cur: 0, max: 1,  type: 'active'  },
            { name: 'Mammonite',            cur: 0, max: 10, type: 'active'  },
            { name: 'Cart Revolution', cur: 1, max: 1, type: 'quest', questType: 'active'  },
            { name: 'Change Cart',     cur: 1, max: 1, type: 'quest', questType: 'active'  },
            { name: 'Loud Exclamation',cur: 1, max: 1, type: 'quest', questType: 'passive' },
            { name: 'Cart Decoration', cur: 1, max: 1, type: 'quest', questType: 'active'  },
        ],
        locked: [
            { name: 'Discount',     max: 10, req: 'Enlarge Weight Limit Lv 3', lockedType: 'passive' },
            { name: 'Overcharge',   max: 10, req: 'Discount Lv 3',             lockedType: 'passive' },
            { name: 'Pushcart',     max: 10, req: 'Enlarge Weight Limit Lv 5', lockedType: 'passive' },
            { name: 'Vending',      max: 10, req: 'Pushcart Lv 3',             lockedType: 'active'  },
            { name: 'Buying Store', max: 1,  req: 'Vending Lv 1',              lockedType: 'active'  },
        ],
    },

    'Thief': {
        label: 'Thief',
        unlocked: [
            { name: 'Double Attack',  cur: 0, max: 10, type: 'passive' },
            { name: 'Increase Dodge', cur: 0, max: 10, type: 'passive' },
            { name: 'Steal',          cur: 0, max: 10, type: 'active'  },
            { name: 'Envenom',        cur: 0, max: 10, type: 'active'  },
            { name: 'Sprinkle Sand', cur: 1, max: 1, type: 'quest', questType: 'active' },
            { name: 'Back Sliding',  cur: 1, max: 1, type: 'quest', questType: 'active' },
            { name: 'Pick Stone',    cur: 1, max: 1, type: 'quest', questType: 'active' },
            { name: 'Throw Stone',   cur: 1, max: 1, type: 'quest', questType: 'active' },
        ],
        locked: [
            { name: 'Hiding',   max: 10, req: 'Steal Lv 5',   lockedType: 'active' },
            { name: 'Detoxify', max: 1,  req: 'Envenom Lv 3', lockedType: 'active' },
        ],
    },
};

// ===================================================================
// SKILL EFFECTS REGISTRY
// ===================================================================
const SKILL_EFFECTS = {

    // ── SWORDSMAN ────────────────────────────────────────────────────
    // +4 ATK per level when equipped with Dagger or One-Handed Sword
    'Sword Mastery': {
        condition: (char) => ['dagger', 'sword_1h'].includes(char.weaponKey),
        bonus: (level) => ({ atk: 4 * level }),
    },

    // +4 ATK per level when equipped with Two-Handed Sword
    'Two-Handed Sword Mastery': {
        condition: (char) => char.weaponKey === 'sword_2h',
        bonus: (level) => ({ atk: 4 * level }),
    },

    // Flat HP per 10s still: floor((5*level) + (maxHP*0.002*level))
    // HP item efficiency: +10% per level
    'Increase Recuperative Power': {
        bonus: (level, char, maxHP) => ({
            flatHPRegen: Math.floor((5 * level) + (maxHP * 0.002 * level)),
            healItemMod: 10 * level,
        }),
    },

    // ── MAGICIAN ─────────────────────────────────────────────────────
    // Flat SP per 10s still: floor((maxSP/500 + 3) * level)
    // SP item efficiency: +2% per level
    'Increase Spiritual Power': {
        bonus: (level, char, maxHP, maxSP) => ({
            flatSPRegen: Math.floor((maxSP / 500 + 3) * level),
            spItemMod:   2 * level,
        }),
    },

    // ── ARCHER ───────────────────────────────────────────────────────
    // +1 DEX per level (improves HIT, ATK melee bonus, ASPD)
    "Owl's Eye": {
        bonus: (level) => ({ dex: level }),
    },

    // +1 hit when bow equipped
    "Vulture's Eye": {
        condition: (char) => char.weaponKey === 'bow',
        bonus: (level) => ({ hit: level }),
    },

    // ── ACOLYTE ──────────────────────────────────────────────────────
    // +3 def per level against undead
    'Divine Protection': {
        bonus: (level) => ({ def: 3 * level }),
    },

    // +3 atk per level against undead
    'Demon Bane': {
        bonus: (level) => ({ atk: 3 * level }),
    },

    // ── MERCHANT ─────────────────────────────────────────────────────
    // +200 weight capacity per level
    'Enlarge Weight Limit': {
        bonus: (level) => ({ weightBonus: 200 * level }),
    },

    // ── THIEF ────────────────────────────────────────────────────────
    // +3 flee per level
    'Increase Dodge': {
        bonus: (level) => ({ flee: 3 * level }),
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

function buildLevelMap() {
    const map = {};
    activeSkillData.unlocked.forEach(s => { map[s.name] = s.cur; });
    return map;
}

// ===================================================================
// CHECK UNLOCKS  (chain-safe)
// ===================================================================

function checkUnlocks() {
    let anyPromoted = true;
    while (anyPromoted) {
        anyPromoted = false;
        const levels      = buildLevelMap();
        const stillLocked = [];
        activeSkillData.locked.forEach(s => {
            const met = parseReqs(s.req).every(r => (levels[r.skillName] ?? 0) >= r.level);
            if (met) {
                activeSkillData.unlocked.push({ name: s.name, cur: 0, max: s.max, type: s.lockedType ?? 'active' });
                anyPromoted = true;
            } else {
                stillLocked.push(s);
            }
        });
        activeSkillData.locked = stillLocked;
    }
}

// ===================================================================
// CHECK LOCKS  (cascade-safe)
// ===================================================================

function checkLocks() {
    let anyDemoted = true;
    while (anyDemoted) {
        anyDemoted = false;
        const levels         = buildLevelMap();
        const remainUnlocked = [];
        activeSkillData.unlocked.forEach(s => {
            const orig = activeSkillData._allLocked.find(l => l.name === s.name);
            if (!orig) { remainUnlocked.push(s); return; }
            const lw  = { ...levels }; delete lw[s.name];
            const met = parseReqs(orig.req).every(r => (lw[r.skillName] ?? 0) >= r.level);
            if (met) {
                remainUnlocked.push(s);
            } else {
                activeSkillData.locked.push({ name: orig.name, max: orig.max, req: orig.req, lockedType: orig.lockedType });
                anyDemoted = true;
            }
        });
        activeSkillData.unlocked = remainUnlocked;
    }
}

// ===================================================================
// CALCULATE ACTIVE SKILL BONUSES
// Called by combat.js. maxHP and maxSP passed in for pool-based formulas.
// Returns summed bonuses across all active skills.
// ===================================================================

function calculateSkillBonuses(character, maxHP = 0, maxSP = 0) {
    const result = {
        // Base stat bonuses
        str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0,
        // Direct combat stat bonuses
        atk: 0, matk: 0, def: 0, mdef: 0, flee: 0, hit: 0,
        aspdFlat: 0,
        // Regen
        hprMod: 0, sprMod: 0, flatHPRegen: 0, flatSPRegen: 0,
        // Item efficiency
        healItemMod: 0, spItemMod: 0,
        // Weight
        weightBonus: 0,
    };

    if (!activeSkillData) return result;

    activeSkillData.unlocked.forEach(s => {
        if (s.cur <= 0) return;
        const effect = SKILL_EFFECTS[s.name];
        if (!effect) return;
        if (effect.condition && !effect.condition(character, s.cur)) return;
        const b = effect.bonus(s.cur, character, maxHP, maxSP);
        for (const key of Object.keys(result)) {
            if (b[key] !== undefined) result[key] += b[key];
        }
    });

    return result;
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
// TAG BUILDER
// ===================================================================

function buildTypeTags(s) {
    const isQuest  = s.type === 'quest';
    const questTag = `<span class="skill-tag quest">Quest</span>`;
    const subType  = (isQuest ? s.questType : s.type) === 'passive'
        ? `<span class="skill-tag passive">Passive</span>`
        : `<span class="skill-tag active">Active</span>`;
    return isQuest
        ? `<div class="skill-tag-group">${subType}${questTag}</div>`
        : `<div class="skill-tag-group">${subType}</div>`;
}

function buildLockedTypeTag(s) {
    return s.lockedType === 'passive'
        ? `<span class="skill-tag passive">Passive</span>`
        : `<span class="skill-tag active">Active</span>`;
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

    let uHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills ~</td></tr>`;
    activeSkillData.unlocked.forEach((s, idx) => {
        const isQuest = s.type === 'quest';
        const minBtn  = `<button class="skill-adj-btn minus" ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx}, -1)"`}>${SVG_MINUS}</button>`;
        const addBtn  = `<button class="skill-adj-btn add"   ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx},  1)"`}>${SVG_ADD}</button>`;
        uHTML += `
        <tr data-skill-idx="${idx}">
            <td><div class="skill-icon-wrap">${getSkillIcon(s.name)}</div></td>
            <td><span class="skill-name-link" onclick="openSkillModal('${s.name.replace(/'/g, "\\'")}')">${s.name}</span></td>
            <td><div class="skill-lvl-cell">${minBtn}<span class="skill-level-badge">${s.cur} / ${s.max}</span>${addBtn}</div></td>
            <td>${buildTypeTags(s)}</td>
        </tr>`;
    });
    unlockedBody.innerHTML = uHTML;

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
                <td>${buildLockedTypeTag(s)}<span class="skill-req">${s.req}</span></td>
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

