// ===================================================================
// RAGNAROK SKILL SYSTEM — skills.js
// ===================================================================

const SVG_UNLOCK = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5.5" width="8" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M4 5.5V3.5a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
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
// SKILL DESCRIPTIONS
// ─────────────────────────────────────────────────────────────────
// id             : numeric skill ID
// internalName   : engine skill code
// type           : 'Passive' | 'Active' | 'Self'
// maxLv          : max skill level (number)
// target         : targeting string shown in popup header
// range          : range string shown in popup header
// property       : elemental property (optional, shown in red)
// knockback      : knockback distance (optional)
// area           : area of effect (optional)
// requirements   : { 'ClassName': 'Skill Lv N' } — what this skill needs
// requiredFor    : { 'ClassName': 'Skill (Lv N)' } — what needs this skill
// desc           : effect description shown in "Effect" row
// notes          : string[] bullet points shown above the level table
// castDelay      : cast delay string e.g. '2 sec'
// effectDuration : duration string e.g. '10 sec'
// spCost         : sp cost string e.g. '30 SP'
// costTable      : { label: string, values: number[] } per-level cost row
// copyable       : boolean
// interruptible  : boolean
// relatedClass   : string
// relatedStatus  : string
// tableRows      : static level→description table
// effect         : function(level, char, maxHP, maxSP) → stat rows array
// ===================================================================

