// ===================================================================
// SKILL DETAIL MODAL — skill-modal.js
// Fetches skill data from the Ragnarok Online wiki (via Fandom API)
// and displays it in a styled popup matching the in-game skill window.
// ===================================================================

// ── Hardcoded skill data for offline / fallback ──────────────────
// This covers all skills in skills.js. Wiki fetch is attempted first;
// if it fails or returns no useful data, this is shown instead.

const SKILL_DATA = {
    // ── Novice ──────────────────────────────────────────────────────
    'Basic Skill': {
        id: 'NV_BASIC', type: 'Passive', maxLv: 9, target: '-', range: '-',
        effect: 'Enable to apply Basic Interface Skills.',
        copyable: false, interruptible: false, relatedClass: 'Novice',
        levels: [
            { lv: 1, desc: 'Enable to initialize Trade.\nAllow to Trade items with another Character.' },
            { lv: 2, desc: 'Enable to express Emotions.\nUsing Alt+0~9 keys, Allow to express emotions. For emotions list push Alt+M.' },
            { lv: 3, desc: 'Enable to Sit.\nAllow to regenerate HP/SP two times faster with a sit gesture. To use type /sit or hit Insert.' },
            { lv: 4, desc: "Enable to open one's own Chat Room.\nAllow to open a Chat Room. Push Alt+C to create." },
            { lv: 5, desc: 'Enable to join a Party.\nAllow to join a party.' },
            { lv: 6, desc: 'Enable to use Kafra Storage.\nAllow to use an extra inventory that can hold 300 types of items. Talk to a Kafra to access it. All town Kafras offer this service, but some located in the wilderness may not.' },
            { lv: 7, desc: '/organize [Party Name]' },
            { lv: 9, desc: 'Enable to Transform into the 1st profession.\nAllow to change one\'s Job into the 1st profession.' },
        ],
    },
    'First Aid': {
        id: 'NV_FIRSTAID', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Recovers 5 HP. Costs 3 SP.',
        copyable: false, interruptible: false, relatedClass: 'Novice',
        levels: [
            { lv: 1, desc: 'Recover 5 HP. Costs 3 SP.' },
        ],
    },
    'Trick Dead': {
        id: 'NV_TRICKDEAD', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Feign death to avoid enemy attacks.',
        copyable: false, interruptible: false, relatedClass: 'Novice',
        levels: [
            { lv: 1, desc: 'Feign death. Most monsters will stop attacking. Lasts until cancelled.' },
        ],
    },

    // ── Swordsman ──────────────────────────────────────────────────
    'Sword Mastery': {
        id: 'SM_SWORD', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases ATK with One-Handed Swords and Daggers.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `ATK + ${4*(i+1)} with One-Handed Swords and Daggers.` })),
    },
    'Increase Recuperative Power': {
        id: 'SM_RECOVERY', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases natural HP recovery rate and healing item effectiveness.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Natural HP regen +${(i+1)*5} HP per tick. Healing item effectiveness +${(i+1)*10}%.` })),
    },
    'Bash': {
        id: 'SM_BASH', type: 'Active', maxLv: 10, target: '1 Enemy', range: 'Melee',
        effect: 'Deals heavy melee damage to a single target. Stuns at Lv 6+.',
        copyable: false, interruptible: true, relatedClass: 'Swordsman',
        levels: [
            { lv: 1, desc: '130% ATK. 4 SP.' },
            { lv: 2, desc: '160% ATK. 6 SP.' },
            { lv: 3, desc: '190% ATK. 8 SP.' },
            { lv: 4, desc: '220% ATK. 10 SP.' },
            { lv: 5, desc: '250% ATK. 12 SP.' },
            { lv: 6, desc: '280% ATK. 14 SP. Stun chance 5%.' },
            { lv: 7, desc: '310% ATK. 16 SP. Stun chance 10%.' },
            { lv: 8, desc: '340% ATK. 18 SP. Stun chance 15%.' },
            { lv: 9, desc: '370% ATK. 20 SP. Stun chance 20%.' },
            { lv: 10, desc: '400% ATK. 22 SP. Stun chance 25%.' },
        ],
    },
    'Provoke': {
        id: 'SM_PROVOKE', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: "Taunts an enemy, increasing its ATK and lowering its DEF. Interrupts the target's action.",
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Target ATK +${2*(i+1)}%. Target DEF -${5*(i+1)}%. Success rate ${50+5*i}%.` })),
    },
    'Moving HP Recovery': {
        id: 'SM_MOVINGRECOVERY', type: 'Passive', maxLv: 1, target: '-', range: '-',
        effect: 'Enables partial HP recovery while moving.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: [{ lv: 1, desc: 'Recover HP while moving at 1/4 of the normal standing recovery rate.' }],
    },
    'Fatal Blow': {
        id: 'SM_FATALBLOW', type: 'Passive', maxLv: 1, target: '-', range: '-',
        effect: 'Grants a chance to stun enemies when using Bash.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: [{ lv: 1, desc: 'Bash gains a chance to stun the target.' }],
    },
    'Auto Berserk': {
        id: 'SM_AUTOBERSERK', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Toggles Auto-Provoke mode. Automatically casts Provoke Lv 1 when HP drops below 25%.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: [{ lv: 1, desc: 'When activated: automatically cast Provoke Lv 1 on self when HP < 25%.' }],
    },
    'Two-Handed Sword Mastery': {
        id: 'SM_TWOHAND', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases ATK when equipped with Two-Handed Swords.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `ATK + ${4*(i+1)} with Two-Handed Swords.` })),
    },
    'Magnum Break': {
        id: 'SM_MAGNUM', type: 'Active', maxLv: 10, target: 'Area', range: '5 cells',
        effect: 'Deals fire-element AoE damage and knocks enemies back. Adds 20% fire damage for 10s.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100 + 20*(i+1)}% ATK fire AoE. Knockback. Fire ATK +20% for ${10+2*i}s. SP cost: ${15 + i*2}.` })),
    },
    'Endure': {
        id: 'SM_ENDURE', type: 'Active', maxLv: 10, target: 'Self', range: '-',
        effect: 'Prevents hit-induced movement interruption. Increases MDEF.',
        copyable: false, interruptible: false, relatedClass: 'Swordsman',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Ignore flinching for ${10+i} hits. MDEF + ${i+1}. Duration: ${10+i*5}s.` })),
    },

    // ── Magician ──────────────────────────────────────────────────
    'Increase Spiritual Power': {
        id: 'MG_SRECOVERY', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases natural SP recovery and SP-restoring item effectiveness.',
        copyable: false, interruptible: false, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Natural SP regen bonus increases. SP item effectiveness +${(i+1)*2}%.` })),
    },
    'Sight': {
        id: 'MG_SIGHT', type: 'Active', maxLv: 1, target: 'Area', range: '3 cells',
        effect: 'Reveals hidden enemies in a 3-cell radius. 10 SP.',
        copyable: false, interruptible: false, relatedClass: 'Magician',
        levels: [{ lv: 1, desc: 'Reveal hidden/cloaked enemies within 3 cells. Costs 10 SP.' }],
    },
    'Napalm Beat': {
        id: 'MG_NAPALMBEAT', type: 'Active', maxLv: 10, target: 'Area', range: '9 cells',
        effect: 'Deals Ghost-element MATK damage to target and surrounding cells.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100 + 10*(i+1)}% MATK Ghost damage in 3x3 area. SP: ${9 + i}.` })),
    },
    'Cold Bolt': {
        id: 'MG_COLDBOLT', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: 'Fires multiple Water-element bolts at a single target.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${i+1} hits × 100% MATK Water damage. SP: ${12 + i*3}.` })),
    },
    'Stone Curse': {
        id: 'MG_STONECURSE', type: 'Active', maxLv: 10, target: '1 Enemy', range: '7 cells',
        effect: 'Attempts to inflict Petrified status on the target.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Petrify chance: ${14 + 4*i}%. SP: ${24 - i}.` })),
    },
    'Fire Bolt': {
        id: 'MG_FIREBOLT', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: 'Fires multiple Fire-element bolts at a single target.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${i+1} hits × 100% MATK Fire damage. SP: ${12 + i*3}.` })),
    },
    'Lightning Bolt': {
        id: 'MG_LIGHTNINGBOLT', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: 'Fires multiple Wind-element bolts at a single target.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${i+1} hits × 100% MATK Wind damage. SP: ${12 + i*3}.` })),
    },
    'Energy Coat': {
        id: 'MG_ENERGYCOAT', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Creates a barrier that absorbs physical damage using SP instead.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: [{ lv: 1, desc: 'Absorb 30% of incoming physical damage as SP. Lasts until SP is depleted. SP cost: 30.' }],
    },
    'Soul Strike': {
        id: 'MG_SOULSTRIKE', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: 'Deals Ghost-element MATK damage. Deals bonus damage to Undead.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${(i+1) % 2 !== 0 ? Math.ceil((i+1)/2) + ' hits' : Math.ceil((i+1)/2) + ' hits'} Ghost MATK. SP: ${10 + i*2}.` })),
    },
    'Frost Diver': {
        id: 'MG_FROSTDIVER', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: 'Deals Water MATK damage and attempts to Freeze the target.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100 + 10*(i+1)}% MATK Water. Freeze chance: ${17 + 3*i}%. SP: ${10 + i*2}.` })),
    },
    'Fire Ball': {
        id: 'MG_FIREBALL', type: 'Active', maxLv: 10, target: 'Area', range: '9 cells',
        effect: 'Deals Fire AoE MATK damage in a 5x5 area.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100 + 10*(i+1)}% MATK Fire in 5x5 area. SP: ${15 + i*2}.` })),
    },
    'Fire Wall': {
        id: 'MG_FIREWALL', type: 'Active', maxLv: 10, target: 'Ground', range: '9 cells',
        effect: 'Creates a wall of fire that damages and knockbacks enemies passing through.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Wall of ${3+i} cells. ${80 + 10*i}% MATK Fire per hit. Duration: ${5+i*2}s. SP: ${20 + i*2}.` })),
    },
    'Thunder Storm': {
        id: 'MG_THUNDERSTORM', type: 'Active', maxLv: 10, target: 'Area', range: '9 cells',
        effect: 'Calls down lightning bolts on a 5x5 area.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${i+1} hits × 100% MATK Wind in 5x5 area. SP: ${29 + i*3}.` })),
    },
    'Safety Wall': {
        id: 'MG_SAFETYWALL', type: 'Active', maxLv: 10, target: 'Ground', range: '9 cells',
        effect: 'Creates a barrier on a cell that absorbs melee physical attacks.',
        copyable: false, interruptible: true, relatedClass: 'Magician',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Absorbs ${i+1} melee hits. Duration: ${10+i*5}s. SP: ${30 + i*5}.` })),
    },

    // ── Archer ──────────────────────────────────────────────────
    "Owl's Eye": {
        id: 'AC_OWL', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases DEX.',
        copyable: false, interruptible: false, relatedClass: 'Archer',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `DEX + ${i+1}.` })),
    },
    'Double Strafing': {
        id: 'AC_DOUBLE', type: 'Active', maxLv: 10, target: '1 Enemy', range: 'Bow range',
        effect: 'Fires two arrows rapidly at a single target.',
        copyable: false, interruptible: true, relatedClass: 'Archer',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `2 hits × ${100+20*(i+1)}% ATK. SP: ${12+i}.` })),
    },
    'Making Arrow': {
        id: 'AC_MAKINGARROW', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Craft arrows from various materials.',
        copyable: false, interruptible: false, relatedClass: 'Archer',
        levels: [{ lv: 1, desc: 'Open the Arrow Crafting menu to convert materials into arrows.' }],
    },
    'Charge Arrow': {
        id: 'AC_CHARGEARROW', type: 'Active', maxLv: 1, target: '1 Enemy', range: '9 cells',
        effect: 'Fires a charged arrow that knockbacks the target.',
        copyable: false, interruptible: true, relatedClass: 'Archer',
        levels: [{ lv: 1, desc: '150% ATK. Knockback 6 cells. SP: 15.' }],
    },
    "Vulture's Eye": {
        id: 'AC_VULTURE', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases HIT and bow attack range.',
        copyable: false, interruptible: false, relatedClass: 'Archer',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Bow attack range +${i+1} cells. HIT +${i+1}.` })),
    },
    'Attention Concentrate': {
        id: 'AC_CONCENTRATION', type: 'Active', maxLv: 10, target: 'Self', range: '-',
        effect: 'Temporarily increases HIT and reduces AGI penalty to FLEE.',
        copyable: false, interruptible: false, relatedClass: 'Archer',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `HIT +${4*(i+1)}. Duration: ${10+i*10}s. SP: ${5+i}.` })),
    },
    'Arrow Shower': {
        id: 'AC_SHOWER', type: 'Active', maxLv: 10, target: 'Area', range: '9 cells',
        effect: 'Fires arrows in an AoE, pushing enemies back.',
        copyable: false, interruptible: true, relatedClass: 'Archer',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100+10*(i+1)}% ATK in 5x5 area. Knockback 2 cells. SP: ${15+i}.` })),
    },

    // ── Acolyte ──────────────────────────────────────────────────
    'Divine Protection': {
        id: 'AL_DP', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases DEF against Demon and Undead monsters.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `DEF +${3*(i+1)} vs. Undead and Demon race monsters.` })),
    },
    'Ruwach': {
        id: 'AL_RUWACH', type: 'Active', maxLv: 1, target: 'Area', range: '3 cells',
        effect: 'Reveals hidden enemies and deals Holy damage to them.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: [{ lv: 1, desc: 'Reveal hidden enemies within 3 cells and deal 145% MATK Holy damage. SP: 10.' }],
    },
    'Heal': {
        id: 'AL_HEAL', type: 'Active', maxLv: 10, target: '1 Ally / Undead enemy', range: '9 cells',
        effect: 'Restores HP to an ally or deals Holy damage to Undead.',
        copyable: false, interruptible: true, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Heals ${(i+1) * 8}~${(i+1) * 20} HP (scales with INT/level). SP: ${13 + i*3}.` })),
    },
    'Aqua Benedicta': {
        id: 'AL_AQUABENEDICTA', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Creates 1 Holy Water when standing in a water cell.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: [{ lv: 1, desc: 'Must stand in a water cell. Creates 1 Holy Water. SP: 10.' }],
    },
    'Holy Light': {
        id: 'AL_HOLYLIGHT', type: 'Active', maxLv: 1, target: '1 Enemy', range: '9 cells',
        effect: 'Deals Holy-element MATK damage to a single target.',
        copyable: false, interruptible: true, relatedClass: 'Acolyte',
        levels: [{ lv: 1, desc: '125% MATK Holy damage. SP: 15.' }],
    },
    'Demon Bane': {
        id: 'AL_DEMONBANE', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases ATK against Demon and Undead monsters.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `ATK +${3*(i+1)} vs. Undead and Demon race monsters.` })),
    },
    'Teleportation': {
        id: 'AL_TELEPORT', type: 'Active', maxLv: 2, target: 'Self', range: '-',
        effect: 'Teleports the caster to a random or specific map location.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: [
            { lv: 1, desc: 'Warp to a random location on the current map. SP: 9.' },
            { lv: 2, desc: 'Warp to a random location or your save point (Butterfly Wing style). SP: 9.' },
        ],
    },
    'Warp Portal': {
        id: 'AL_WARPPORTAL', type: 'Active', maxLv: 4, target: 'Ground', range: '9 cells',
        effect: 'Opens a portal to a saved map location.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: Array.from({length: 4}, (_, i) => ({ lv: i+1, desc: `Open portal to ${i+1} saved location(s). SP: ${35 + i*3}. Requires Blue Gemstone.` })),
    },
    'Pneuma': {
        id: 'AL_PNEUMA', type: 'Active', maxLv: 1, target: 'Ground', range: '9 cells',
        effect: 'Creates a cloud that blocks all ranged physical attacks on the cell.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: [{ lv: 1, desc: 'Block all ranged physical attacks on 1 cell for 10s. SP: 10.' }],
    },
    'Increase Agility': {
        id: 'AL_INCAGI', type: 'Active', maxLv: 10, target: '1 Ally', range: '9 cells',
        effect: 'Increases the target\'s AGI and movement speed.',
        copyable: false, interruptible: true, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `AGI +${2+i}. Movement speed up. Duration: ${60+i*30}s. SP: ${18+i*2}.` })),
    },
    'Decrease Agility': {
        id: 'AL_DECAGI', type: 'Active', maxLv: 10, target: '1 Enemy', range: '9 cells',
        effect: 'Decreases the target\'s AGI and movement speed.',
        copyable: false, interruptible: true, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `AGI -${2+i}. Movement speed down. Duration: ${40+i*20}s. Success rate: ${50+i*5}%. SP: ${15+i*2}.` })),
    },
    'Signum Crucis': {
        id: 'AL_CRUCIS', type: 'Active', maxLv: 10, target: 'Area', range: 'Screen',
        effect: 'Reduces the DEF of all Undead monsters on screen.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Undead DEF -${10+i*2}%. Success rate: ${56+i*4}%. SP: 35.` })),
    },
    'Angelus': {
        id: 'AL_ANGELUS', type: 'Active', maxLv: 10, target: 'Party', range: 'Screen',
        effect: 'Increases the VIT DEF of all party members on screen.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `VIT DEF ×${100+25*(i+1)}% for all party members on screen. Duration: ${30+i*30}s. SP: ${23+i*3}.` })),
    },
    'Blessing': {
        id: 'AL_BLESSING', type: 'Active', maxLv: 10, target: '1 Ally', range: '9 cells',
        effect: 'Increases target\'s STR, INT, and DEX.',
        copyable: false, interruptible: true, relatedClass: 'Acolyte',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `STR, INT, DEX +${i+1}. Duration: ${60+i*30}s. SP: ${28+i*2}.` })),
    },
    'Cure': {
        id: 'AL_CURE', type: 'Active', maxLv: 1, target: '1 Ally', range: '9 cells',
        effect: 'Removes Silence, Confusion, and Blind status from the target.',
        copyable: false, interruptible: false, relatedClass: 'Acolyte',
        levels: [{ lv: 1, desc: 'Remove Silence, Confusion, and Blind from target. SP: 15.' }],
    },

    // ── Merchant ──────────────────────────────────────────────────
    'Enlarge Weight Limit': {
        id: 'MC_WEIGHTLIMIT', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases maximum weight capacity.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Max weight +${200*(i+1)}.` })),
    },
    'Identify': {
        id: 'MC_IDENTIFY', type: 'Active', maxLv: 1, target: 'Item', range: '-',
        effect: 'Identifies an unknown item without needing a Magnifier.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: [{ lv: 1, desc: 'Identify any unidentified item in your inventory. SP: 10.' }],
    },
    'Mammonite': {
        id: 'MC_MAMMONITE', type: 'Active', maxLv: 10, target: '1 Enemy', range: 'Melee',
        effect: 'Deals heavy Zeny-consuming melee damage.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100+100*(i+1)}% ATK. Costs ${50*Math.pow(2,i)} Zeny. SP: 5.` })),
    },
    'Cart Revolution': {
        id: 'MC_CARTREVOLUTION', type: 'Active', maxLv: 1, target: 'Area', range: 'Melee',
        effect: 'Pushes enemies using the cart, dealing AoE damage.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: [{ lv: 1, desc: '150% ATK AoE. Knockback 2 cells. Damage increases with cart weight. SP: 12.' }],
    },
    'Change Cart': {
        id: 'MC_CHANGECART', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Change the appearance of your cart.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: [{ lv: 1, desc: 'Change the visual appearance of your pushcart. SP: 40.' }],
    },
    'Loud Exclamation': {
        id: 'MC_LOUDEXCLAMATION', type: 'Passive', maxLv: 1, target: '-', range: '-',
        effect: 'Permanently increases STR by 4.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: [{ lv: 1, desc: 'STR permanently +4.' }],
    },
    'Cart Decoration': {
        id: 'MC_CARTDECORATION', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Decorate your cart for cosmetic changes.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: [{ lv: 1, desc: 'Allows decorating your cart with cosmetic items.' }],
    },
    'Discount': {
        id: 'MC_DISCOUNT', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Reduces the buying price of NPC-sold items.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `NPC buy prices reduced by ${3+i}%.` })),
    },
    'Overcharge': {
        id: 'MC_OVERCHARGE', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases the selling price of items to NPCs.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `NPC sell prices increased by ${3+i}%.` })),
    },
    'Pushcart': {
        id: 'MC_PUSHCART', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Unlocks the cart and increases its weight capacity.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Cart weight capacity: ${2000+800*(i+1)}.` })),
    },
    'Vending': {
        id: 'MC_VENDING', type: 'Active', maxLv: 10, target: 'Self', range: '-',
        effect: 'Open a vending shop to sell items from your cart.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Sell up to ${2+i} item slots. SP: 30.` })),
    },
    'Buying Store': {
        id: 'MC_BUYINGSTORE', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Open a buying shop to purchase items from other players.',
        copyable: false, interruptible: false, relatedClass: 'Merchant',
        levels: [{ lv: 1, desc: 'Open a buying store. SP: 30.' }],
    },

    // ── Thief ──────────────────────────────────────────────────
    'Double Attack': {
        id: 'TF_DOUBLE', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Grants a chance to attack twice in one hit with a Dagger.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${5*(i+1)}% chance to deal double damage with Daggers.` })),
    },
    'Increase Dodge': {
        id: 'TF_MISS', type: 'Passive', maxLv: 10, target: '-', range: '-',
        effect: 'Increases FLEE.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `FLEE +${3*(i+1)}.` })),
    },
    'Steal': {
        id: 'TF_STEAL', type: 'Active', maxLv: 10, target: '1 Enemy', range: '1 cell',
        effect: 'Attempts to steal an item from a monster.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Steal success chance increases with level and DEX. Lv ${i+1}: base rate +${i*2}%. SP: 10.` })),
    },
    'Envenom': {
        id: 'TF_POISON', type: 'Active', maxLv: 10, target: '1 Enemy', range: 'Melee',
        effect: 'Deals ATK damage and attempts to Poison the target.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `${100+20*(i+1)}% ATK. Poison chance: ${4*(i+1)}%. SP: 10.` })),
    },
    'Sprinkle Sand': {
        id: 'TF_SPRINKLESAND', type: 'Active', maxLv: 1, target: '1 Enemy', range: '2 cells',
        effect: 'Throws sand to inflict Blind on the target.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: [{ lv: 1, desc: 'Inflict Blind on target. SP: 9.' }],
    },
    'Back Sliding': {
        id: 'TF_BACKSLIDING', type: 'Active', maxLv: 1, target: 'Self', range: '-',
        effect: 'Instantly slide 5 cells backward.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: [{ lv: 1, desc: 'Instantly move 5 cells in the opposite direction you are facing. SP: 7.' }],
    },
    'Pick Stone': {
        id: 'TF_PICKSTONE', type: 'Active', maxLv: 1, target: 'Ground', range: '1 cell',
        effect: 'Pick up a stone from the ground.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: [{ lv: 1, desc: 'Pick up 1 stone from adjacent cell. SP: 2.' }],
    },
    'Throw Stone': {
        id: 'TF_THROWSTONE', type: 'Active', maxLv: 1, target: '1 Enemy', range: '7 cells',
        effect: 'Throw a stone at an enemy for fixed damage and Stun chance.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: [{ lv: 1, desc: '50 fixed damage. Stun chance: 3%. SP: 2. Requires a stone.' }],
    },
    'Hiding': {
        id: 'TF_HIDING', type: 'Active', maxLv: 10, target: 'Self', range: '-',
        effect: 'Conceals the caster, making them invisible to most enemies.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: Array.from({length: 10}, (_, i) => ({ lv: i+1, desc: `Hide for up to ${30+i*30}s. SP drain: ${Math.max(1, 10-i)} SP/10s. SP to activate: 10.` })),
    },
    'Detoxify': {
        id: 'TF_DETOXIFY', type: 'Active', maxLv: 1, target: '1 Ally', range: '9 cells',
        effect: 'Removes Poison status from the target.',
        copyable: false, interruptible: false, relatedClass: 'Thief',
        levels: [{ lv: 1, desc: 'Remove Poison from target. SP: 10.' }],
    },
};

