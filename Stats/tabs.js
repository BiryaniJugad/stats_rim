function switchTab(evt, tabId) {
    // Hide all tab panes
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));

    // Deactivate all tab buttons
    const buttons = document.querySelectorAll('.tab-item');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show current tab and activate button
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}



function toggleMenu() {
document.getElementById('jobDropdown').classList.toggle('active');
}

function selectJob(jobName) {
// Update the display text
document.getElementById('current-job').innerText = jobName;

// Close the menu
document.getElementById('jobDropdown').classList.remove('active');

// Trigger your update function
if (typeof updateJob === "function") {
    updateJob(jobName);
}
}


    // 1. Toggle the visibility of the dropdown menu
    function toggleWeaponMenu() {
        const dropdown = document.getElementById('weaponDropdown');
        dropdown.classList.toggle('active');
    }

    // 2. Handle selecting a weapon
    function selectWeapon(weaponName) {
        // Update the displayed text
        document.getElementById('current-weapon').innerText = weaponName;
        
        // Close the menu after selection
        const dropdown = document.getElementById('weaponDropdown');
        dropdown.classList.remove('active');
        
        // Logic for what happens when a weapon is chosen
        console.log("Equipped:", weaponName);
    }

    // 3. Close the dropdown if the user clicks anywhere else on the screen
    window.onclick = function(event) {
        if (!event.target.closest('.weapon-dropdown')) {
            const dropdown = document.getElementById('weaponDropdown');
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        }
    }


// Close dropdown if user clicks elsewhere on the screen
window.onclick = function(event) {
if (!event.target.closest('#jobDropdown')) {
    document.getElementById('jobDropdown').classList.remove('active');
}
}

        function selectJob(jobName, fileName) {
// 1. Update the Dropdown UI text
document.getElementById('current-job').innerText = jobName;

// 2. Update the Character Name (H2) - Converting to Uppercase like your design
document.getElementById('character-title').innerText = jobName.toUpperCase();

// 3. Update the Character Image
const imgElement = document.getElementById('character-img');
imgElement.src = "../images/" + fileName;

// 4. Close the dropdown menu
document.getElementById('jobDropdown').classList.remove('active');

// Optional: Call your stat calculation function if you have one
if (typeof updateJobStats === "function") {
    updateJobStats(jobName);
}
}