const SKILL_DESCRIPTIONS = {

    // ── NOVICE ───────────────────────────────────────────────────────
    'Basic Skill': {
        id: 1,
        internalName: 'NV_BASIC',
        type: 'Passive',
        maxLv: 9,
        target: '-',
        range: '-',
        desc: 'Enable to apply Basic Interface Skills.',
        tableRows: [
            { level: 1, desc: 'Enable to initialize Trade.\nAllow to Trade items with another Character.' },
            { level: 2, desc: 'Enable to express Emotions.\nUsing Alt+0~9 keys, Allow to express one\'s emotions. For emotions list push Alt+M.' },
            { level: 3, desc: 'Enable to Sit\nAllow to regenerate HP/SP two times faster with a sit gesture. To use type /sit or hit Insert.' },
            { level: 4, desc: 'Enable to open one\'s own Chat Room\nAllow to open a Chat Room. Push Alt+C to create.' },
            { level: 5, desc: 'Enable to join a Party\nAllow to join a party.' },
            { level: 6, desc: 'Enable to use Kafra Storage\nAllow to use an extra inventory that can hold 300 types of items. Talk to a Kafra to access it. All town Kafras offer this service, but some located in the wilderness may not.' },
            { level: 7, desc: '/organize [Party Name]' },
            { level: 9, desc: 'Enable to Transform into the 1st profession\nAllow to change one\'s Job into the 1st profession.' },
        ],
        effect: (lv) => {
            const ALL_LEVELS = [
                { label: 'Lv 1', value: 'Enable Trade — exchange items with other characters.' },
                { label: 'Lv 2', value: 'Enable Emotions — express emotions using Alt+0~9. View list with Alt+M.' },
                { label: 'Lv 3', value: 'Enable Sit — regenerate HP/SP 2× faster while sitting. Use /sit or Insert.' },
                { label: 'Lv 4', value: 'Enable Chat Room — create a chat room with Alt+C.' },
                { label: 'Lv 5', value: 'Enable Party — join a party.' },
                { label: 'Lv 6', value: 'Enable Kafra Storage — access an extra 300-slot inventory at any Kafra NPC.' },
                { label: 'Lv 7', value: 'Enable /organize — create your own party with /organize [Party Name].' },
                { label: 'Lv 9', value: 'Enable Job Change — allows changing into a 1st class profession.' },
            ];
            return ALL_LEVELS.map((row, i) => {
                const levelNum = i + 1;
                return { label: row.label, value: row.value, locked: levelNum > lv };
            });
        },
    },

    'First Aid': {
        id: 2,
        internalName: 'NV_FIRSTAID',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        spCost: '3 SP',
        interruptible: false,
        relatedClass: 'Novice',
        desc: 'Heal yourself for 5 HP. Not a crazy powerful skill, but mages seem to like it for saving money on healing items.',
    },

    'Trick Dead': {
        id: 3,
        internalName: 'NV_TRICKDEAD',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        copyable: false,
        interruptible: false,
        desc: 'You lay on the ground like you were dead and aggressive monsters wont target you.\nYou cant recover HP or SP while pretending to be dead.\nCasting Trick Dead a second time cancels it letting you move again.\nOnce you choose another Job you lose the ability to use this skill.',
        notes: ['Skill can be toggled on and off'],
        effect: () => [],
    },

    // ── SWORDSMAN ────────────────────────────────────────────────────
    'Sword Mastery': {
        id: 2,
        internalName: 'SM_SWORD',
        type: 'Passive, Physical',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredFor: {
            'Swordsman': 'Two-Handed Sword Mastery (Lv 1)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Swordsman',
        desc: 'Increases damage with Daggers and Swords (1-handed only) by 4*SkillLV. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks.',
        tableRows: [
            { level: 1,  desc: 'ATK +4'  },
            { level: 2,  desc: 'ATK +8'  },
            { level: 3,  desc: 'ATK +12' },
            { level: 4,  desc: 'ATK +16' },
            { level: 5,  desc: 'ATK +20' },
            { level: 6,  desc: 'ATK +24' },
            { level: 7,  desc: 'ATK +28' },
            { level: 8,  desc: 'ATK +32' },
            { level: 9,  desc: 'ATK +36' },
            { level: 10, desc: 'ATK +40' },
        ],
        effect: (lv) => [
            { label: 'Mastery ATK', value: `+${4 * lv}`, details: 'Bypasses Defense' },
        ],
    },

    'Two-Handed Sword Mastery': {
        id: 3,
        internalName: 'SM_TWOHAND',
        type: 'Passive, Physical',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredFor: {
            'Swordsman': 'Sword Mastery Lv 1',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Swordsman',
        desc: 'Increases damage with Two-Handed Swords by 4*SkillLV. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks.',
        tableRows: [
            { level: 1,  desc: 'ATK +4'  },
            { level: 2,  desc: 'ATK +8'  },
            { level: 3,  desc: 'ATK +12' },
            { level: 4,  desc: 'ATK +16' },
            { level: 5,  desc: 'ATK +20' },
            { level: 6,  desc: 'ATK +24' },
            { level: 7,  desc: 'ATK +28' },
            { level: 8,  desc: 'ATK +32' },
            { level: 9,  desc: 'ATK +36' },
            { level: 10, desc: 'ATK +40' },
        ],
        effect: (lv) => [
            { label: 'Weapon Type',       value: 'Two-Handed Swords' },
            { label: 'Mastery ATK Bonus', value: `+${4 * lv}`, details: 'Ignores Armor/VIT Def' },
        ],
    },

    'Increase Recuperative Power': {
        id: 4,
        internalName: 'SM_RECOVERY',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredFor: {
            'Lord Knight': 'Concentration (Spear Dynamo) (Lv 5), Tension Relax (Lv 10)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Swordsman',
        desc: 'Heals ((5*SkillLV) + (Maximum HP*0.002*SkillLV)) HP per 10 full seconds spent standing on one cell. Increases the effect of healing items by (10*SkillLV)% (cumulative with the increase from VIT).',
        tableRows: [
            { level: 1,  desc: 'Every 10 secs/HP +5'  },
            { level: 2,  desc: 'Every 10 secs/HP +10' },
            { level: 3,  desc: 'Every 10 secs/HP +15' },
            { level: 4,  desc: 'Every 10 secs/HP +20' },
            { level: 5,  desc: 'Every 10 secs/HP +25' },
            { level: 6,  desc: 'Every 10 secs/HP +30' },
            { level: 7,  desc: 'Every 10 secs/HP +35' },
            { level: 8,  desc: 'Every 10 secs/HP +40' },
            { level: 9,  desc: 'Every 10 secs/HP +45' },
            { level: 10, desc: 'Every 10 secs/HP +50' },
        ],
        effect: (lv, char, maxHP = 0) => {
            const flatRecovery   = 5 * lv;
            const percentRecovery = maxHP * 0.002 * lv;
            const itemBonus      = 10 * lv;
            return [
                { label: 'Standing Recovery',         value: `${flatRecovery} + ${percentRecovery.toFixed(1)} HP / 10s`, details: `Based on ${maxHP} Max HP` },
                { label: 'Healing Item Effectiveness', value: `+${itemBonus}%`, next: lv < 10 ? `+${10 * (lv + 1)}%` : null },
            ];
        },
    },

    'Bash': {
        id: 5,
        internalName: 'SM_BASH',
        type: 'Offensive, Physical',
        maxLv: 10,
        target: 'Enemy',
        range: '1 cell',
        property: 'Weapon Property',
        requiredFor: {
            'Swordsman':   'Magnum Break (Lv 5)',
            'Knight':      'Bowling Bash (Lv 5)',
            'Super Novice': 'Magnum Break (Lv 5)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Swordsman',
        relatedStatus: 'Stun',
        spCost: '8 / 15 SP',
        castDelay: '1 sec',
        desc: 'A melee attack with ATK equal to (100+30*SkillLV)%. There is a HIT bonus of 5*SkillLV. If the character has the Fatal Blow skill as well, levels 6-10 will add a chance to Stun of 5%*(Bash SkillLV - 5) plus a bonus depending on BaseLV.',
        tableRows: [
            { level: 1,  desc: 'ATK 130%'  },
            { level: 2,  desc: 'ATK 160%'  },
            { level: 3,  desc: 'ATK 190%'  },
            { level: 4,  desc: 'ATK 220%'  },
            { level: 5,  desc: 'ATK 250%'  },
            { level: 6,  desc: 'ATK 280%'  },
            { level: 7,  desc: 'ATK 310%'  },
            { level: 8,  desc: 'ATK 340%'  },
            { level: 9,  desc: 'ATK 370%'  },
            { level: 10, desc: 'ATK 400%'  },
        ],
        costTable: {
            label: 'SP Cost',
            values: [8, 8, 8, 8, 8, 15, 15, 15, 15, 15],
        },
        effect: (lv) => {
            const atk      = 100 + (30 * lv);
            const hitBonus = 5 * lv;
            const spCost   = lv <= 5 ? 8 : 15;
            return [
                { label: 'Damage',     value: `${atk}% ATK` },
                { label: 'HIT Bonus',  value: `+${hitBonus}` },
                { label: 'SP Cost',    value: spCost },
            ];
        },
    },

    'Provoke': {
        id: 6,
        internalName: 'SM_PROVOKE',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
         requiredFor: {
            'Swordman' : 'Endure (Lv 5)',
            'Super Novice' : 'Endure (Lv 5)',
            'Lord Knight' : 'Parry (Lv 5), Tension Relax (Lv 5)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Swordsman',
        relatedStatus: 'Provoke',
        effectDuration: '30 sec',
        desc: 'Lowers the enemy DEF and VIT DEF by (5+5*SkillLV)% and increases their ATK by (2+3*SkillLV)%. Undead property and Boss monsters are not affected.',
        tableRows: [
            { level: 1,  desc: '53% Success, Target Attack +5%, Defense -10%'  },
            { level: 2,  desc: '56% Success, Target Attack +8%, Defense -15%'  },
            { level: 3,  desc: '59% Success, Target Attack +11%, Defense -20%' },
            { level: 4,  desc: '62% Success, Target Attack +14%, Defense -25%' },
            { level: 5,  desc: '65% Success, Target Attack +17%, Defense -30%' },
            { level: 6,  desc: '68% Success, Target Attack +20%, Defense -35%' },
            { level: 7,  desc: '71% Success, Target Attack +23%, Defense -40%' },
            { level: 8,  desc: '74% Success, Target Attack +26%, Defense -45%' },
            { level: 9,  desc: '77% Success, Target Attack +29%, Defense -50%' },
            { level: 10, desc: '80% Success, Target Attack +32%, Defense -55%' },
        ],
        costTable: {
            label: 'SP Cost',
            values: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        },
        effect: (lv) => {
            const successChance = 50 + (3 * lv);
            const defReduction  = 5 + (5 * lv);
            const atkIncrease   = 2 + (3 * lv);
            const spCost        = 3 + lv;
            return [
                { label: 'Success Chance',    value: `${successChance}%` },
                { label: 'Defense Reduction', value: `-${defReduction}%` },
                { label: 'Enemy ATK Increase',value: `+${atkIncrease}%` },
                { label: 'Duration',          value: '30 sec' },
                { label: 'SP Cost',           value: spCost },
                { label: 'Restriction',       value: 'Does not affect Boss/Undead' },
            ];
        },
    },

    'Moving HP Recovery': {
        id: 144,
        internalName: 'SM_MOVINGRECOVERY',
        type: 'Passive',
        maxLv: 1,
        target: '-',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Swordsman',
        desc: 'Character regenerates HP while walking. Rate is 50% of standing recovery, and not affected by Increase Recuperative Power skill.',
    },

    'Fatal Blow': {
        id: 145,
        internalName: 'SM_FATALBLOW',
        type: 'Passive, Physical',
        maxLv: 1,
        target: '-',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Swordsman',
        relatedStatus: 'Stun',
        desc: 'Adds chance of causing stun on target when using Bash level 6 or above. Base Stun Chance is 5%*(Bash SkillLV - 5) with a further modifier from character BaseLV and a minimum chance of 0%.',
        tableRows: [
            { level: 6,  desc: '5% Stun Chance'  },
            { level: 7,  desc: '10% Stun Chance' },
            { level: 8,  desc: '15% Stun Chance' },
            { level: 9,  desc: '20% Stun Chance' },
            { level: 10, desc: '25% Stun Chance' },
        ],
        effect: (bashLv, char, maxHP, maxSP, baseLv = 1) => {
            if (bashLv < 6) return [{ label: 'Stun Chance', value: '0%', details: 'Requires Bash Lv 6+' }];
            const baseStun  = 5 * (bashLv - 5);
            const totalStun = baseStun + (baseLv * 0.1);
            return [
                { label: 'Base Stun Chance',  value: `${baseStun}%` },
                { label: 'Total Stun Chance', value: `${totalStun.toFixed(1)}%`, details: `Includes Base Lv ${baseLv} bonus` },
            ];
        },
    },

    'Auto Berserk': {
        id: 146,
        internalName: 'SM_AUTOBERSERK',
        type: 'Active, Physical',
        maxLv: 1,
        target: 'Self',
        range: '-',
        spCost: '1 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Swordsman',
        relatedStatus: 'Provoke',
        desc: 'When your HP goes below 25%, you gain the effect of Provoke L10 on yourself. That means +32% ATK and -55% VIT DEF. The effect lasts until the character returns to more than 25% HP. The skill can be set to activate or not. The skill will even function after it has drained all your SP.',
    },

    'Magnum Break': {
        id: 7,
        internalName: 'SM_MAGNUM',
        type: 'Active, Physical',
        maxLv: 10,
        target: 'Self',
        range: '-',
        property: 'Fire',
        knockback: '2 cells',
        area: '5 x 5 cells',
        requirements: {
            'Swordsman':   'Bash Lv 5',
            'Super Novice': 'Bash Lv 5',
        },
        requiredFor: {
            'Knight':      'Bowling Bash (Lv 3)',
            'Lord Knight': 'Aura Blade (Lv 5)',
        },
        notes: ['Skill can affect or target traps'],
        castDelay: '2 sec',
        effectDuration: '10 sec',
        spCost: '30 SP',
        costTable: {
            label: 'HP Cost',
            values: [20, 20, 19, 19, 18, 18, 17, 17, 16, 16],
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Swordsman',
        relatedStatus: 'Watk_Element',
        desc: '5x5 cells, Fire property splash attack with ATK of (100+20*SkillLV)% and a +10*SkillLV bonus to HIT. Enemies hit by the attack are pushed back 2 cells. Drains 15 HP per use, but cannot kill character.\nAfter usage, it adds a 20% Fire-elemental bonus to ATK that lasts for 10 seconds.\nAfter the cast the attack sequence is not interrupted.',
        tableRows: [
            { level: 1,  desc: 'ATK 120%, +10 HIT'  },
            { level: 2,  desc: 'ATK 140%, +20 HIT'  },
            { level: 3,  desc: 'ATK 160%, +30 HIT'  },
            { level: 4,  desc: 'ATK 180%, +40 HIT'  },
            { level: 5,  desc: 'ATK 200%, +50 HIT'  },
            { level: 6,  desc: 'ATK 220%, +60 HIT'  },
            { level: 7,  desc: 'ATK 240%, +70 HIT'  },
            { level: 8,  desc: 'ATK 260%, +80 HIT'  },
            { level: 9,  desc: 'ATK 280%, +90 HIT'  },
            { level: 10, desc: 'ATK 300%, +100 HIT' },
        ],
        effect: (lv) => {
            const atkBonus = 100 + (20 * lv);
            const hitBonus = 10 * lv;
            const hpCost   = [20, 20, 19, 19, 18, 18, 17, 17, 16, 16][lv - 1];
            return [
                { label: 'Splash Damage',  value: `${atkBonus}% ATK` },
                { label: 'HIT Bonus',      value: `+${hitBonus}` },
                { label: 'Elemental Buff', value: '+20% Fire ATK (10s)' },
                { label: 'HP Cost',        value: hpCost },
                { label: 'SP Cost',        value: 30 },
            ];
        },
    },

    'Endure': {
        id: 8,
        internalName: 'SM_ENDURE',
        type: 'Active, Physical',
        maxLv: 10,
        target: 'Self',
        range: '-',
        requirements: {
            'Swordsman': 'Provoke Lv 5',
        },
        requiredFor: {
            'Knight':      'Parrying (Lv 1)',
            'Lord Knight': 'Parrying (Lv 1)',
        },
        spCost: '10 SP',
        castDelay: '10 sec',
        copyable: true,
        interruptible: false,
        relatedClass: 'Swordsman',
        relatedStatus: 'Endure',
        desc: 'Makes character skip "flinch" animation when hit, preventing "stun lock". Provides a +1*SkillLV bonus to MDEF. Effect cancels after 7 monster hits (no limit for players). Does not work in WoE (MDEF bonus only). 10s cooldown between casts.',
        tableRows: [
            { level: 1,  desc: 'Lasts for 10secs' },
            { level: 2,  desc: 'Lasts for 13secs' },
            { level: 3,  desc: 'Lasts for 16secs' },
            { level: 4,  desc: 'Lasts for 19secs' },
            { level: 5,  desc: 'Lasts for 22secs' },
            { level: 6,  desc: 'Lasts for 25secs' },
            { level: 7,  desc: 'Lasts for 28secs' },
            { level: 8,  desc: 'Lasts for 31secs' },
            { level: 9,  desc: 'Lasts for 34secs' },
            { level: 10, desc: 'Lasts for 37secs' },
        ],
        costTable: {
            label: 'SP Cost',
            values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        },
        effect: (lv) => {
            const duration  = 7 + (3 * lv);
            const mdefBonus = lv;
            return [
                { label: 'Stay Duration', value: `${duration} sec` },
                { label: 'MDEF Bonus',    value: `+${mdefBonus}` },
                { label: 'Hit Limit',     value: '7 Hits (Monsters only)' },
                { label: 'Cool Down',     value: '10 sec' },
                { label: 'SP Cost',       value: 10 },
                { label: 'WoE Status',    value: 'MDEF Bonus Only', details: 'Flinch protection disabled' },
            ];
        },
    },

    // ── MAGICIAN ─────────────────────────────────────────────────────
    'Increase Spiritual Power': {
        id: 9,
        internalName: 'MG_SRECOVERY',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredFor: {
            'Priest':      'R Assumptio (Lv 3), Basilica (Lv 1), Meditatio (Lv 5)',
            'High Priest': 'Parrying (Lv 1)',
            'High Wizard': 'Soul Drain (Lv 5), Magic Crasher (Lv 1)',
            'Professor': 'Indulge (Lv 1), Mind Breaker (Lv 3)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Magician',
        desc: '	Recovers (Maximum SP/500 + 3)*SkillLV SP per 10 full seconds when standing still and increases the efficiency of SP recovering items by +2% per SkillLV.',
        tableRows: [
            { level: 1,  desc: '+3SP/10sec, items +2%'  },
            { level: 2,  desc: '+6SP/10sec,items +4%'  },
            { level: 3,  desc: '5+9SP/10sec,items +6%' },
            { level: 4,  desc: '+12SP/10sec,items +8%' },
            { level: 5,  desc: '+15SP/10sec,items +10%' },
            { level: 6,  desc: '+18SP/10sec,items +12%' },
            { level: 7,  desc: '+21SP/10sec,items +14%' },
            { level: 8,  desc: '+24SP/10sec,items +16%' },
            { level: 9,  desc: '+27SP/10sec,items +18%' },
            { level: 10, desc: '+30SP/10sec,items +20%' },
        ],
    },

    'Sight': {
        id: 10,
        internalName: 'MG_SIGHT',
        type: 'Active',
        maxLv: 1,
        target: 'Area',
        range: '3 cells',
        requiredFor: {
            'Magician': 'Fire Wall (Lv 1)',
            'Wizard': 'Sightrasher (Lv 1)',
            'Super Novice': 'Fire Wall (Lv 1)',
        },
        spCost: '10 SP',
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Nullifies the Hide, Tunnel Drive and Cloaking effects within range.',
        effect: () => [],
    },

    'Napalm Beat': {
        id: 11,
        internalName: 'MG_NAPALMBEAT',
        type: 'Offensive, Magic	',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        requiredFor: {
            'Magician': 'Safety Wall (Lv 7), Soul Strike (Lv 4)',
            'Wizard ': ' Jupitel Thunder (Lv 1)',
            'Super Novice   ': 'Safety Wall (Lv 7), Soul Strike (Lv 4)',
            'High Wizard ': ' Napalm Vulcan (Lv 5)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits every Enemy in a 3x3 area around the target for an MATK of (70+10*SkillLV)% using Ghost Element. This damage is spread equally between all targets. For example, if 3 monsters are hit, then each takes 1/3rd of the damage a single target would take.',
        notes: ['Skill damage is split amount targets.'],
        tableRows: [
            { level: 1,  desc: '80% MATK Damage'  },
            { level: 2,  desc: '90% MATK Damage'  },
            { level: 3,  desc: '100% MATK Damage' },
            { level: 4,  desc: '110% MATK Damage' },
            { level: 5,  desc: '120% MATK Damage' },
            { level: 6,  desc: '130% MATK Damage'  },
            { level: 7,  desc: '140% MATK Damage'  },
            { level: 8,  desc: '150% MATK Damage' },
            { level: 9,  desc: '160% MATK Damage' },
            { level: 10, desc: '170% MATK Damage' },
        ],
    },

    'Cold Bolt': {
        id: 23,
        internalName: 'MG_COLDBOLT',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        property: 'Water',
        requiredFor: {
            'Magician': 'Frost Diver (Lv 5)',
            'Wizard ': 'Water Ball (Lv 1)',
            'Sage ': 'Frost Weapon (Lv 1)',
            'Super Novice ': 'Frost Diver (Lv 5)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits the targeted enemy with 1 Water property Bolt per SkillLV for 1*MATK damage each.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active'],
    },

    'Stone Curse': {
        id: 24,
        internalName: 'MG_STONECURSE',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: '7 cells',
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        relatedStatus: 'Stone Curse',
        desc: 'Attempts to inflict Stone Curse status on the target.',
        effect: (lv) => [
            { label: 'Success Rate', value: `${14 + 2 * lv}%`, next: lv < 10 ? `${14 + 2 * (lv + 1)}%` : null },
        ],
    },

    'Fire Bolt': {
        id: 19,
        internalName: 'MG_FIREBOLT',
        type: 'Offensive, Magic',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        property: 'Fire',
        requiredFor: {
            'Magician': 'Fire Ball (Lv 4)',
            'Sage': 'Flame Launcher (Lv 1)',
            'Super Novice': 'Fire Ball (Lv 4)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits the targeted enemy with 1 Fire Element Bolt per SkillLV for 1*MATK each.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active'],
    },

    'Lightning Bolt': {
        id: 20,
        internalName: 'MG_LIGHTNINGBOLT',
        type: 'Offensive, Magic',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        property: 'Wind',
        requiredFor: {
            'Magician': 'Thunder Storm (Lv 4)',
            'Wizard': 'Sightrasher (Lv 1), Jupitel Thunder (Lv 1), Water Ball (Lv 1)',
            'Sage': 'Lightning Loader (Lv 1)',
            'Super Novice': 'Thunder Storm (Lv 4)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits the targeted enemy with 1 Wind Element Bolt per SkillLV for 1*MATK each.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active.'],
    },

    'Energy Coat': {
        id: 27,
        internalName: 'MG_ENERGYCOAT',
        type: 'Active, Magic',
        maxLv: 1,
        target: 'Self',
        range: '-',
        copyable: false,
        interruptible: true,
        relatedClass: 'Magician',
        relatedStatus: 'Energy Coat',
        desc: 'Reduces damage from Physical attacks (punching, weapons and skills using weapons) by draining SP. Damage reduction is better and SP lost is higher with higher SP.',
        casttime: '5 sec',
        spCost: '30 SP',
        duration: '5 minutes',
    },

    'Soul Strike': {
        id: 13,
        internalName: 'MG_SOULSTRIKE',
        type: 'Offensive, Magic',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        property: 'Ghost (Sense)',
        requirements: {
            'Magician': 'Napalm Beat Lv 4',
            'Super Novice': 'Napalm Beat Lv 4',
        },
        requiredFor: {
            'Magician': 'Safety Wall (Lv 5)',
            'Super Novice': 'Safety Wall (Lv 5)',
            'High Wizard': 'Soul Drain (Lv 7)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits the target with (1+SkillLV/2) bolts for 1*MATK using Ghost Element. Does extra 5% damage per SkillLV to Undead property Monsters.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active.'],
         tableRows: [
            { level: 1,  desc: '1 Spirit'  },
            { level: 2,  desc: '1 Spirit fast cast'},
            { level: 3,  desc: '2 Spirit'},
            { level: 4,  desc: '2 Spirit fast cast' },
            { level: 5,  desc: '3 Spirit' },
            { level: 6,  desc: '3 Spirit fast cast'},
            { level: 7,  desc: '4 Spirit'  },
            { level: 8,  desc: '4 Spirit fast cast' },
            { level: 9,  desc: '5 Spirit'},
            { level: 10, desc: '5 Spirit fast cast'},
        ],
},  
    'Frost Diver': {
        id: 15,
        internalName: 'MG_FROSTDIVER',
        type: 'Offensive, Magic	',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        property: 'Water',
        requirements: {
            'Magician': 'Cold Bolt Lv 5',
            'Super Novice': 'Cold Bolt Lv 5',
        },
        requiredFor: {
            'Wizard': 'Ice Wall (Lv 1), Storm Gust (Lv 1)',
            },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        relatedStatus: 'Freeze',
        desc: 'Hits the target for an MATK of (100+10*SkillLV)% Water Element. In addition, has a (35+3*SkillLV)% chance of causing the Frozen status to the target. Undead property and Boss monsters cannot be Frozen. Water and Fire element monsters have a greatly reduced chance of being Frozen. The MDEF of the target affects the success chance and status duration.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active.'],
        tableRows: [
            { level: 1,  desc: '38% Success / 110% MATK 25 SP'},
            { level: 2,  desc: '41% Success / 120% MATK 24 SP'},
            { level: 3,  desc: '44% Success / 130% MATK 23 SP'},
            { level: 4,  desc: '47% Success / 140% MATK 22 SP'},
            { level: 5,  desc: '50% Success / 150% MATK 21 SP'},
            { level: 6,  desc: '53% Success / 160% MATK 20 SP'},
            { level: 7,  desc: '56% Success / 170% MATK 19 SP'},
            { level: 8,  desc: '59% Success / 180% MATK 18 SP'},
            { level: 9,  desc: '62% Success / 190% MATK 17 SP'},
            { level: 10, desc: '65% Success / 200% MATK 16 SP'},
        ],
    },

    'Fire Ball': {
        id: 17,
        internalName: 'MG_FIREBALL',
        type: 'Offensive, Magic',
        maxLv: 10,
        target: 'Area',
        range: '9 cells',
        property: 'Fire',
        area: '5 x 5 cells',
        requirements: {
            'Magician': 'Fire Bolt Lv 4',
            'Super Novice': 'Fire Bolt Lv 4',
        },
        requiredFor: {
            'Magician': 'Fire Wall (Lv 5)',
            'Super Novice': 'Fire Wall (Lv 5)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits every enemy in a 5x5 area around the target with an MATK of (70+10*SkillLV)% and Fire Element. After SkillLV 6, it has a reduced cast / after-Cool Down.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active.'],
          tableRows: [
            { level: 1,  desc: '80% MATK'},
            { level: 2,  desc: '90% MATK'},
            { level: 3,  desc: '100% MATK'},
            { level: 4,  desc: '110% MATK'},
            { level: 5,  desc: '120% MATK'},
            { level: 6,  desc: '120% MATK'},
            { level: 7,  desc: '140% MATK'},
            { level: 8,  desc: '150% MATK'},
            { level: 9,  desc: '160% MATK'},
            { level: 10, desc: '170% MATK'},
        ],
    },

    'Fire Wall': {
        id: 18,
        internalName: 'MG_FIREWALL',
        type: 'Offensive, Magic',
        maxLv: 10,
        target: 'Ground',
        range: '9 cells',
        property: 'Fire',
        requirements: {
            'Magician': 'Fire Ball Lv 5, Sight Lv 1',
            'Super Novice': 'Fire Ball Lv 5, Sight Lv 1',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Creates 3 cells of the Fire Wall effect in a line perpendicular to the line between the caster and the targeted cell. Each cell can deliver up to 4+SkillLV Fire Element hits at MATK*0.5 before its effect is drained. When cast diagonal a wall of two rows cells will appear with 3 cells in the first and 2 cells in the last row.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active.'],
        tableRows: [
            { level: 1,  desc: '5 Hits, 5 sec'},
            { level: 2,  desc: '6 Hits, 6 sec'},
            { level: 3,  desc: '7 Hits, 7 sec'},
            { level: 4,  desc: '8 Hits, 8 sec'},
            { level: 5,  desc: '9 Hits, 9 sec'},
            { level: 6,  desc: '10 Hits, 10 sec'},
            { level: 7,  desc: '11 Hits, 11 sec'},
            { level: 8,  desc: '12 Hits, 12 sec'},
            { level: 9,  desc: '13 Hits, 13 sec'},
            { level: 10, desc: '14 Hits, 14 sec'},
        ],
    },

    'Thunder Storm': {
        id: 21,
        internalName: 'MG_THUNDERSTORM',
        type: 'Offensive, Magic',
        maxLv: 10,
        target: 'Area',
        range: '9 cells',
        property: 'Wind',
        area: '5 x 5 cells',
        requirements: {
            'Magician': 'Lightning Bolt Lv 4',
            'Super Novice': 'Lightning Bolt Lv 4',
        },
        requiredFor: {
            'Wizard': 'Meteor Storm (Lv 1), Lord of Vermilion (Lv 1)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        desc: 'Hits every Enemy in a 5x5 area around the targeted cell with 1 Wind Element Bolt per level at a rate of 1 bolt every 0.2 seconds. Each bolt does 0.8*MATK Wind element damage.',
        notes: ['Skill can be triggered when Auto Shadow Spell is active.'],
        tableRows: [
            { level: 1,  desc: '1 Bolt'},
            { level: 2,  desc: '2 Bolts'},
            { level: 3,  desc: '3 Bolts'},
            { level: 4,  desc: '4 Bolts'},
            { level: 5,  desc: '5 Bolts'},
            { level: 6,  desc: '6 Bolts'},
            { level: 7,  desc: '7 Bolts'},
            { level: 8,  desc: '8 Bolts'},
            { level: 9,  desc: '9 Bolts'},
            { level: 10, desc: '10 Bolts'},
        ],
    },

    'Safety Wall': {
        id: 12,
        internalName: 'MG_SAFETYWALL',
        type: 'Active, Magic',
        maxLv: 10,
        target: 'Ground',
        range: '9 cells',
        requirements: {
            'Magician': 'Napalm Beat Lv 7, Soul Strike Lv 5',
            'Priest': 'Aspersio Lv 4, Sanctuary Lv 3',
            'Super Novice': 'Napalm Beat Lv 7, Soul Strike Lv 5',
        },
        requiredFor: {
            'Priest': 'SMagnus Exorcismus (Lv 1)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Magician',
        relatedStatus: 'Safety Wall',
        notes: ['Spell cannot be stacked'],
        desc: 'Creates a protective barrier on a cell that absorbs melee attacks.',
             tableRows: [
            { level: 1,  desc: '2 Protected Hits'  },
            { level: 2,  desc: '3 Protected Hits'  },
            { level: 3,  desc: '4 Protected Hits' },
            { level: 4,  desc: '5 Protected Hits' },
            { level: 5,  desc: '6 Protected Hits' },
            { level: 6,  desc: '7 Protected Hits'  },
            { level: 7,  desc: '8 Protected Hits'  },
            { level: 8,  desc: '9 Protected Hits' },
            { level: 9,  desc: '10 Protected Hits' },
            { level: 10, desc: '11 Protected Hits'},
        ],
    },

    // ── ARCHER ───────────────────────────────────────────────────────
    "Owl's Eye": {
        id: 43,
        internalName: 'AC_OWL',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredFor: {
            'Archer': "Vulture's Eye (Lv 3)",
            'Super Novice': "Vulture's Eye (Lv 3)",
            'Sniper': "True Sight (Lv 10)",
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Archer',
        desc: 'Increases DEX, improving HIT rate, ranged ATK, and cast times.',
        tableRows: [
            { level: 1,  desc: 'DEX +1'  },
            { level: 2,  desc: 'DEX +2'  },
            { level: 3,  desc: 'DEX +3' },
            { level: 4,  desc: 'DEX +4' },
            { level: 5,  desc: 'DEX +5' },
            { level: 6,  desc: 'DEX +6'  },
            { level: 7,  desc: 'DEX +7'  },
            { level: 8,  desc: 'DEX +8' },
            { level: 9,  desc: 'DEX +9' },
            { level: 10, desc: 'DEX +10'},
        ],
    },

    'Double Strafing': {
        id: 46,
        internalName: 'AC_DOUBLE',
        type: 'Offensive, Physical',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        property: 'Weapon Property',
        requirements: {
            'Rogue': 'Vultures Eye Lv 10',
        },
        requiredFor: {
            'Archer': 'Arrow Shower (Lv 5)',
            'Hunter': 'Beast Strafing (Lv 10)',
            'Rogue': 'Remove Trap (Lv 5)',
            'Sniper': 'Sharp Shooting (Lv 5)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Archer',
        desc: 'Ranged attack, that fires two arrows and hits with an ATK of (180+20*SkillLV)%. Requires an equipped bow. Only 1 arrow is consumed.',
         tableRows: [
            { level: 1,  desc: '200% Damage'  },
            { level: 2,  desc: '220% Damage'  },
            { level: 3,  desc: '240% Damage' },
            { level: 4,  desc: '260% Damage' },
            { level: 5,  desc: '280% Damage' },
            { level: 6,  desc: '300% Damage'  },
            { level: 7,  desc: '320% Damage'  },
            { level: 8,  desc: '340% Damage' },
            { level: 9,  desc: '360% Damage' },
            { level: 10, desc: '380% Damage'},
        ],
    },

    'Making Arrow': {
        id: 42,
        internalName: 'AC_MAKINGARROW',
        type: 'Active, Physical	',
        maxLv: 1,
        target: 'Self',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Archer',
        desc: 'Creates arrows from an item. Different items give different amounts and types of arrows. Cannot be used if above 50% weight.',
        effect: () => [],
    },

    'Charge Arrow': {
        id: 43,
        internalName: 'AC_CHARGEARROW',
        type: 'Active',
        maxLv: 1,
        target: 'Enemy',
        range: '9 cells',
        property: 'Weapon Property',
        knockback: '6 cells',
        copyable: true,
        interruptible: false,
        relatedClass: 'Archer',
        desc: 'Ranged attack at 150% ATK. The target is pushed back 6 cells. Only 1 arrow is consumed.',
        notes: ['Skill range affected by Vultures Eye'],
    },

    "Vulture's Eye": {
        id: 44,
        internalName: 'AC_VULTURE',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requirements: {
            'Archer': "Owl's Eye Lv 3",
            'Super Novice': "Owl's Eye Lv 3",
        },
        requiredFor: {
            'Archer': 'Attention Concentrate (Lv 1)',
            'Rogue': 'Double Strafe (Lv 10)',
            'Super Novice': 'Improve Concentration (Lv 1))',
            'Sniper': 'True Sight (Lv 10), Falcon Assault (Lv 5)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Archer',
        desc: 'Increases range with bows by 1*SkillLV cells and increases HIT by 1 per SkillLV.',
        tableRows: [
            { level: 1,  desc: 'Range and HIT +1'  },
            { level: 2,  desc: 'Range and HIT +2'  },
            { level: 3,  desc: 'Range and HIT +3'  },
            { level: 4,  desc: 'Range and HIT +4' },
            { level: 5,  desc: 'Range and HIT +5'  },
            { level: 6,  desc: 'Range and HIT +6'  },
            { level: 7,  desc: 'Range and HIT +7'  },
            { level: 8,  desc: 'Range and HIT +8' },
            { level: 9,  desc: 'Range and HIT +9' },
            { level: 10, desc: 'Range and HIT +10'},
        ],
    },

    'Attention Concentrate': {
        id: 45,
        internalName: 'AC_CONCENTRATION',
        type: 'Active, Physical',
        maxLv: 10,
        target: 'Self',
        area: '7 x 7  cells',
        range: '-',
        requirements: {
            'Archer': "Vulture's Eye Lv 1",
            'Super Novice': "Vulture's Eye Lv 1",

        },
        requiredFor: {
            'Hunter': 'Detect (Lv 1)',
            'Sniper': 'True Sight (Lv 10), Sharp Shooting (Lv 10), Wind Walk (Lv 9)',
            'Clown': 'Tarot Card of Fate (Lv 10), Hermodes Rod (Lv 10), Marionette Control (Lv 5), Moonlit Water Mill (Sheltering Bliss) (Lv 5)',
            'Gypsy': 'Moonlit Water Mill (Sheltering Bliss) (Lv 5), Marionette Control (Lv 5), Hermodes Rod (Lv 10), Tarot Card of Fate (Lv 10)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Archer',
        relatedStatus: 'Attention Concentrate',
        desc: 'Increases DEX and AGI of the casting character by (2+1*SkillLV)%. Only affects DEX/AGI from base stat, job bonus, armor and Owls Eye. Does not include cards. Detects hidden and cloaked characters within a 3 cells range.',
         tableRows: [
            { level: 1,  desc: '+ 3% AGI/DEX'  },
            { level: 2,  desc: '+ 4% AGI/DEX'  },
            { level: 3,  desc: '+ 5% AGI/DEX'  },
            { level: 4,  desc: '+ 6% AGI/DEX' },
            { level: 5,  desc: '+ 7% AGI/DEX'  },
            { level: 6,  desc: '+ 8% AGI/DEX'  },
            { level: 7,  desc: '+ 9% AGI/DEX'  },
            { level: 8,  desc: '+ 10% AGI/DEX' },
            { level: 9,  desc: '+ 11% AGI/DEX' },
            { level: 10, desc: '+ 12% AGI/DEX'},
        ],
    },

    'Arrow Shower': {
        id: 47,
        internalName: 'AC_SHOWER',
        type: 'Offensive, Physical',
        maxLv: 10,
        target: 'Area',
        range: 'Bow range',
        property: 'Weapon Property',
        area: '3 x 3 cells',
        requirements: {
            'Archer': 'Double Strafing Lv 5',
        },
        requiredFor: {
            'Clown': 'Arrow Vulcan (Lv 5)',
            'Gypsy': 'Arrow Vulcan (Lv 5)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Archer',
        desc: '3x3 cells, ranged splash attack with an ATK of (75+5*SkillLV)%. Enemies hit by the attack are pushed back 2 cells. Requires an equipped bow. Only 1 arrow is consumed.',
        nptes: ['Skill ignores Land Protector'],
              tableRows: [
            { level: 1,  desc: '80% Damage'  },
            { level: 2,  desc: '85% Damage'  },
            { level: 3,  desc: '90% Damage'  },
            { level: 4,  desc: '95% Damage' },
            { level: 5,  desc: '100% Damage'  },
            { level: 6,  desc: '105% Damage'  },
            { level: 7,  desc: '110% Damage'  },
            { level: 8,  desc: '115% Damage' },
            { level: 9,  desc: '120% Damage' },
            { level: 10, desc: '125% Damage'},
        ],
    },

    // ── ACOLYTE ──────────────────────────────────────────────────────
    'Divine Protection': {
        id: 22,
        internalName: 'AL_DP',
        type: 'Passive, Physical',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredments: {
            'Crusader ': 'Cure Lv 1',
        },
        requiredFor: {
            'Acolyte': 'Demon Bane (Lv 3), Angelus (Lv 3), Blessing (Lv 5)',
            'Crusader': 'Demon Bane (Lv 3), Providence (Resistant Souls) (Lv 5)',
            'Monk   ': 'Iron Hand (Lv 10)',
            'Super Novice': 'Demon Bane (Lv 3), Angelus (Lv 3), Blessing (Lv 5)',
            'Paladin': 'Gospel (Battle Chant) (Lv 3)',

        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Acolyte',
        desc: 'Reduces damage from Undead property and Demon family monsters by (3*SkillLV)+[0.04*(BaseLV + 1)]. Damage is subtracted after DEF reductions.Does not work against Players. Base increment without BaseLV modification:',
               tableRows: [
            { level: 1,  desc: 'DEF +3'  },
            { level: 2,  desc: 'DEF +6'  },
            { level: 3,  desc: 'DEF +9'  },
            { level: 4,  desc: 'DEF +12' },
            { level: 5,  desc: 'DEF +15'  },
            { level: 6,  desc: 'DEF +18'  },
            { level: 7,  desc: 'DEF +21'  },
            { level: 8,  desc: 'DEF +24' },
            { level: 9,  desc: 'DEF +27' },
            { level: 10, desc: 'DEF +30'},
        ],
    },

    'Ruwach': {
        id: 24,
        internalName: 'AL_RUWACH',
        type: 'Active, Magic',
        maxLv: 1,
        target: 'Area',
        range: '-',
        area: '5 x 5 cells',
        property: 'Holy',
        requiredFor: {
            'Acolyte': 'Teleport (Lv 1)',
            'Priest': 'Lex Divina (Lv 1)',
            'Super Novice': 'Teleport (Lv 1)',
        },
        spCost: '10 SP',
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        desc: 'Reveals Hiding and Cloaking players and monsters within range. Revealed players and monsters are hit with a holy element Magic attack with a strength of MATK*1.45.',
    },

    'Heal': {
        id: 28,
        internalName: 'AL_HEAL',
        type: 'Support / Buff, Magic',
        maxLv: 10,
        target: 'Friend',
        range: '9 cells',
        property: 'Holy',
        requiredFor: {
            'Acolyte': 'Increase Agility (Lv 3), Cure (Lv 2)',
            'Priest': ' Sanctuary (Lv 1)',
            'Crusader': 'Providence (Resistant Souls) (Lv 5)',
            'Super Novice': 'Increase Agility (Lv 3), Cure (Lv 2)',

        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        desc: 'Heals a targets HP for [(BaseLV+INT)/8]*(4+8*SkillLV). When used against Undead property monsters it is a holy attack that ignores MDEF and INT, but deals only half damage (that is, Heal*ValuexElementModifier/2).To use against a monster, you must shift-click it or turn on /noshift.',
        notes : ['Skill can be triggered when Auto Shadow Spell is active'],
    },

    'Aqua Benedicta': {
        id: 31,
        internalName: 'AL_HOLYWATER',
        type: 'Active, Magic',
        maxLv: 1,
        target: 'Self',
        range: '-',
        copyable: false,
        interruptible: true,
        relatedClass: 'Acolyte',
        desc: 'Creates 1 Holy Water. Caster must stand in water for the skill to succeed. Map-wide submersion (Undersea Tunnel LV 4/5 or Sunken Ship) does not work.',
        spCost: '10 SP',
    },

    'Holy Light': {
        id: 15,
        internalName: 'AL_HOLYLIGHT',
        type: 'Offensive, Magic',
        maxLv: 1,
        target: 'Enemy',
        range: '9 cells',
        property: 'Holy',
        spCost: '15 SP',
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        desc: 'Does a single Holy element hit for 125% of your MATK.',
        spCost: '15 SP',
    },

    'Demon Bane': {
        id: 23,
        internalName: 'AL_DEMONBANE',
        type: 'Passive, Physical	',
        maxLv: 10,
        target: '-',
        range: '-',
        requirements: {
            'Acolyte': 'Divine Protection Lv 3',
            'Crusader ': 'Divine Protection Lv 3',
            'Super Novice': 'Divine Protection Lv 3',
        },
        requiredFor: {
            'Acolyte': 'Signum Crucis (Lv 3)',
            'Crusader': 'Heal (Lv 5)',
            'Monk': 'Iron Hand (Lv 10)',
            'Super Novice': 'Signum Crucis (Lv 3)',
            'High Priest': 'Mana Recharge (Spiritual Thrift) (Lv 10)',
            'Paladin': 'Gospel (Battle Chant) (Lv 5)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Acolyte',
        desc: 'Increases damage against Undead property and Demon family monsters by (3*SkillLV)+[0.05*(BaseLV + 1)]. Damage ignores DEF reduction from armor, but not from VIT. The skill bonus increases with higher character BaseLV.Does not work against Players. Base increment without BaseLV modification:',
       tableRows: [
            { level: 1,  desc: 'ATK +3'  },
            { level: 2,  desc: 'ATK +6'  },
            { level: 3,  desc: 'ATK +9'  },
            { level: 4,  desc: 'ATK +12' },
            { level: 5,  desc: 'ATK +15'  },
            { level: 6,  desc: 'ATK +18'  },
            { level: 7,  desc: 'ATK +21'  },
            { level: 8,  desc: 'ATK +24' },
            { level: 9,  desc: 'ATK +27' },
            { level: 10, desc: 'ATK +30 '},
        ],
    },

    'Teleportation': {
        id: 26,
        internalName: 'AL_TELEPORT',
        type: 'Active, Magic',
        maxLv: 2,
        target: 'Self',
        range: '-',
        requirements: {
            'Acolyte': 'Ruwach Lv 1',
            'Super Novice': 'Ruwach Lv 1',
        },
        requiredFor: {
            'Acolyte': 'Warp Portal (Lv 2)',
            'Super Novice': 'Warp Portal (Lv 2)',

        },
        spCost: '9 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Acolyte',
        relatedStatus: 'Teleport',
        desc: 'At level 1, you can teleport to a random spot on the same map. At level 2, you can also choose to teleport to your save point. When Teleportation is actually cast, a window will appear showing the available options (including cancel).You must actually select an option by clicking or with the up/down arrow keys and pressing enter for the effect to occur. Once you actually teleport, you will count as having "just entered the map". This means that Aggressive monsters wont see you for 3 seconds or until you move.',
         notes: ['Cannot be used in Endless Tower, Orcs Memory Dungeon or Nidhoggurs Nest.'],
        tableRows: [
            { level: 1, desc: 'Random' },
            { level: 2, desc: 'Save Point.' },
        ],
        
    },

    'Warp Portal': {
        id: 27,
        internalName: 'AL_WARPPORTAL',
        type: 'Active, Magic',
        maxLv: 4,
        target: 'Ground',
        range: '9 cells',
        requirements: {
            'Acolyte': 'Teleport Lv 2',
            'Super Novice': 'Teleport Lv 2',
        },
        requiredFor: {
            'Acolyte': 'Pneuma (Lv 4)',
            'Super Novice': 'Pneuma (Lv 4)',
        },
        copyable: false,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Warp Portal',
        desc: 'The maximum capacity of people that the caster can warp at a time is 8 regardless of its skill level. No more than 3 Warp Portals cast by the one caster can be in effect at the same time. If the caster leaves the map where the portal has been cast, the portal disappears.',
        notes: ['Cannot be used in Aldebaran Turbo Track.'],
        tableRows: [
            { level: 1, desc: 'Warp to the Save Point.andom' },
            { level: 2, desc: 'Enable to Use 1 Memo point..' },
            { level: 3, desc: 'Enable to Use 2 Memo points.' },
            { level: 4, desc: 'Enable to Use 3 Memo points..' },
        ],
    },

    'Pneuma': {
        id: 58,
        internalName: 'AL_PNEUMA',
        type: 'Active',
        maxLv: 1,
        target: 'Ground',
        range: '9 cells',
        requirements: {
            'Acolyte': 'Warp Portal Lv 4',
        },
        spCost: '10 SP',
        effectDuration: '10 sec',
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Pneuma',
        desc: 'Creates a 1×1 barrier that completely blocks all ranged physical attacks.',
        effect: () => [{ label: 'Duration', value: '10s' }],
    },

    'Increase Agility': {
        id: 59,
        internalName: 'AL_INCAGI',
        type: 'Active',
        maxLv: 10,
        target: 'Ally / Self',
        range: '9 cells',
        requirements: {
            'Acolyte': 'Heal Lv 3',
        },
        requiredFor: {
            'Acolyte': 'Decrease Agility (Lv 1)',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Increase Agility',
        desc: 'Temporarily boosts AGI and movement speed of the target.',
        effect: (lv) => [
            { label: 'AGI +', value: `+${3 + lv}`, next: lv < 10 ? `+${3 + (lv + 1)}` : null },
        ],
    },

    'Decrease Agility': {
        id: 60,
        internalName: 'AL_DECAGI',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: '9 cells',
        requirements: {
            'Acolyte': 'Increase Agility Lv 1',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Decrease Agility',
        desc: 'Reduces an enemy\'s AGI and movement speed.',
        effect: (lv) => [
            { label: 'AGI −', value: `−${3 + lv}`, next: lv < 10 ? `−${3 + (lv + 1)}` : null },
        ],
    },

    'Signum Crucis': {
        id: 61,
        internalName: 'AL_CRUCIS',
        type: 'Active',
        maxLv: 10,
        target: 'Area',
        range: '5 cells',
        property: 'Holy',
        requirements: {
            'Acolyte': 'Demon Bane Lv 3',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Signum Crucis',
        desc: 'Reduces DEF of all Demon and Undead enemies in range.',
        effect: (lv) => [
            { label: 'DEF Reduction', value: `${10 + 4 * lv}%`, next: lv < 10 ? `${10 + 4 * (lv + 1)}%` : null },
        ],
    },

    'Angelus': {
        id: 62,
        internalName: 'AL_ANGELUS',
        type: 'Active',
        maxLv: 10,
        target: 'Party',
        range: 'Party-wide',
        requirements: {
            'Acolyte': 'Divine Protection Lv 3',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Angelus',
        desc: 'Temporarily increases the VIT-based soft DEF of all party members.',
        effect: (lv) => [
            { label: 'Soft DEF +', value: `${5 + 5 * lv}%`, next: lv < 10 ? `${5 + 5 * (lv + 1)}%` : null },
        ],
    },

    'Blessing': {
        id: 63,
        internalName: 'AL_BLESSING',
        type: 'Active',
        maxLv: 10,
        target: 'Ally / Self',
        range: '9 cells',
        property: 'Holy',
        requirements: {
            'Acolyte': 'Divine Protection Lv 5',
        },
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        relatedStatus: 'Blessing',
        desc: 'Temporarily increases STR, DEX, and INT of a target.',
        effect: (lv) => [
            { label: 'STR / DEX / INT +', value: `+${lv}`, next: lv < 10 ? `+${lv + 1}` : null },
        ],
    },

    'Cure': {
        id: 64,
        internalName: 'AL_CURE',
        type: 'Active',
        maxLv: 1,
        target: 'Ally / Self',
        range: '9 cells',
        requirements: {
            'Acolyte': 'Heal Lv 2',
        },
        spCost: '15 SP',
        copyable: true,
        interruptible: true,
        relatedClass: 'Acolyte',
        desc: 'Removes Silence, Confusion, and Blindness from the target.',
        effect: () => [
            { label: 'Cures', value: 'Silence, Confusion, Blindness' },
        ],
    },

    // ── MERCHANT ─────────────────────────────────────────────────────
    'Enlarge Weight Limit': {
        id: 70,
        internalName: 'MC_INCCARRY',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requiredFor: {
            'Merchant': 'Discount (Lv 3), Pushcart (Lv 5)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Permanently increases maximum weight capacity.',
        effect: (lv) => [
            { label: 'Weight +', value: `+${200 * lv}`, next: lv < 10 ? `+${200 * (lv + 1)}` : null },
        ],
    },

    'Identify': {
        id: 71,
        internalName: 'MC_IDENTIFY',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        spCost: '0 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Identifies unidentified items without consuming a Magnifier.',
        effect: () => [],
    },

    'Mammonite': {
        id: 72,
        internalName: 'MC_MAMMONITE',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: 'Melee',
        property: 'Weapon Property',
        spCost: '5 SP',
        copyable: true,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Hurls zeny at an enemy to deal damage — higher investment means greater impact.',
        effect: (lv) => [
            { label: 'ATK',       value: `${100 + 100 * lv}%`, next: lv < 10 ? `${100 + 100 * (lv + 1)}%` : null },
            { label: 'Zeny Cost', value: `${100 * lv}z`,       next: lv < 10 ? `${100 * (lv + 1)}z` : null },
        ],
    },

    'Cart Revolution': {
        id: 73,
        internalName: 'MC_CARTREVOLUTION',
        type: 'Active',
        maxLv: 1,
        target: 'Area',
        range: 'Melee',
        area: '3 x 3 cells',
        knockback: '2 cells',
        spCost: '12 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Rams your cart into nearby enemies dealing AoE damage and knocking them back.',
        effect: () => [
            { label: 'ATK',       value: '150%' },
            { label: 'Knockback', value: '2 cells' },
        ],
    },

    'Change Cart': {
        id: 74,
        internalName: 'MC_CHANGECART',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Allows you to change the appearance of your cart.',
        effect: () => [],
    },

    'Loud Exclamation': {
        id: 75,
        internalName: 'MC_LOUDEXCLAMATION',
        type: 'Passive',
        maxLv: 1,
        target: '-',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'A mighty battle cry that permanently increases STR.',
        effect: () => [{ label: 'STR +', value: '+4' }],
    },

    'Cart Decoration': {
        id: 76,
        internalName: 'MC_CARTDECORATION',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Allows you to decorate and customise your cart\'s appearance.',
        effect: () => [],
    },

    'Discount': {
        id: 77,
        internalName: 'MC_DISCOUNT',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requirements: {
            'Merchant': 'Enlarge Weight Limit Lv 3',
        },
        requiredFor: {
            'Merchant': 'Overcharge (Lv 3)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Reduces the purchase price of items from NPC shops.',
        effect: (lv) => [
            { label: 'Price Reduction', value: `${3 + 3 * lv}%`, next: lv < 10 ? `${3 + 3 * (lv + 1)}%` : null },
        ],
    },

    'Overcharge': {
        id: 78,
        internalName: 'MC_OVERCHARGE',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requirements: {
            'Merchant': 'Discount Lv 3',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Increases the sell price of items at NPC shops.',
        effect: (lv) => [
            { label: 'Sell Bonus', value: `${5 + 2 * lv}%`, next: lv < 10 ? `${5 + 2 * (lv + 1)}%` : null },
        ],
    },

    'Pushcart': {
        id: 79,
        internalName: 'MC_PUSHCART',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        requirements: {
            'Merchant': 'Enlarge Weight Limit Lv 5',
        },
        requiredFor: {
            'Merchant': 'Vending (Lv 3)',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Equips a cart for carrying extra items, increasing its capacity at higher levels.',
        effect: (lv) => [
            { label: 'Cart Capacity', value: `${3000 + 500 * lv}`, next: lv < 10 ? `${3000 + 500 * (lv + 1)}` : null },
        ],
    },

    'Vending': {
        id: 80,
        internalName: 'MC_VENDING',
        type: 'Active',
        maxLv: 10,
        target: 'Self',
        range: '-',
        requirements: {
            'Merchant': 'Pushcart Lv 3',
        },
        requiredFor: {
            'Merchant': 'Buying Store (Lv 1)',
        },
        spCost: '30 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Opens a personal shop to sell items to other players.',
        effect: (lv) => [
            { label: 'Item Slots', value: `${2 + lv}`, next: lv < 10 ? `${2 + (lv + 1)}` : null },
        ],
    },

    'Buying Store': {
        id: 81,
        internalName: 'MC_BUYINGSTORE',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        requirements: {
            'Merchant': 'Vending Lv 1',
        },
        spCost: '30 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Merchant',
        desc: 'Opens a personal shop to buy specific items from other players.',
        effect: () => [{ label: 'Item Slots', value: '5' }],
    },

    // ── THIEF ────────────────────────────────────────────────────────
    'Double Attack': {
        id: 90,
        internalName: 'TF_DOUBLE',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Thief',
        desc: 'Gives a chance to strike twice in rapid succession when a Dagger is equipped.',
        effect: (lv) => [
            { label: 'Trigger Chance', value: `${5 * lv}%`, next: lv < 10 ? `${5 * (lv + 1)}%` : null },
        ],
    },

    'Increase Dodge': {
        id: 91,
        internalName: 'TF_MISS',
        type: 'Passive',
        maxLv: 10,
        target: '-',
        range: '-',
        copyable: false,
        interruptible: false,
        relatedClass: 'Thief',
        desc: 'Permanently increases FLEE rate through honed evasion techniques.',
        effect: (lv) => [
            { label: 'FLEE +', value: `+${3 * lv}`, next: lv < 10 ? `+${3 * (lv + 1)}` : null },
        ],
    },

    'Steal': {
        id: 92,
        internalName: 'TF_STEAL',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: 'Melee',
        requiredFor: {
            'Thief': 'Hiding (Lv 5)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Thief',
        desc: 'Attempts to pilfer one item from a monster without dealing damage.',
        effect: (lv) => [
            { label: 'Success Rate', value: `${10 + 6 * lv}%`, next: lv < 10 ? `${10 + 6 * (lv + 1)}%` : null },
        ],
    },

    'Envenom': {
        id: 93,
        internalName: 'TF_POISON',
        type: 'Active',
        maxLv: 10,
        target: 'Enemy',
        range: 'Melee',
        property: 'Poison',
        requiredFor: {
            'Thief': 'Detoxify (Lv 3)',
        },
        copyable: true,
        interruptible: false,
        relatedClass: 'Thief',
        relatedStatus: 'Poison',
        desc: 'Deals Poison-element damage and attempts to inflict Poison status.',
        effect: (lv) => [
            { label: 'ATK Bonus',     value: `+${15 * lv}`,    next: lv < 10 ? `+${15 * (lv + 1)}` : null },
            { label: 'Poison Chance', value: `${5 + 4 * lv}%`, next: lv < 10 ? `${5 + 4 * (lv + 1)}%` : null },
        ],
    },

    'Sprinkle Sand': {
        id: 94,
        internalName: 'TF_SPRINKLESAND',
        type: 'Active',
        maxLv: 1,
        target: 'Enemy',
        range: 'Melee',
        copyable: true,
        interruptible: false,
        relatedClass: 'Thief',
        relatedStatus: 'Blind',
        desc: 'Flings sand into an enemy\'s eyes, temporarily reducing its HIT rate.',
        effect: () => [{ label: 'HIT Reduction', value: '−10' }],
    },

    'Back Sliding': {
        id: 95,
        internalName: 'TF_BACKSLIDING',
        type: 'Active',
        maxLv: 1,
        target: 'Self',
        range: '-',
        spCost: '7 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Thief',
        desc: 'Instantly retreats 5 cells in the direction you are facing.',
        effect: () => [{ label: 'Distance', value: '5 cells back' }],
    },

    'Pick Stone': {
        id: 96,
        internalName: 'TF_PICKSTONE',
        type: 'Active',
        maxLv: 1,
        target: 'Ground',
        range: '-',
        spCost: '2 SP',
        copyable: false,
        interruptible: false,
        relatedClass: 'Thief',
        desc: 'Picks up a Pebble from the ground for use with Throw Stone.',
        effect: () => [],
    },

    'Throw Stone': {
        id: 97,
        internalName: 'TF_THROWSTONE',
        type: 'Active',
        maxLv: 1,
        target: 'Enemy',
        range: '7 cells',
        spCost: '2 SP',
        copyable: true,
        interruptible: false,
        relatedClass: 'Thief',
        relatedStatus: 'Stun',
        desc: 'Hurls a Pebble at an enemy, dealing minor fixed damage.',
        effect: () => [
            { label: 'Damage',      value: '50 (fixed)' },
            { label: 'Stun Chance', value: '3%' },
        ],
    },

    'Hiding': {
        id: 98,
        internalName: 'TF_HIDING',
        type: 'Active',
        maxLv: 10,
        target: 'Self',
        range: '-',
        requirements: {
            'Thief': 'Steal Lv 5',
        },
        copyable: false,
        interruptible: false,
        relatedClass: 'Thief',
        relatedStatus: 'Hiding',
        desc: 'Conceals yourself from monsters and most players by crouching in place.',
        effect: (lv) => [
            { label: 'Duration', value: `${30 + 30 * lv}s`, next: lv < 10 ? `${30 + 30 * (lv + 1)}s` : null },
        ],
    },

    'Detoxify': {
        id: 99,
        internalName: 'TF_DETOXIFY',
        type: 'Active',
        maxLv: 1,
        target: 'Ally / Self',
        range: '9 cells',
        requirements: {
            'Thief': 'Envenom Lv 3',
        },
        spCost: '10 SP',
        copyable: true,
        interruptible: true,
        relatedClass: 'Thief',
        desc: 'Removes Poison status from yourself or a nearby ally.',
        effect: () => [
            { label: 'Cures', value: 'Poison' },
        ],
    },
}

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
            { name: 'Attention Concentrate', max: 10, req: "Vulture's Eye Lv 1",   lockedType: 'active'  },
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
            { name: 'Signum Crucis',    max: 10, req: 'Demon Bane Lv 3',         lockedType: 'active'  },
            { name: 'Angelus',          max: 10, req: 'Divine Protection Lv 3',  lockedType: 'active'  },
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
    'Sword Mastery': {
        condition: (char) => ['dagger', 'sword_1h'].includes(char.weaponKey),
        bonus: (level) => ({ atk: 4 * level }),
    },
    'Two-Handed Sword Mastery': {
        condition: (char) => char.weaponKey === 'sword_2h',
        bonus: (level) => ({ atk: 4 * level }),
    },
    'Increase Recuperative Power': {
        bonus: (level, char, maxHP) => ({
            flatHPRegen: Math.floor((5 * level) + (maxHP * 0.002 * level)),
            healItemMod: 10 * level,
        }),
    },
    'Increase Spiritual Power': {
        bonus: (level, char, maxHP, maxSP) => ({
            flatSPRegen: Math.floor((maxSP / 500 + 3) * level),
            spItemMod:   2 * level,
        }),
    },
    "Owl's Eye": {
        bonus: (level) => ({ dex: level }),
    },
    "Vulture's Eye": {
        condition: (char) => char.weaponKey === 'bow',
        bonus: (level) => ({ hit: level }),
    },
    'Divine Protection': {
        bonus: (level) => ({ def: 3 * level }),
    },
    'Demon Bane': {
        bonus: (level) => ({ atk: 3 * level }),
    },
    'Enlarge Weight Limit': {
        bonus: (level) => ({ weightBonus: 200 * level }),
    },
    'Increase Dodge': {
        bonus: (level) => ({ flee: 3 * level }),
    },
    'Double Attack': {
        condition: (char) => char.weaponKey === 'dagger',
        bonus: (level) => ({ hit: 1 * level }),
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
// CALC UNLOCK COST
// ===================================================================
function calcUnlockCost(lockedSkillName) {
    const requirements = new Map();
    function collect(name, visited = new Set()) {
        if (visited.has(name)) return;
        visited.add(name);
        const entry = activeSkillData._allLocked.find(l => l.name === name);
        if (!entry) return;
        parseReqs(entry.req).forEach(r => {
            const prev = requirements.get(r.skillName) ?? 0;
            requirements.set(r.skillName, Math.max(prev, r.level));
            const inUnlocked = activeSkillData.unlocked.find(s => s.name === r.skillName);
            if (!inUnlocked) collect(r.skillName, visited);
        });
    }
    collect(lockedSkillName);
    let cost = 0;
    for (const [skillName, neededLevel] of requirements) {
        const existing = activeSkillData.unlocked.find(s => s.name === skillName);
        if (existing) {
            cost += Math.max(0, neededLevel - existing.cur);
        } else {
            cost += neededLevel;
        }
    }
    return cost;
}

// ===================================================================
// FORCE UNLOCK
// ===================================================================
function forceUnlock(lockedSkillName) {
    const lockedEntry = activeSkillData._allLocked.find(l => l.name === lockedSkillName);
    if (!lockedEntry) return;
    const pts  = Math.max(0, (character.jobLevel || 0) - 1);
    const used = activeSkillData.unlocked.reduce((sum, sk) => sum + (sk.type !== 'quest' ? sk.cur : 0), 0);
    const left = pts - used;
    const cost = calcUnlockCost(lockedSkillName);
    if (cost > left) return;
    const reqs = parseReqs(lockedEntry.req);
    reqs.forEach(r => {
        const existing = activeSkillData.unlocked.find(s => s.name === r.skillName);
        if (existing) {
            if (existing.cur < r.level) existing.cur = r.level;
        } else {
            forceUnlock(r.skillName);
            const nowUnlocked = activeSkillData.unlocked.find(s => s.name === r.skillName);
            if (nowUnlocked && nowUnlocked.cur < r.level) nowUnlocked.cur = r.level;
        }
    });
    checkUnlocks();
    renderSkillTables();
    updateFooter();
    if (typeof updateUI === 'function') updateUI();
}

// ===================================================================
// CALCULATE ACTIVE SKILL BONUSES
// ===================================================================
function calculateSkillBonuses(character, maxHP = 0, maxSP = 0) {
    const result = {
        str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0,
        atk: 0, matk: 0, def: 0, mdef: 0, flee: 0, hit: 0,
        aspdFlat: 0,
        hprMod: 0, sprMod: 0, flatHPRegen: 0, flatSPRegen: 0,
        healItemMod: 0, spItemMod: 0,
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
let _renderingSkills = false;

function updateFooter() {
    if (!activeSkillData) return;
    const pts  = Math.max(0, (character.jobLevel || 0) - 1);
    const used = activeSkillData.unlocked.reduce((sum, s) => sum + (s.type !== 'quest' ? s.cur : 0), 0);
    const usedEl = document.getElementById('skill-pts-used');
    const leftEl = document.getElementById('skill-pts-left');
    if (usedEl) usedEl.textContent = used;
    if (leftEl) leftEl.textContent = Math.max(0, pts - used);
    if (!_renderingSkills) {
        _renderingSkills = true;
        renderSkillTables();
        _renderingSkills = false;
    }
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
// SKILL POPUP  —  RO Wiki / ratemyserver-style layout
// ===================================================================
function showSkillPopup(skillName, anchorEl, isLocked = false) {
    closeSkillPopup(false);

    const desc = SKILL_DESCRIPTIONS[skillName];
    const icon = SKILL_ICONS[skillName];

    const maxHP = (typeof calculateCombatStats === 'function') ? calculateCombatStats(character).maxHP : 0;
    const maxSP = (typeof calculateCombatStats === 'function') ? calculateCombatStats(character).maxSP : 0;

    let curLv = 0;
    if (activeSkillData) {
        const found = activeSkillData.unlocked.find(s => s.name === skillName)
                   ?? activeSkillData.locked.find(s => s.name === skillName);
        curLv = found?.cur ?? 0;
    }

    // ── Core fields ───────────────────────────────────────────────
    const skillType  = desc?.type         ?? '—';
    const skillMaxLv = desc?.maxLv        ?? '—';
    const skillTgt   = desc?.target       ?? '—';
    const skillRange = desc?.range        ?? '—';
    const skillId    = desc?.id    != null ? `Skill ID# ${desc.id}` : '';
    const internalNm = desc?.internalName  ? `(${desc.internalName})` : '';

    // ── Icon ──────────────────────────────────────────────────────
    const iconHTML = icon
        ? `<img src="${icon}" class="sp-icon" alt="${skillName}" onerror="this.style.display='none'">`
        : `<div class="sp-icon sp-icon-placeholder"></div>`;

    // ── Row 2: Property / Knockback / Area ────────────────────────
    let propRow = '';
    if (desc?.property || desc?.knockback || desc?.area) {
        const propCell = desc?.property
            ? `<th>Property</th><td class="sp-meta-val sp-fire">${desc.property}</td>`
            : `<th></th><td></td>`;
        const kbCell = desc?.knockback
            ? `<th>Knockback</th><td class="sp-meta-val sp-meta-center">${desc.knockback}</td>`
            : `<th></th><td></td>`;
        const areaCell = desc?.area
            ? `<th>Area</th><td class="sp-meta-val sp-meta-center">${desc.area}</td>`
            : `<th></th><td></td>`;
        propRow = `<tr>${propCell}${kbCell}${areaCell}<th></th><td></td></tr>`;
    }

    // ── Requirements row ─────────────────────────────────────────
    let reqRow = '';
    if (desc?.requirements && Object.keys(desc.requirements).length > 0) {
        const lines = Object.entries(desc.requirements)
            .map(([cls, req]) => `${cls} : <u>${req}</u>`)
            .join('<br>');
        reqRow = `<tr><th class="sp-notes-th">Requirements</th><td colspan="7" class="sp-notes-td">${lines}</td></tr>`;
    }

    // ── Required For row ─────────────────────────────────────────
    let reqForRow = '';
    if (desc?.requiredFor && Object.keys(desc.requiredFor).length > 0) {
        const lines = Object.entries(desc.requiredFor)
            .map(([cls, req]) => `${cls} : <u>${req}</u>`)
            .join('<br>');
        reqForRow = `<tr><th class="sp-notes-th">Required For</th><td colspan="7" class="sp-notes-td">${lines}</td></tr>`;
    }

    // ── Effect description row ────────────────────────────────────
    const effectDescRaw = desc?.desc ?? '';
    const effectDesc    = effectDescRaw.split('\n').join('<br>');
    const effectRow     = effectDesc
        ? `<tr><th class="sp-notes-th">Effect</th><td colspan="7" class="sp-effect-cell">${effectDesc}</td></tr>`
        : '';

    // ── Other Notes ───────────────────────────────────────────────
    const bulletNotes = desc?.notes ?? [];
    const bulletsHTML = bulletNotes.length > 0
        ? `<ul class="sp-bullet-notes">${bulletNotes.map(n => `<li>${n}</li>`).join('')}</ul>`
        : '';

    let notesHTML = '';
    if (desc?.tableRows && desc.tableRows.length > 0) {
        const rows = desc.tableRows.map(r => {
            const descLines = r.desc.split('\n').join('<br>');
            return `<tr><td class="sp-tbl-level">${r.level}</td><td class="sp-tbl-desc">${descLines}</td></tr>`;
        }).join('');
        notesHTML = `${bulletsHTML}
            <table class="sp-notes-table">
                <thead><tr><th class="sp-tbl-level-hdr">Level</th><th class="sp-tbl-desc-hdr">Description</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
    } else if (desc?.effect) {
        const rows = desc.effect(curLv, character, maxHP, maxSP);
        if (rows.length > 0) {
            const rowsHTML = rows.map(r => {
                const nextSpan = (r.next != null && r.next !== r.value)
                    ? ` <span class="sp-next">(→ ${r.next})</span>` : '';
                const rowClass = r.locked ? ' sp-effect-row-locked' : '';
                return `<tr class="sp-effect-row${rowClass}">
                    <td class="sp-effect-label">${r.label}</td>
                    <td class="sp-effect-value">${r.value}${nextSpan}</td>
                </tr>`;
            }).join('');
            notesHTML = `${bulletsHTML}<table class="sp-effects-table"><tbody>${rowsHTML}</tbody></table>`;
        } else {
            notesHTML = bulletsHTML || `<p class="sp-no-effect">No additional details.</p>`;
        }
    } else {
        notesHTML = bulletsHTML || `<p class="sp-no-effect">No additional details.</p>`;
    }

    const otherNotesRow = `<tr><th class="sp-notes-th">Other Notes</th><td colspan="7" class="sp-notes-td">${notesHTML}</td></tr>`;

    // ── Footer bar: Cast Delay / Effect Duration / SP Cost ────────
    let footerBarHTML = '';
    if (desc?.castDelay || desc?.effectDuration || desc?.spCost) {
        const cd = desc.castDelay      ? `<span class="sp-footer-item"><strong>Cast Delay</strong> ${desc.castDelay}</span>`           : '';
        const ed = desc.effectDuration ? `<span class="sp-footer-item"><strong>Effect Duration</strong> ${desc.effectDuration}</span>` : '';
        const sp = desc.spCost         ? `<span class="sp-footer-item"><strong>SP Cost</strong> ${desc.spCost}</span>`                 : '';
        footerBarHTML = `<div class="sp-footer-bar">${cd}${ed}${sp}</div>`;
    }

    // ── Per-level cost table ──────────────────────────────────────
    let costTableHTML = '';
    if (desc?.costTable) {
        const { label: costLabel, values } = desc.costTable;
        const lvHeaders = values.map((_, i) => `<th>Lv ${i + 1}</th>`).join('');
        const valCells  = values.map(v => `<td>${v}</td>`).join('');
        costTableHTML = `
        <table class="sp-cost-table">
            <thead><tr><th></th>${lvHeaders}<th>${costLabel}</th></tr></thead>
            <tbody><tr><td class="sp-cost-row-label">${costLabel}</td>${valCells}<td></td></tr></tbody>
        </table>`;
    }

    // ── Copyable / Interruptible / Related ────────────────────────
    let metaFooterHTML = '';
    const hasMeta = desc?.copyable != null || desc?.interruptible != null || desc?.relatedClass || desc?.relatedStatus;
    if (hasMeta) {
        const copyIcon = desc.copyable
            ? `<span class="sp-bool sp-bool-yes">✔</span>`
            : `<span class="sp-bool sp-bool-no">✘</span>`;
        const intrIcon = desc.interruptible
            ? `<span class="sp-bool sp-bool-yes">✔</span>`
            : `<span class="sp-bool sp-bool-no">✘</span>`;
        const copyPart = desc?.copyable      != null ? `<span class="sp-meta-footer-item">Copyable: ${copyIcon}</span>` : '';
        const intrPart = desc?.interruptible != null ? `<span class="sp-meta-footer-item">Interruptible: ${intrIcon}</span>` : '';
        const clsPart  = desc?.relatedClass   ? `<span class="sp-meta-footer-item">Related Class: [${desc.relatedClass} ♂]</span>` : '';
        const statPart = desc?.relatedStatus  ? `<span class="sp-meta-footer-item">Related Status: [${desc.relatedStatus}]</span>` : '';
        metaFooterHTML = `<div class="sp-meta-footer">${copyPart}${intrPart}${clsPart}${statPart}</div>`;
    }

    // ── Assemble ──────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id        = 'skill-popup-overlay';
    overlay.className = 'skill-popup-overlay';
    overlay.addEventListener('click', () => closeSkillPopup(true));

    const popup = document.createElement('div');
    popup.id        = 'skill-popup';
    popup.className = 'skill-popup sp-wiki';
    popup.addEventListener('click', e => e.stopPropagation());

    popup.innerHTML = `
        <div class="sp-title-bar">
            ${iconHTML}
            <span class="sp-name">${skillName}</span>
            ${skillId ? `<span class="sp-id-tag">${skillId} ${internalNm}</span>` : ''}
            <button class="sp-close" onclick="closeSkillPopup(true)">✕</button>
        </div>

        <table class="sp-info-table">
            <tbody>
                <tr>
                    <th>Type</th>
                    <td class="sp-meta-val">${skillType}</td>
                    <th>Max Lv</th>
                    <td class="sp-meta-val sp-meta-center">${skillMaxLv}</td>
                    <th>Target</th>
                    <td class="sp-meta-val">${skillTgt}</td>
                    <th>Range</th>
                    <td class="sp-meta-val">${skillRange}</td>
                </tr>
                ${propRow}
                ${reqRow}
                ${reqForRow}
                ${effectRow}
                ${otherNotesRow}
            </tbody>
        </table>

        ${footerBarHTML}
        ${costTableHTML}
        ${metaFooterHTML}
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        overlay.classList.add('sp-visible');
        popup.classList.add('sp-visible');
    });
}

function closeSkillPopup(fade = true) {
    const overlay = document.getElementById('skill-popup-overlay');
    const popup   = document.getElementById('skill-popup');
    if (!overlay && !popup) return;
    if (fade) {
        overlay?.classList.add('sp-hiding');
        popup?.classList.add('sp-hiding');
        setTimeout(() => { overlay?.remove(); popup?.remove(); }, 200);
    } else {
        overlay?.remove();
        popup?.remove();
    }
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

    const sortOrder = (s) => s.type === 'quest' ? 2 : s.type === 'passive' ? 0 : 1;
    const sorted    = [...activeSkillData.unlocked].sort((a, b) => sortOrder(a) - sortOrder(b));

    let uHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills ~</td></tr>`;
    sorted.forEach((s) => {
        const idx     = activeSkillData.unlocked.indexOf(s);
        const isQuest = s.type === 'quest';
        const minBtn  = `<button class="skill-adj-btn minus" ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx}, -1)"`}>${SVG_MINUS}</button>`;
        const addBtn  = `<button class="skill-adj-btn add"   ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx},  1)"`}>${SVG_ADD}</button>`;
        uHTML += `
        <tr data-skill-idx="${idx}">
            <td class="skill-icon-cell">${getSkillIcon(s.name)}</td>
            <td><span class="skill-name-link">${s.name}</span></td>
            <td><div class="skill-lvl-cell">${minBtn}<span class="skill-level-badge">${s.cur} / ${s.max}</span>${addBtn}</div></td>
            <td>${buildTypeTags(s)}</td>
        </tr>`;
    });
    unlockedBody.innerHTML = uHTML;

    let lHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills ~</td></tr>`;
    if (activeSkillData.locked.length === 0) {
        lHTML += `<tr><td colspan="4" class="skills-sub-label" style="padding:10px 0;">—</td></tr>`;
    } else {
        const pts     = Math.max(0, (character.jobLevel || 0) - 1);
        const used    = activeSkillData.unlocked.reduce((sum, sk) => sum + (sk.type !== 'quest' ? sk.cur : 0), 0);
        const ptsLeft = pts - used;
        activeSkillData.locked.forEach(s => {
            const eName      = s.name.replace(/'/g, "\\'");
            const cost       = calcUnlockCost(s.name);
            const canAfford  = cost <= ptsLeft;
            const disabledAttr = canAfford ? '' : 'disabled';
            const titleText    = canAfford
                ? `Needs ${cost} point${cost !== 1 ? 's' : ''} — click to unlock`
                : `Needs ${cost} point${cost !== 1 ? 's' : ''} — not enough points`;
            lHTML += `
            <tr>
                <td class="skill-icon-cell">${getSkillIcon(s.name)}</td>
                <td><span class="skill-name-link">${s.name}</span></td>
                <td>
                    <div class="skill-unlock-cell">
                        <span class="skill-level-badge">${s.max}</span>
                        <button class="skill-unlock-btn" ${disabledAttr} title="${titleText}"
                            onclick="forceUnlock('${eName}')">${SVG_UNLOCK}</button>
                    </div>
                </td>
                <td>${buildLockedTypeTag(s)}<span class="skill-req">${s.req}</span></td>
            </tr>`;
        });
    }
    lockedBody.innerHTML = lHTML;

    unlockedBody.querySelectorAll('.skill-name-link').forEach(el => {
        el.addEventListener('click', () => showSkillPopup(el.textContent.trim()));
    });
    lockedBody.querySelectorAll('.skill-name-link').forEach(el => {
        el.addEventListener('click', () => showSkillPopup(el.textContent.trim(), null, true));
    });
}

// ===================================================================
// ADJUST SKILL LEVEL  (+1 / -1)
// ===================================================================
function adjustSkill(idx, delta) {
    const s = activeSkillData.unlocked[idx];
    if (s.type === 'quest') return;
    const pts  = Math.max(0, (character.jobLevel || 0) - 1);
    const used = activeSkillData.unlocked.reduce((sum, sk) => sum + (sk.type !== 'quest' ? sk.cur : 0), 0);
    const left = pts - used;
    if (delta > 0 && (s.cur >= s.max || left <= 0)) return;
    if (delta < 0 && s.cur <= 0) return;
    s.cur += delta;
    if (delta > 0) { checkUnlocks(); }
    else { checkLocks(); checkUnlocks(); }
    renderSkillTables();
    updateFooter();
    if (typeof updateUI === 'function') updateUI();
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
    if (typeof updateUI === 'function') updateUI();
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