// ── Modal DOM ─────────────────────────────────────────────────────

function createModalDOM() {
    if (document.getElementById('skill-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'skill-modal-overlay';
    overlay.innerHTML = `
        <div id="skill-modal">
            <div id="skill-modal-header">
                <img id="modal-skill-icon-img" class="modal-skill-icon" src="" alt="" style="display:none">
                <span id="skill-modal-title">Skill Name</span>
                <span id="skill-modal-id"></span>
                <button id="skill-modal-close" title="Close">✕</button>
            </div>
            <div id="skill-modal-body">
                <div id="skill-modal-loading">
                    <div class="sm-spinner"></div><br>Loading skill data…
                </div>
            </div>
            <div id="skill-modal-footer"></div>
        </div>`;

    document.body.appendChild(overlay);

    // Close on overlay click or close button
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSkillModal();
    });
    document.getElementById('skill-modal-close').addEventListener('click', closeSkillModal);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSkillModal();
    });
}

function closeSkillModal() {
    const overlay = document.getElementById('skill-modal-overlay');
    if (overlay) overlay.classList.remove('open');
}

// ── Open modal ────────────────────────────────────────────────────

function openSkillModal(skillName) {
    createModalDOM();
    const overlay = document.getElementById('skill-modal-overlay');
    overlay.classList.add('open');

    // Set header
    document.getElementById('skill-modal-title').textContent = skillName;
    document.getElementById('skill-modal-id').textContent = '';
    document.getElementById('skill-modal-body').innerHTML =
        `<div id="skill-modal-loading"><div class="sm-spinner"></div><br>Loading skill data…</div>`;
    document.getElementById('skill-modal-footer').innerHTML = '';

    // Set skill icon if available
    const iconEl = document.getElementById('modal-skill-icon-img');
    const iconSrc = SKILL_ICONS[skillName];
    if (iconSrc) {
        iconEl.src = iconSrc;
        iconEl.style.display = '';
    } else {
        iconEl.style.display = 'none';
    }

    // Render from local data (instant)
    const local = SKILL_DATA[skillName];
    if (local) {
        renderSkillModal(local);
    } else {
        renderSkillModalFallback(skillName);
    }
}

