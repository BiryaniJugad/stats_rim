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
// SKILL DESCRIPTIONS
// desc    : flavour/mechanic text
// effect  : function(level, char, maxHP, maxSP) → array of effect lines
//           each line: { label, value, next } where next is optional
// ===================================================================

const SKILL_DESCRIPTIONS = {

    // ── NOVICE ───────────────────────────────────────────────────────
    'Basic Skill': {
        desc: 'A foundational skill that unlocks core game functions as it levels up. Each level grants access to a new action or ability.',
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
               
            // Show unlocked levels normally, locked ones dimmed via a marker
            return ALL_LEVELS.map((row, i) => {
                const levelNum = i + 1;
                if (levelNum <= lv) {
                    // Unlocked — show as normal with no next
                    return { label: row.label, value: row.value };
                } else {
                    // Not yet reached — show as locked
                    return { label: row.label, value: row.value, locked: true };
                }
            });
        },
    },
    'First Aid': {
        desc: 'Restores a small amount of HP using basic first aid techniques.',
        effect: () => [
            { label: 'HP Restored', value: '5' },
        ],
    },
    'Trick Dead': {
        desc: 'Pretend to fall dead on the ground, becoming immune from all attacks from Players and monsters. Skill can be toggled on and off',
        effect: () => [
            {label: 'Skill can be toggled On and Off', value: ''}
        ],
    },

    // ── SWORDSMAN ────────────────────────────────────────────────────
    'Sword Mastery': {
        desc: 'Increases damage with Daggers and One-Handed Swords. Bypasses armor and VIT defense.',
        effect: (lv) => [
            { label: 'ATK Bonus', value: `+${4 * lv}`, next: lv < 10 ? `+${4 * (lv + 1)}` : null },
        ],
    },
    'Two-Handed Sword Mastery': {
        desc: 'Increases damage with Two-Handed Swords. Bypasses armor and VIT defense.',
        effect: (lv) => [
            { label: 'ATK Bonus', value: `+${4 * lv}`, next: lv < 10 ? `+${4 * (lv + 1)}` : null },
        ],
    },
    'Increase Recuperative Power': {
        desc: 'Heals HP every 10 seconds while standing still on one cell. Also increases healing item effectiveness.',
        effect: (lv, char, maxHP) => [
            { label: 'HP / 10s still',  value: `+${Math.floor((5 * lv) + (maxHP * 0.002 * lv))}`,
              next: lv < 10 ? `+${Math.floor((5 * (lv+1)) + (maxHP * 0.002 * (lv+1)))}` : null },
            { label: 'Heal Item Bonus', value: `+${10 * lv}%`,
              next: lv < 10 ? `+${10 * (lv + 1)}%` : null },
        ],
    },
    'Bash': {
        desc: 'A powerful melee attack that deals heavy damage to a single target.',
        effect: (lv) => [
            { label: 'ATK', value: `${130 + 30 * lv}%`, next: lv < 10 ? `${130 + 30 * (lv+1)}%` : null },
        ],
    },
    'Provoke': {
        desc: 'Taunts an enemy, increasing its ATK while reducing its DEF.',
        effect: (lv) => [
            { label: 'Enemy ATK +', value: `${2 + 3 * lv}%`, next: lv < 10 ? `${2 + 3*(lv+1)}%` : null },
            { label: 'Enemy DEF −', value: `${5 + 5 * lv}%`, next: lv < 10 ? `${5 + 5*(lv+1)}%` : null },
        ],
    },
    'Moving HP Recovery': {
        desc: 'Allows natural HP recovery while moving.',
        effect: () => [],
    },
    'Fatal Blow': {
        desc: 'Gives Bash a chance to stun the target.',
        effect: () => [{ label: 'Stun Chance', value: '5%' }],
    },
    'Auto Berserk': {
        desc: 'Automatically activates Provoke when HP drops below 25%.',
        effect: () => [],
    },
    'Magnum Break': {
        desc: 'A fire-element AoE attack that pushes enemies away.',
        effect: (lv) => [
            { label: 'ATK',       value: `${200 + 10 * lv}%`, next: lv < 10 ? `${200 + 10*(lv+1)}%` : null },
            { label: 'Fire Bonus',value: `+${20 + 5 * lv}%`,  next: lv < 10 ? `+${20 + 5*(lv+1)}%` : null },
        ],
    },
    'Endure': {
        desc: 'Temporarily prevents knockback and increases MDEF.',
        effect: (lv) => [
            { label: 'MDEF +', value: `+${lv}`, next: lv < 10 ? `+${lv+1}` : null },
        ],
    },

    // ── MAGICIAN ─────────────────────────────────────────────────────
    'Increase Spiritual Power': {
        desc: 'Increases SP recovery and healing item effectiveness for SP.',
        effect: (lv, char, maxHP, maxSP) => [
            { label: 'SP / 10s still',  value: `+${Math.floor((maxSP / 500 + 3) * lv)}`,
              next: lv < 10 ? `+${Math.floor((maxSP / 500 + 3) * (lv+1))}` : null },
            { label: 'SP Item Bonus',   value: `+${2 * lv}%`,
              next: lv < 10 ? `+${2 * (lv+1)}%` : null },
        ],
    },
    'Sight': {
        desc: 'Reveals hidden enemies in the surrounding area.',
        effect: () => [],
    },
    'Napalm Beat': {
        desc: 'Deals ghost-element magic damage in a 3x3 area.',
        effect: (lv) => [
            { label: 'MATK', value: `${100 + 10 * lv}%`, next: lv < 10 ? `${100 + 10*(lv+1)}%` : null },
        ],
    },
    'Cold Bolt': {
        desc: 'Deals water-element magic damage with multiple hits.',
        effect: (lv) => [
            { label: 'Hits',  value: `${lv}`,     next: lv < 10 ? `${lv+1}` : null },
            { label: 'MATK',  value: `${100}% × ${lv}` },
        ],
    },
    'Stone Curse': {
        desc: 'Attempts to inflict Stone Curse status on a target.',
        effect: (lv) => [
            { label: 'Success Rate', value: `${14 + 2 * lv}%`, next: lv < 10 ? `${14 + 2*(lv+1)}%` : null },
        ],
    },
    'Fire Bolt': {
        desc: 'Deals fire-element magic damage with multiple hits.',
        effect: (lv) => [
            { label: 'Hits', value: `${lv}`, next: lv < 10 ? `${lv+1}` : null },
            { label: 'MATK', value: `${100}% × ${lv}` },
        ],
    },
    'Lightning Bolt': {
        desc: 'Deals wind-element magic damage with multiple hits.',
        effect: (lv) => [
            { label: 'Hits', value: `${lv}`, next: lv < 10 ? `${lv+1}` : null },
            { label: 'MATK', value: `${100}% × ${lv}` },
        ],
    },
    'Energy Coat': {
        desc: 'Uses SP to reduce incoming physical damage based on remaining SP%.',
        effect: () => [],
    },
    'Soul Strike': {
        desc: 'Deals ghost-element damage; extra hits against undead.',
        effect: (lv) => [
            { label: 'Hits', value: `${Math.ceil(lv / 2)}`, next: lv < 10 ? `${Math.ceil((lv+1)/2)}` : null },
        ],
    },
    'Frost Diver': {
        desc: 'Deals water-element damage and attempts to freeze the target.',
        effect: (lv) => [
            { label: 'MATK',        value: `${100 + 10 * lv}%`, next: lv < 10 ? `${100 + 10*(lv+1)}%` : null },
            { label: 'Freeze Chance', value: `${30 + lv}%`,     next: lv < 10 ? `${30 + lv+1}%` : null },
        ],
    },
    'Fire Ball': {
        desc: 'Deals fire-element AoE damage in a 5x5 area.',
        effect: (lv) => [
            { label: 'MATK', value: `${100 + 20 * lv}%`, next: lv < 10 ? `${100 + 20*(lv+1)}%` : null },
        ],
    },
    'Fire Wall': {
        desc: 'Creates a wall of fire that burns enemies passing through.',
        effect: (lv) => [
            { label: 'Hits',     value: `${lv + 1}`,       next: lv < 10 ? `${lv+2}` : null },
            { label: 'Duration', value: `${5 + 5 * lv}s`,  next: lv < 10 ? `${5 + 5*(lv+1)}s` : null },
        ],
    },
    'Thunder Storm': {
        desc: 'Deals wind-element AoE magic damage in a 5x5 area.',
        effect: (lv) => [
            { label: 'MATK', value: `${100 + 40 * lv}%`, next: lv < 10 ? `${100 + 40*(lv+1)}%` : null },
        ],
    },
    'Safety Wall': {
        desc: 'Creates a shield on a cell that absorbs melee attacks.',
        effect: (lv) => [
            { label: 'Hits Blocked', value: `${lv + 1}`,   next: lv < 10 ? `${lv+2}` : null },
            { label: 'Duration',     value: `${lv * 5}s`,  next: lv < 10 ? `${(lv+1)*5}s` : null },
        ],
    },

    // ── ARCHER ───────────────────────────────────────────────────────
    "Owl's Eye": {
        desc: 'Increases DEX, improving HIT, ranged ATK, and cast times.',
        effect: (lv) => [
            { label: 'DEX +', value: `+${lv}`, next: lv < 10 ? `+${lv+1}` : null },
        ],
    },
    'Double Strafing': {
        desc: 'Fires two arrows at once dealing heavy damage.',
        effect: (lv) => [
            { label: 'ATK', value: `${180 + 20 * lv}%`, next: lv < 10 ? `${180 + 20*(lv+1)}%` : null },
        ],
    },
    'Making Arrow': {
        desc: 'Allows crafting of arrows from various materials.',
        effect: () => [],
    },
    'Charge Arrow': {
        desc: 'Fires a powerful arrow that pushes the target back.',
        effect: () => [{ label: 'ATK', value: '150%' }],
    },
    "Vulture's Eye": {
        desc: 'Increases bow range and HIT when a bow is equipped.',
        effect: (lv) => [
            { label: 'Range +',  value: `+${lv}`,  next: lv < 10 ? `+${lv+1}` : null },
            { label: 'HIT Bonus',value: `+${lv}`,  next: lv < 10 ? `+${lv+1}` : null },
        ],
    },
    'Attention Concentrate': {
        desc: 'Temporarily increases HIT and flee rate.',
        effect: (lv) => [
            { label: 'HIT +',  value: `+${4 + 2 * lv}%`, next: lv < 10 ? `+${4 + 2*(lv+1)}%` : null },
            { label: 'FLEE +', value: `+${4 + 2 * lv}%`, next: lv < 10 ? `+${4 + 2*(lv+1)}%` : null },
        ],
    },
    'Arrow Shower': {
        desc: 'Fires a volley of arrows in a 3x3 AoE.',
        effect: (lv) => [
            { label: 'ATK', value: `${150 + 10 * lv}%`, next: lv < 10 ? `${150 + 10*(lv+1)}%` : null },
        ],
    },

    // ── ACOLYTE ──────────────────────────────────────────────────────
    'Divine Protection': {
        desc: 'Increases defense against Demon and Undead enemies.',
        effect: (lv) => [
            { label: 'DEF vs Demons/Undead', value: `+${3 * lv}`, next: lv < 10 ? `+${3*(lv+1)}` : null },
        ],
    },
    'Ruwach': {
        desc: 'Reveals hidden enemies and deals holy damage to them.',
        effect: () => [],
    },
    'Heal': {
        desc: 'Restores HP to yourself or a nearby ally.',
        effect: (lv) => [
            { label: 'Base Heal', value: `${(lv * 10) + (lv * 10)}–${(lv * 10) + (lv * 12)}` },
        ],
    },
    'Aqua Benedicta': {
        desc: 'Blesses water to create Holy Water.',
        effect: () => [],
    },
    'Holy Light': {
        desc: 'Deals holy damage to a single target.',
        effect: () => [{ label: 'MATK', value: '125%' }],
    },
    'Demon Bane': {
        desc: 'Increases ATK against Demon and Undead enemies.',
        effect: (lv) => [
            { label: 'ATK vs Demons/Undead', value: `+${3 * lv}`, next: lv < 10 ? `+${3*(lv+1)}` : null },
        ],
    },
    'Teleportation': {
        desc: 'Teleports to a random location or back to your save point.',
        effect: (lv) => [
            { label: 'Lv 1', value: 'Random teleport' },
            { label: 'Lv 2', value: '+ Return to save point' },
        ],
    },
    'Warp Portal': {
        desc: 'Creates a portal to a previously visited map.',
        effect: (lv) => [
            { label: 'Saved Locations', value: `${lv}`, next: lv < 4 ? `${lv+1}` : null },
        ],
    },
    'Pneuma': {
        desc: 'Creates a barrier that blocks all ranged physical attacks.',
        effect: () => [{ label: 'Duration', value: '10s' }],
    },
    'Increase Agility': {
        desc: 'Temporarily increases AGI and movement speed.',
        effect: (lv) => [
            { label: 'AGI +', value: `+${3 + lv}`, next: lv < 10 ? `+${3+(lv+1)}` : null },
        ],
    },
    'Decrease Agility': {
        desc: 'Reduces an enemy\'s AGI and movement speed.',
        effect: (lv) => [
            { label: 'AGI −', value: `${3 + lv}`, next: lv < 10 ? `${3+(lv+1)}` : null },
        ],
    },
    'Signum Crucis': {
        desc: 'Reduces the DEF of Demon and Undead enemies in range.',
        effect: (lv) => [
            { label: 'DEF Reduction', value: `${10 + 4 * lv}%`, next: lv < 10 ? `${10 + 4*(lv+1)}%` : null },
        ],
    },
    'Angelus': {
        desc: 'Increases VIT defense for all party members.',
        effect: (lv) => [
            { label: 'Soft DEF +', value: `${5 + 5 * lv}%`, next: lv < 10 ? `${5 + 5*(lv+1)}%` : null },
        ],
    },
    'Blessing': {
        desc: 'Increases STR, DEX, and INT of a target.',
        effect: (lv) => [
            { label: 'STR / DEX / INT +', value: `+${lv}`, next: lv < 10 ? `+${lv+1}` : null },
        ],
    },
    'Cure': {
        desc: 'Removes Silence, Confusion, and Blindness from a target.',
        effect: () => [],
    },

    // ── MERCHANT ─────────────────────────────────────────────────────
    'Enlarge Weight Limit': {
        desc: 'Increases your maximum weight capacity.',
        effect: (lv) => [
            { label: 'Weight +', value: `+${200 * lv}`, next: lv < 10 ? `+${200*(lv+1)}` : null },
        ],
    },
    'Identify': {
        desc: 'Identifies unidentified items without using a magnifier.',
        effect: () => [],
    },
    'Mammonite': {
        desc: 'Throws zeny at the enemy to deal damage proportional to amount spent.',
        effect: (lv) => [
            { label: 'ATK',      value: `${100 + 100 * lv}%`, next: lv < 10 ? `${100 + 100*(lv+1)}%` : null },
            { label: 'Zeny Cost',value: `${100 * lv}z`,       next: lv < 10 ? `${100*(lv+1)}z` : null },
        ],
    },
    'Cart Revolution': {
        desc: 'Uses your cart to deal AoE damage to surrounding enemies.',
        effect: () => [{ label: 'ATK', value: '150%' }],
    },
    'Change Cart': {
        desc: 'Allows you to change the appearance of your cart.',
        effect: () => [],
    },
    'Loud Exclamation': {
        desc: 'Permanently increases STR by 4.',
        effect: () => [{ label: 'STR +', value: '+4' }],
    },
    'Cart Decoration': {
        desc: 'Decorates your cart.',
        effect: () => [],
    },
    'Discount': {
        desc: 'Reduces the purchase price of items from NPC shops.',
        effect: (lv) => [
            { label: 'Price Reduction', value: `${3 + 3 * lv}%`, next: lv < 10 ? `${3 + 3*(lv+1)}%` : null },
        ],
    },
    'Overcharge': {
        desc: 'Increases the sell price of items to NPC shops.',
        effect: (lv) => [
            { label: 'Sell Bonus', value: `${5 + 2 * lv}%`, next: lv < 10 ? `${5 + 2*(lv+1)}%` : null },
        ],
    },
    'Pushcart': {
        desc: 'Allows you to use a cart for carrying extra items.',
        effect: (lv) => [
            { label: 'Cart Capacity', value: `${3000 + 500 * lv}`, next: lv < 10 ? `${3000 + 500*(lv+1)}` : null },
        ],
    },
    'Vending': {
        desc: 'Opens a shop to sell items to other players.',
        effect: (lv) => [
            { label: 'Item Slots', value: `${2 + lv}`, next: lv < 10 ? `${2+(lv+1)}` : null },
        ],
    },
    'Buying Store': {
        desc: 'Opens a shop to buy items from other players.',
        effect: () => [{ label: 'Item Slots', value: '5' }],
    },

    // ── THIEF ────────────────────────────────────────────────────────
    'Double Attack': {
        desc: 'Gives a chance to attack twice when equipped with a dagger.',
        effect: (lv) => [
            { label: 'Trigger Chance', value: `${5 * lv}%`, next: lv < 10 ? `${5*(lv+1)}%` : null },
        ],
    },
    'Increase Dodge': {
        desc: 'Permanently increases FLEE.',
        effect: (lv) => [
            { label: 'FLEE +', value: `+${3 * lv}`, next: lv < 10 ? `+${3*(lv+1)}` : null },
        ],
    },
    'Steal': {
        desc: 'Attempts to steal an item from a monster.',
        effect: (lv) => [
            { label: 'Success Rate', value: `${10 + 6 * lv}%`, next: lv < 10 ? `${10 + 6*(lv+1)}%` : null },
        ],
    },
    'Envenom': {
        desc: 'Deals poison-element damage and attempts to poison the target.',
        effect: (lv) => [
            { label: 'ATK',          value: `+${15 * lv}`,     next: lv < 10 ? `+${15*(lv+1)}` : null },
            { label: 'Poison Chance',value: `${5 + 4 * lv}%`,  next: lv < 10 ? `${5 + 4*(lv+1)}%` : null },
        ],
    },
    'Sprinkle Sand': {
        desc: 'Throws sand at an enemy reducing its HIT.',
        effect: () => [{ label: 'HIT Reduction', value: '−10' }],
    },
    'Back Sliding': {
        desc: 'Instantly moves the character back 5 cells.',
        effect: () => [],
    },
    'Pick Stone': {
        desc: 'Picks up a stone from the ground.',
        effect: () => [],
    },
    'Throw Stone': {
        desc: 'Throws a stone at an enemy, dealing minor damage.',
        effect: () => [{ label: 'Damage', value: '50' }],
    },
    'Hiding': {
        desc: 'Conceals the character from enemies.',
        effect: (lv) => [
            { label: 'Duration', value: `${30 + 30 * lv}s`, next: lv < 10 ? `${30 + 30*(lv+1)}s` : null },
        ],
    },
    'Detoxify': {
        desc: 'Removes poison from yourself or a nearby ally.',
        effect: () => [],
    },
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
   
    'Double Attack':{
        condition: (char) => char.weaponKey === 'dagger',
        bonus: (level) => ({hit: 1 * level}),
    }


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
// SKILL POPUP
// ===================================================================

