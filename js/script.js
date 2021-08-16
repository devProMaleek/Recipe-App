getRandomMeal()

// Random meal function
async function getRandomMeal() {
    const randomMeal = await fetch("www.themealdb.com/api/json/v1/1/random.php")
    console.log(randomMeal)
} 

// Get meal by id function.
async function getMealById(id) {
    const meal = await fetch("www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
}

// Meal by search function
async function getMealsBySearch(term) {
    const meals = await fetch("www.themealdb.com/api/json/v1/1/search.php?s=" + term)
}