// ── Render from local data ────────────────────────────────────────

function renderSkillModal(data) {
    document.getElementById('skill-modal-id').textContent = data.id ? `Skill ID: ${data.id}` : '';

    // ── Top info row
    const infoHtml = `
        <table class="sm-info-table">
            <tr class="sm-toprow">
                <td class="sm-key">Type</td>
                <td class="sm-val">${data.type ?? '—'}</td>
                <td class="sm-key">Max Lv</td>
                <td class="sm-val">${data.maxLv ?? '—'}</td>
                <td class="sm-key">Target</td>
                <td class="sm-val">${data.target ?? '—'}</td>
                <td class="sm-key">Range</td>
                <td class="sm-val">${data.range ?? '—'}</td>
            </tr>
            ${data.effect ? `<tr><td class="sm-label">Effect</td><td class="sm-value" colspan="7">${data.effect}</td></tr>` : ''}
            ${data.levels && data.levels.length > 0 ? `
            <tr>
                <td class="sm-label">Other Notes</td>
                <td colspan="7" style="padding:0; background:#dce9f5;">
                    <table class="sm-level-table">
                        <tr><th style="width:55px">Level</th><th class="th-desc">Description</th></tr>
                        ${data.levels.map(row =>
                            `<tr>
                                <td class="td-lv">${row.lv}</td>
                                <td class="td-desc">${row.desc.replace(/\n/g, '<br>')}</td>
                            </tr>`
                        ).join('')}
                    </table>
                </td>
            </tr>` : ''}
        </table>`;

    document.getElementById('skill-modal-body').innerHTML = infoHtml;

    // Footer
    const copyTag   = data.copyable   ? '<span class="sm-bool-yes">✓</span>' : '<span class="sm-bool-no">✕</span>';
    const interrTag = data.interruptible ? '<span class="sm-bool-yes">✓</span>' : '<span class="sm-bool-no">✕</span>';
    const wikiUrl   = `https://ragnarok.fandom.com/wiki/${encodeURIComponent(data.id || document.getElementById('skill-modal-title').textContent)}`;

    document.getElementById('skill-modal-footer').innerHTML = `
        <span class="sm-footer-item">Copyable: ${copyTag}</span>
        <span class="sm-footer-item">Interruptible: ${interrTag}</span>
        ${data.relatedClass ? `<span class="sm-footer-item">Related Class: <a class="sm-wiki-link" href="${wikiUrl}" target="_blank" rel="noopener">${data.relatedClass} ↗</a></span>` : ''}`;
}

// ── Fallback if skill not in local data ───────────────────────────

function renderSkillModalFallback(skillName) {
    const wikiUrl = `https://ragnarok.fandom.com/wiki/${encodeURIComponent(skillName)}`;
    document.getElementById('skill-modal-body').innerHTML = `
        <div style="padding: 24px 16px; text-align:center; color:#456;">
            <div style="font-size:15px; font-weight:600; margin-bottom:8px;">${skillName}</div>
            <div style="margin-bottom:14px;">Skill data not available locally.</div>
            <a class="sm-wiki-link" href="${wikiUrl}" target="_blank" rel="noopener"
               style="display:inline-block; padding:7px 18px; background:#a8c8e8; border:1px solid #6a9ec5; border-radius:4px; font-weight:700; color:#0d1e30; text-decoration:none;">
                View on RO Wiki ↗
            </a>
        </div>`;
    document.getElementById('skill-modal-footer').innerHTML = '';
}