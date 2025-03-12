
// global base URL
const baseURL = "https://api.spoonacular.com/recipes/random/?apiKey=f22e66767aca4bdda6a1d293d962b29e&number=1"

const recipesContainer = document.getElementById("recipes-container")

const loadRecipes = (recipeArray) => {
  recipesContainer.innerHTML = "" // Clearing container of recipes before adding new recipes.




  //Creating a function w. conditional statements to fetch diets since in API they are booleans and not arrays
  const getDietInfo = (recipe) => {
    if (recipe.vegan) return "Vegan"
    else if (recipe.vegetarian) return "Vegetarian"
    return "Non-veg"
  }

  //Looping through the recipes 
  recipeArray.forEach(recipe => {

    // Creating a function with a conditional statement to check if ingredients exist.  
    // Use length to see if there are more than 0
    // If true, use .map that creates a list, and .join formats it as a string.  
    // If no ingredients exist, a fallback message appears.  

    let ingredientList = ""
    if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
      ingredientList = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join("")

    }
    else {
      ingredientList = "<li>No ingredients listed</li>"
    }

    recipesContainer.innerHTML += `
      <div class="recipe-item">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h2>${recipe.title}</h2>

        <hr>

        <h3>Diet:</h3> <p> ${getDietInfo(recipe)}</p>
        <h3>Time:</h3> <p>${recipe.readyInMinutes} minutes</p>
        <hr>
        
        <h3>Ingredients:</h3>
        <ul class="ingredient-list"> ${ingredientList}
        </ul> 
      </div>
    `
  })
}

const fetchRecipe = () => {
  fetch(baseURL)
    .then((response) => {
      if (response.status === 402) {
        recipesContainer.innerHTML = `
          <div class="quota-error">
            <h3>API daily quota exceeded</h3>
            <p>Sorry, we've reached our daily limit for recipe requests. Please try again tomorrow.</p>
          </div>
        `
        throw new Error('API quota exceeded')
      }
      return response.json()
    })
    .then((data) => {
      console.log("fetched data", data)
      loadRecipes(data.recipes)
    })
    .catch(error => console.log("error fetching recipes", error))
}
fetchRecipe()

/*const fetchRecipe = () => {

  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log("fetched data", data)
      loadRecipes(data.recipes) //calling my function to show fetched recipes on my webpage

    })
    .catch(error => console.log("error fetching recipes", error))

}
fetchRecipe()*/

//Adding this copy of baseURL
let updatedURL = baseURL

const filterDiets = () => {
  const filterValue = document.querySelector('input[name="diet"]:checked').value
  console.log("diet", filterValue)

  if (filterValue === "all") {
    // For "All" - just fetch random recipes without diet tags
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched data", data);
        loadRecipes(data.recipes);
      })
      .catch(error => console.log("error fetching recipes", error));
  } else {
    // For specific diets - add the diet tag
    let updatedURL = baseURL + `&tags=${filterValue}`;
    fetch(updatedURL)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched data", data);
        loadRecipes(data.recipes);
      })
      .catch(error => console.log("error fetching recipes", error));
  }
}


//Adding an action to each diet filter radio button to trigger filtering.
document.querySelectorAll(`input[name = "diet"]`).forEach(radio => {
  radio.addEventListener(`change`, filterDiets)
})



const sortTime = () => {
  const sortValue = document.querySelector(`input[name="time"]:checked`).value
  console.log("time", sortValue)


  if (sortValue === "descending") {
    // For descending order (longest to shortest)
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        const timeSortedRecipes = data.recipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
        console.log("Sorted recipes (longest to shortest):", timeSortedRecipes);
        loadRecipes(timeSortedRecipes);
      })
      .catch(error => console.log("error fetching recipes", error));
  } else {
    // For ascending order (shortest to longest)
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        const timeSortedRecipes = data.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
        console.log("Sorted recipes (shortest to longest):", timeSortedRecipes);
        loadRecipes(timeSortedRecipes);
      })
      .catch(error => console.log("error fetching recipes", error));
  }
}

//Adding an action to each time sort radio button to trigger sorting.
document.querySelectorAll(`input[name = "time"]`).forEach(radio => {
  radio.addEventListener(`change`, sortTime)
})


fetchRecipe()