let _popupTimeout = null;

function showSkillPopup(skillName, anchorEl, isLocked = false) {
    
    closeSkillPopup(false); // close instantly, no fade

    const desc  = SKILL_DESCRIPTIONS[skillName];
    const icon  = SKILL_ICONS[skillName];
    const maxHP = (typeof calculateCombatStats === 'function')
        ? calculateCombatStats(character).maxHP : 0;
    const maxSP = (typeof calculateCombatStats === 'function')
        ? calculateCombatStats(character).maxSP : 0;

    // Current level
    let curLv = 0;
    if (activeSkillData) {
        const found = activeSkillData.unlocked.find(s => s.name === skillName)
                   ?? activeSkillData.locked.find(s => s.name === skillName);
        curLv = found?.cur ?? 0;
    }

    // Effect rows 
    let effectHTML = '';
    if (desc?.effect) {
        const rows = desc.effect(curLv, character, maxHP, maxSP);
        if (rows.length > 0) {
            effectHTML = `<div class="sp-effects">` + rows.map(r => {
                const nextSpan = (r.next != null && r.next !== r.value)
                    ? ` <span class="sp-next">(→ ${r.next})</span>` : '';

                // Locked rows (not yet reached) render dimmed
                const rowClass = r.locked ? ' sp-effect-row-locked' : '';

                return `<div class="sp-effect-row${rowClass}">
                    <span class="sp-effect-label">${r.label}</span>
                    <span class="sp-effect-value">${r.value}${nextSpan}</span>
                </div>`;
            }).join('') + `</div>`;
        }
    }

    const iconHTML = icon
        ? `<img src="${icon}" class="sp-icon" alt="${skillName}" onerror="this.style.display='none'">`
        : `<div class="sp-icon sp-icon-placeholder"></div>`;

    // ── Overlay ───────────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id        = 'skill-popup-overlay';
    overlay.className = 'skill-popup-overlay';
    overlay.addEventListener('click', () => closeSkillPopup(true));

    // ── Popup card ────────────────────────────────────────────────────
    const popup = document.createElement('div');
    popup.id        = 'skill-popup';
    popup.className = 'skill-popup';
    // Stop clicks inside the card from closing the overlay
    popup.addEventListener('click', e => e.stopPropagation());

    popup.innerHTML = `
    <div class="sp-header">
        ${iconHTML}
        <div class="sp-title-block">
            <div class="sp-name">${skillName}</div>
            ${curLv > 0 ? `<div class="sp-level">Level ${curLv}</div>` : ''}
        </div>
        <button class="sp-close" onclick="closeSkillPopup(true)">✕</button>
    </div>
    <div class="sp-divider"></div>
    <div class="sp-body">
        ${desc?.desc ? `<p class="sp-desc">${desc.desc}</p>` : ''}
        ${effectHTML}
        ${!effectHTML && !desc?.desc
            ? `<p class="sp-desc sp-no-effect">No additional effects.</p>`
            : ''}
    </div>
`;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Trigger enter animation on next frame
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
        // Add fade-out class then remove after transition
        overlay?.classList.add('sp-hiding');
        popup?.classList.add('sp-hiding');
        setTimeout(() => {
            overlay?.remove();
            popup?.remove();
        }, 200); // matches CSS transition duration
    } else {
        overlay?.remove();
        popup?.remove();
    }
}

// ===================================================================
// RENDER BOTH TABLES  (updated — skill names are clickable)
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
        // Escaped name for inline onclick
        const eName   = skillName => skillName.replace(/'/g, "\\'");
        uHTML += `
        <tr data-skill-idx="${idx}">
            <td><div class="skill-icon-wrap">${getSkillIcon(s.name)}</div></td>
            <td><span class="skill-name-link" onclick="showSkillPopup('${eName(s.name)}', this)">${s.name}</span></td>
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
            const eName = s.name.replace(/'/g, "\\'");
            lHTML += `
            <tr>
                <td><div class="skill-icon-wrap">${getSkillIcon(s.name)}</div></td>
                <td><span class="skill-name-link" onclick="showSkillPopup('${eName}', this, true)">${s.name}</span></td>
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