const intakeList = [];

function addFood() {
    const foodInput = document.getElementById("food");
    const caloriesInput = document.getElementById("calories");
    const food = foodInput.value;
    const calories = parseInt(caloriesInput.value);

    if (food !== "" && !isNaN(calories)) {
        const intake = { food: food, calories: calories };
        intakeList.push(intake);
        foodInput.value = "";
        caloriesInput.value = "";
        updateIntakeList();
        updateTotalCalories();
    }
}

function updateIntakeList() {
    const intakeDiv = document.getElementById("intake");
    intakeDiv.innerHTML = "";
    intakeList.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.food}: ${item.calories} calories`;
        intakeDiv.appendChild(p);
    });
}

function updateTotalCalories() {
    const resultSpan = document.getElementById("result");
    const totalCalories = intakeList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.calories,
        0
    );
    resultSpan.textContent = totalCalories;
}