let currentStep = 1;

let userData = {
    age: null,
    height: null,
    weight: null,
    gender: null,
    bodyShape: null,
    shapeAdjustment: 0
};

// GOLD COLORS
const FILL = "rgba(212,175,55,0.25)";
const STROKE = "#d4af37";
const HEAD = "#d4af37";

/* ------------ TOAST SYSTEM (same as Auth) ------------ */
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

/* ------------ BODY SHAPES ------------ */
const maleShapes = [
    { name: "Rectangle", value: "rectangle", adjustment: 0, icon: `
<svg viewBox="0 0 100 150">
    <rect x="30" y="20" width="40" height="80" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Triangle (Pear)", value: "triangle", adjustment: -1, icon: `
<svg viewBox="0 0 100 150">
    <path d="M30,20 L50,100 L70,20 Z" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Inverted Triangle", value: "inverted-triangle", adjustment: 1, icon: `
<svg viewBox="0 0 100 150">
    <path d="M25,20 L75,20 L50,100 Z" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Oval (Round)", value: "oval", adjustment: 2, icon: `
<svg viewBox="0 0 100 150">
    <ellipse cx="50" cy="60" rx="25" ry="40" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Trapezoid", value: "trapezoid", adjustment: 0, icon: `
<svg viewBox="0 0 100 150">
    <path d="M35,20 L65,20 L70,100 L30,100 Z" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` }
];

const femaleShapes = [
    { name: "Hourglass", value: "hourglass", adjustment: 0, icon: `
<svg viewBox="0 0 100 150">
    <path d="M30,20 Q50,60 30,100 M70,20 Q50,60 70,100" fill="none" stroke="${STROKE}" stroke-width="3"/>
    <path d="M30,20 L70,20 M30,100 L70,100" stroke="${STROKE}" stroke-width="3"/>
    <path d="M30,20 Q50,60 30,100 L70,100 Q50,60 70,20 Z" fill="${FILL}"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Triangle", value: "triangle", adjustment: 1, icon: `
<svg viewBox="0 0 100 150">
    <path d="M40,20 L60,20 L75,100 L25,100 Z" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Inverted Triangle", value: "inverted-triangle", adjustment: 0, icon: `
<svg viewBox="0 0 100 150">
    <path d="M25,20 L75,20 L60,100 L40,100 Z" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Rectangle", value: "rectangle", adjustment: 0, icon: `
<svg viewBox="0 0 100 150">
    <rect x="35" y="20" width="30" height="80" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` },

    { name: "Round", value: "round", adjustment: 2, icon: `
<svg viewBox="0 0 100 150">
    <ellipse cx="50" cy="60" rx="28" ry="40" fill="${FILL}" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="50" cy="10" r="8" fill="${HEAD}"/>
</svg>` }
];

/* ------------ PROGRESS SYSTEM ------------ */
function updateProgress() {
    const progress = (currentStep / 4) * 100;
    document.getElementById("progressFill").style.width = progress + "%";
}

function nextStep(step) {
    if (step === 1) {
        const age = document.getElementById("age").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;

        if (!age || !height || !weight)
            return showToast("Please fill in all fields");

        userData.age = parseInt(age);
        userData.height = parseInt(height);
        userData.weight = parseInt(weight);

        showStep(2);
    }
}

function prevStep(step) {
    showStep(step - 1);
}

function showStep(step) {
    document.querySelectorAll(".form-section").forEach(s =>
        s.classList.remove("active")
    );

    document.getElementById("step" + step).classList.add("active");
    currentStep = step;
    updateProgress();

    document.querySelector(".container").scrollTop = 0;
}

/* ------------ GENDER ------------ */
function selectGender(gender, element) {
    userData.gender = gender;
    document.getElementById("gender").value = gender;

    document.querySelectorAll(".gender-card").forEach(c =>
        c.classList.remove("selected")
    );

    element.classList.add("selected");

    loadBodyShapes(gender);
    setTimeout(() => showStep(3), 200);
}

/* ------------ SHAPES ------------ */
function loadBodyShapes(gender) {
    const shapes = gender === "male" ? maleShapes : femaleShapes;
    renderShapeOptions(shapes);
}

function renderShapeOptions(shapes) {
    const container = document.getElementById("shapeOptionsList");
    container.innerHTML = "";

    shapes.forEach(shape => {
        const card = document.createElement("div");
        card.className = "shape-option-card";

        card.onclick = () =>
            selectBodyShape(shape.value, shape.adjustment, card);

        card.innerHTML = `
            <div class="shape-icon">${shape.icon}</div>
            <div class="shape-name">${shape.name}</div>
        `;

        container.appendChild(card);
    });
}

function selectBodyShape(shape, adjustment, card) {
    userData.bodyShape = shape;
    userData.shapeAdjustment = adjustment;
    document.getElementById("bodyShape").value = shape;

    document.querySelectorAll(".shape-option-card").forEach(c =>
        c.classList.remove("selected")
    );

    card.classList.add("selected");
}

/* ------------ SIZE CALCULATION ------------ */
function calculateSize() {
    if (!userData.bodyShape)
        return showToast("Please select your body shape");

    const h = userData.height / 100;
    const bmi = userData.weight / (h * h);

    let baseSize, bmiCategory;

    if (bmi < 18.5) { baseSize = 0; bmiCategory = "Underweight"; }
    else if (bmi < 22) { baseSize = 1; bmiCategory = "Normal"; }
    else if (bmi < 25) { baseSize = 2; bmiCategory = "Average"; }
    else if (bmi < 28) { baseSize = 3; bmiCategory = "Overweight"; }
    else if (bmi < 32) { baseSize = 4; bmiCategory = "XL Range"; }
    else { baseSize = 5; bmiCategory = "XXL Range"; }

    const index = Math.max(0, Math.min(5, baseSize + userData.shapeAdjustment));
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    displayResult(sizes[index], bmi, bmiCategory);
}

function displayResult(size, bmi, bmiCategory) {
    document.getElementById("sizeResult").textContent = size;

    document.getElementById("resultExplanation").innerHTML =
        `Your BMI is <b>${bmi.toFixed(1)}</b> 
         (${bmiCategory}). Body shape adjustment: 
         <b>${userData.shapeAdjustment}</b>.`;

    showStep(4);
}

/* ------------ RESTART ------------ */
function restartQuiz() {
    userData = {
        age: null, height: null, weight: null,
        gender: null, bodyShape: null, shapeAdjustment: 0
    };

    document.getElementById("sizeForm").reset();
    document.querySelectorAll(".selected").forEach(s => s.classList.remove("selected"));
    document.getElementById("shapeOptionsList").innerHTML = "";

    showStep(1);
}

/* INIT */
document.addEventListener("DOMContentLoaded", updateProgress);
