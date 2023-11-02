document.addEventListener('DOMContentLoaded', function() {
    loadAllMeals();
});

async function loadAllMeals() {
    try {
        const mealsData = await fetchAllMeals();

        const menuContent = document.getElementById('menuContent');
        menuContent.innerHTML = '';

        mealsData.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal');

            const mealImage = document.createElement('img');
            mealImage.src = meal.strMealThumb;
            mealImage.alt = meal.strMeal;

            const mealName = document.createElement('p');
            mealName.textContent = meal.strMeal;

            mealDiv.appendChild(mealImage);
            mealDiv.appendChild(mealName);
            menuContent.appendChild(mealDiv);
        });
    } catch (error) {
        console.log('Failed to load all meals:', error);
    }
}

async function fetchAllMeals() {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        return response.data.meals;
    } catch (error) {
        throw new Error('Failed to fetch all meals.');
    }
}
