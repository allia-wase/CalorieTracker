const API_KEY = 'your_nutritionix_api_key';
const APP_ID = 'your_nutritionix_app_id';
const BASE_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

document.getElementById('search-food').addEventListener('click', async () => {
    const query = document.getElementById('food-input').value;

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': APP_ID,
                'x-app-key': API_KEY
            },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        displayFoodResults(data.foods);
    } catch (error) {
        console.error('Error fetching food data:', error);
    }
});

function displayFoodResults(foods) {
    const container = document.getElementById('food-results');
    container.innerHTML = ''; // Clear previous results

    foods.forEach(food => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${food.food_name}</h3>
            <p>Calories: ${food.nf_calories}</p>
            <p>Protein: ${food.nf_protein}g</p>
            <p>Carbs: ${food.nf_total_carbohydrate}g</p>
            <p>Fat: ${food.nf_total_fat}g</p>
            <button onclick="logMeal(${food.nf_calories})">Log Meal</button>
        `;
        container.appendChild(div);
    });
}

let totalCalories = 0;
function logMeal(calories) {
    totalCalories += calories;
    updateCalorieDisplay();
}

function updateCalorieDisplay() {
    document.getElementById('total-calories').textContent = totalCalories;
}
