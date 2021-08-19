// Global variables.
const meals = document.getElementById("meals");
favoriteContainer = document.getElementById("fav-meals");

// Call all functions.
getRandomMeal();
fetchFavMeals();

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
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();

  const meal = respData.meals[0];

  return meal;
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
    if (btn.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealsToLS(mealData.idMeal);
      btn.classList.add("active");
      location.reload();
    }
  });

  // Append to the parent node

  meals.appendChild(meal);
}

// Add Meals to Favorites.

// Store in local storage.
function addMealsToLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

// Remove meals from local storage.
function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

// Retrieve from local storage.
function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

// Fetch the favorite Meals
async function fetchFavMeals() {
  // Clean the Container.
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsFromLS();
  // Get the favorite meal by their id

  // Get the ids
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    meal = await getMealById(mealId);
    addFavMeal(meal);
  }
}

  // Add favorite meal function
function addFavMeal(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `<img src="${mealData.strMealThumb}" alt="${mealData.strCategory}"/> <br>
    <span>${mealData.strMeal}</span> <button class="clear"><i class="far fa-times-circle"></i></button>`;

    const btn = favMeal.querySelector('.clear');
    const btnRemove = document.querySelector(".meal-body .fav-btn");

    btn.addEventListener('click', () => {
      removeMealFromLS(mealData.idMeal);
      btnRemove.classList.remove("active");
      fetchFavMeals();
    });

    favoriteContainer.appendChild(favMeal);
}
