// API Configuration
const API = {
    randomMeal: 'https://www.themealdb.com/api/json/v1/1/random.php'
};

// Function to Get a Random Meal
async function getMealRandom() {
    try {
        const { data } = await axios.get(API.randomMeal);
        const cleanMeal = {
            ingredients: [],
            measurements: []
        };

        data.meals.forEach((e) => {
            for (let [key, value] of Object.entries(e)) {
                if (key.indexOf('strIngredient') !== -1) {
                    if (value !== null && value !== '') cleanMeal.ingredients.push(value);
                } else if (key.indexOf('strMeasure') !== -1) {
                    if (value !== null && value !== '' && value !== ' ') cleanMeal.measurements.push(value);
                } else if (value !== null && value !== '') cleanMeal[key] = value;
            }
        });

        return cleanMeal;
    } catch (error) {
        throw new Error('Failed to fetch a random meal.');
    }
}

// Function to Display Random Meal
async function displayRandomMeal() {
    try {
        const randomMeal = await getMealRandom();
        const mealDetailsDiv = document.getElementById('mealDetails');
        mealDetailsDiv.innerHTML = `
            <div class="meal-details">
                <h3>${randomMeal.strMeal}</h3>
                <p><strong>Category:</strong> ${randomMeal.strCategory}</p>
                <p><strong>Area:</strong> ${randomMeal.strArea}</p>
                <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}" style="max-width: 300px;">
                <h4>Ingredients</h4>
                <ul class="ingredients-list">
                    ${randomMeal.ingredients.map((ingredient, index) => `<li>${ingredient} - ${randomMeal.measurements[index]}</li>`).join('')}
                </ul>
                <p><strong>Instructions:</strong> ${randomMeal.strInstructions}</p>
            </div>
        `;
    } catch (error) {
        const mealDetailsDiv = document.getElementById('mealDetails');
        mealDetailsDiv.innerHTML = 'Failed to fetch a random meal.';
    }
}

// Event Listener for the Button Click
document.addEventListener('DOMContentLoaded', function() {
    const randomMealButton = document.getElementById('randomMealButton');
    randomMealButton.addEventListener('click', displayRandomMeal);
});
