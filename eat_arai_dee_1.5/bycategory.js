const categorySelector = document.getElementById("categorySelector");
const mealDetails = document.getElementById("mealDetails");

function displayMealDescription(mealId) {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => {
            const meal = response.data.meals[0];
            
            alert(meal.strInstructions); 
        })
        .catch(error => console.error(error));
}

axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => {
        const categories = response.data.categories;
        categories.forEach(category => {
            const option = document.createElement("option");
            option.text = category.strCategory;
            option.value = category.strCategory;
            categorySelector.add(option);
        });
    })
    .catch(error => console.error(error));

categorySelector.addEventListener('change', function() {
    const selectedCategory = categorySelector.value;

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then(response => {
            const meals = response.data.meals;
            mealDetails.innerHTML = ""; 
            meals.forEach(meal => {
                const mealItem = document.createElement("div");
                mealItem.classList.add('meal-item'); 

                const mealImage = document.createElement("img");
                mealImage.src = meal.strMealThumb;
                mealImage.alt = meal.strMeal;
                mealImage.classList.add('meal-image'); 
                mealItem.appendChild(mealImage);

                const mealLink = document.createElement("a");
                mealLink.href = "#";
                mealLink.textContent = meal.strMeal;
                mealLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    displayMealDescription(meal.idMeal);
                });
                mealItem.appendChild(mealLink);
                mealDetails.appendChild(mealItem);
            });
        })
        .catch(error => console.error(error));
});
