
    const SVG_ADD = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
    const SVG_MINUS = `<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

    const JOB_SKILLS = {
        'Novice':    { label: 'Novice',    pts: 49, unlocked: [ { name: 'Basic Skill', cur: 0, max: 9,  type: 'quest' }, { name: 'First Aid',  cur: 1, max: 1, type: 'quest' }, { name: 'Trick Dead', cur: 1, max: 1, type: 'quest' } ], locked: [] },
        'Swordsman': { label: 'Swordsman', pts: 49, unlocked: [ { name: 'Sword Mastery', cur: 0, max: 10, type: 'active' }, { name: 'Increase Recuperative Power', cur: 0, max: 10, type: 'active' }, { name: 'Bash', cur: 0, max: 10, type: 'active' }, { name: 'Provoke', cur: 0, max: 10, type: 'active' }, { name: 'Moving HP Recovery', cur: 1, max: 1, type: 'quest' }, { name: 'Fatal Blow', cur: 1, max: 1, type: 'quest' }, { name: 'Auto Berserk', cur: 1, max: 1, type: 'quest' } ], locked: [ { name: 'Two-Handed Sword Mastery', max: 10, req: 'Sword Mastery Lv 1' }, { name: 'Magnum Break', max: 10, req: 'Bash Lv 5' }, { name: 'Endure', max: 10, req: 'Provoke Lv 5' } ] },
        'Magician':  { label: 'Magician',  pts: 49, unlocked: [ { name: 'Increase Spiritual Power', cur: 0, max: 10, type: 'active' }, { name: 'Sight', cur: 0, max: 1, type: 'active' }, { name: 'Napalm Beat', cur: 0, max: 10, type: 'active' }, { name: 'Cold Bolt', cur: 0, max: 10, type: 'active' }, { name: 'Stone Curse', cur: 0, max: 10, type: 'active' }, { name: 'Fire Bolt', cur: 0, max: 10, type: 'active' }, { name: 'Lightning Bolt', cur: 0, max: 10, type: 'active' }, { name: 'Energy Coat', cur: 1, max: 1, type: 'quest' } ], locked: [ { name: 'Safety Wall', max: 10, req: 'Napalm Beat Lv 7, Soul Strike Lv 5' }, { name: 'Soul Strike', max: 10, req: 'Napalm Beat Lv 4' }, { name: 'Frost Diver', max: 10, req: 'Cold Bolt Lv 5' }, { name: 'Fire Ball', max: 10, req: 'Fire Bolt Lv 4' }, { name: 'Fire Wall', max: 10, req: 'Sight Lv 1, Fire Ball Lv 5' }, { name: 'Thunder Storm', max: 10, req: 'Lightning Bolt Lv 4' } ] },
        'Archer':    { label: 'Archer',    pts: 49, unlocked: [ { name: "Owl's Eye", cur: 0, max: 10, type: 'active' }, { name: 'Double Strafing', cur: 0, max: 10, type: 'active' }, { name: 'Making Arrow', cur: 1, max: 1, type: 'quest' }, { name: 'Charge Arrow', cur: 1, max: 1, type: 'quest' } ], locked: [ { name: "Vulture's Eye", max: 10, req: "Owl's Eye Lv 3" }, { name: 'Attention Concentrate', max: 10, req: "Vulture's Eye Lv 1" }, { name: 'Arrow Shower', max: 10, req: 'Double Strafing Lv 5' } ] },
        'Acolyte':   { label: 'Acolyte',   pts: 49, unlocked: [ { name: 'Divine Protection', cur: 0, max: 10, type: 'active' }, { name: 'Ruwach', cur: 0, max: 1, type: 'active' }, { name: 'Heal', cur: 0, max: 10, type: 'active' }, { name: 'Aqua Benedicta', cur: 0, max: 1, type: 'active' }, { name: 'Holy Light', cur: 1, max: 1, type: 'quest' } ], locked: [ { name: 'Demon Bane', max: 10, req: 'Divine Protection Lv 3' }, { name: 'Pneuma', max: 1, req: 'Warp Portal Lv 4' }, { name: 'Teleportation', max: 2, req: 'Ruwach Lv 1' }, { name: 'Warp Portal', max: 4, req: 'Teleportation Lv 2' }, { name: 'Increase Agility', max: 10, req: 'Heal Lv 3' }, { name: 'Decrease Agility', max: 10, req: 'Increase Agility Lv 1' }, { name: 'Signum Crucis', max: 10, req: 'Demon Bane Lv 3' }, { name: 'Angelus', max: 10, req: 'Divine Protection Lv 3' }, { name: 'Blessing', max: 10, req: 'Divine Protection Lv 5' }, { name: 'Cure', max: 1, req: 'Heal Lv 2' } ] },
        'Merchant':  { label: 'Merchant',  pts: 49, unlocked: [ { name: 'Enlarge Weight Limit', cur: 0, max: 10, type: 'active' }, { name: 'Identify', cur: 0, max: 1, type: 'active' }, { name: 'Mammonite', cur: 0, max: 10, type: 'active' }, { name: 'Cart Revolution', cur: 1, max: 1, type: 'quest' }, { name: 'Change Cart', cur: 1, max: 1, type: 'quest' }, { name: 'Loud Exclamation', cur: 1, max: 1, type: 'quest' }, { name: 'Cart Decoration', cur: 1, max: 1, type: 'quest' } ], locked: [ { name: 'Discount', max: 10, req: 'Enlarge Weight Limit Lv 3' }, { name: 'Overcharge', max: 10, req: 'Discount Lv 3' }, { name: 'Pushcart', max: 10, req: 'Enlarge Weight Limit Lv 5' }, { name: 'Vending', max: 10, req: 'Pushcart Lv 3' }, { name: 'Buying Store', max: 1, req: 'Vending Lv 1' } ] },
        'Thief':     { label: 'Thief',     pts: 49, unlocked: [ { name: 'Double Attack', cur: 0, max: 10, type: 'active' }, { name: 'Increase Dodge', cur: 0, max: 10, type: 'active' }, { name: 'Steal', cur: 0, max: 10, type: 'active' }, { name: 'Envenom', cur: 0, max: 10, type: 'active' }, { name: 'Sprinkle Sand', cur: 1, max: 1, type: 'quest' }, { name: 'Back Sliding', cur: 1, max: 1, type: 'quest' }, { name: 'Pick Stone', cur: 1, max: 1, type: 'quest' }, { name: 'Throw Stone', cur: 1, max: 1, type: 'quest' } ], locked: [ { name: 'Hiding', max: 10, req: 'Steal Lv 5' }, { name: 'Detoxify', max: 1, req: 'Envenom Lv 3' } ] }
    };

    let activeSkillData = null;

    function updateFooter() {
        const used = activeSkillData.unlocked.reduce((sum, s) => sum + (s.type !== 'quest' ? s.cur : 0), 0);
        document.getElementById('skill-pts-used').textContent = used;
        document.getElementById('skill-pts-left').textContent = activeSkillData.pts - used;
    }

    function adjustSkill(idx, delta) {
        const s = activeSkillData.unlocked[idx];
        if (s.type === 'quest') return;
        const used = activeSkillData.unlocked.reduce((sum, sk) => sum + (sk.type !== 'quest' ? sk.cur : 0), 0);
        const left = activeSkillData.pts - used;
        if (delta > 0 && (s.cur >= s.max || left <= 0)) return;
        if (delta < 0 && s.cur <= 0) return;
        s.cur += delta;
        const badge = document.querySelector(`[data-skill-idx="${idx}"] .skill-level-badge`);
        if (badge) badge.textContent = `${s.cur} / ${s.max}`;
        updateFooter();
    }

    function renderSkills(jobName) {
        const raw = JOB_SKILLS[jobName];
        if (!raw) return;
        activeSkillData = JSON.parse(JSON.stringify(raw));
        const label = activeSkillData.label;
        const unlockedBody = document.getElementById('skills-unlocked-body');
        const lockedBody   = document.getElementById('skills-locked-body');

        /* UNLOCKED — 4 columns: Icon | Skill Name | [−] Cur/Max [+] | Type */
        let uHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills Below ~</td></tr>`;
        activeSkillData.unlocked.forEach((s, idx) => {
            const isQuest = s.type === 'quest';
            const typeTag = isQuest
                ? `<span class="skill-tag quest">Quest</span>`
                : `<span class="skill-tag active">Active</span>`;

            const minBtn = `<button class="skill-adj-btn minus" ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx}, -1)"`}>${SVG_MINUS}</button>`;
            const addBtn = `<button class="skill-adj-btn add"   ${isQuest ? 'disabled' : `onclick="adjustSkill(${idx},  1)"`}>${SVG_ADD}</button>`;

            uHTML += `<tr data-skill-idx="${idx}">
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
        updateFooter();

        /* LOCKED */
        let lHTML = `<tr><td colspan="4" class="skills-sub-label">~ ${label} Skills Below ~</td></tr>`;
        if (activeSkillData.locked.length === 0) {
            lHTML += `<tr><td colspan="4" class="skills-sub-label" style="padding:10px 0;">—</td></tr>`;
        } else {
            activeSkillData.locked.forEach(s => {
                lHTML += `<tr>
                    <td><div class="skill-icon"></div></td>
                    <td><span class="skill-name-link">${s.name}</span></td>
                    <td><span class="skill-level-badge">${s.max}</span></td>
                    <td><span class="skill-req">${s.req}</span></td>
                </tr>`;
            });
        }
        lockedBody.innerHTML = lHTML;
    }

    function selectJobBtn(btn) {
        document.querySelectorAll('.job-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSkills(btn.title);
    }

    document.addEventListener('DOMContentLoaded', () => renderSkills('Novice'));