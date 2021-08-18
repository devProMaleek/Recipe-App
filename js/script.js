// Global variables.
const meals = document.getElementById("meals");

getRandomMeal();

// Random meal function
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

// Get meal by id function.
async function getMealById(id) {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
}

// Meal by search function
async function getMealsBySearch(term) {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
}

// Add meal data function.

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = ` <div class="meal-header">
    <img src="${mealData.strMealThumb}" alt="${mealData.strCategory}">
</div>
<div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn"><i class="fas fa-heart"></i></button>
</div>`;

const btn = meal.querySelector(".meal-body .fav-btn");
btn.addEventListener("click", () => {
    btn.classList.toggle("active")
})

// Append to the parent node

meals.appendChild(meal);
}

// Add Meals to Favorites.

// Store in local storage.
function addMealsToLS() {
    const mealIds = getMealFromLS();
    mealId_serialized = JSON.stringify([...mealIds, mealId])
    localStorage.setItem('mealIds', mealId_serialized);
}

// Retrieve from local storage.
function getMealsFromLS() {
  const mealIds = localStorage.getItem('mealIds');

  mealId_deserialized = JSON.parse(mealIds);

  return mealId_deserialized;

}
