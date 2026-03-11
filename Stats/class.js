const jobSelect = document.getElementById("jobSelect");
const currentJob = document.getElementById("currentJob");

jobSelect.addEventListener("change", function () {
    currentJob.textContent = jobSelect.value;
});