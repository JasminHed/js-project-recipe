document.addEventListener("DOMContentLoaded", () => {

  const baseURL = "https://api.spoonacular.com/recipes/random"
  const apiKey = "f22e66767aca4bdda6a1d293d962b29e"
  const URL = `${baseURL}?apiKey=${apiKey}&number=3`

  let updatedURL = URL


  const recipesContainer = document.getElementById("recipes-container")

  const loadRecipes = (recipeArray) => {
    recipesContainer.innerHTML = ""

    // Looping through recipes
    const getDietInfo = (recipe) => {
      if (recipe.vegan) return "Vegan"
      else if (recipe.vegetarian) return "Vegetarian"
      else if (recipe.diets && recipe.diets.includes("pescatarian")) return "Pescatarian"
      return "all-eater"
    }

    recipeArray.forEach(recipe => {

      let ingredientList = "<li>No ingredients listed</li>"

      if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
        ingredientList = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join("")
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

  //Quotalimit + pageload
  const fetchRecipe = () => {
    fetch(updatedURL)
      .then(response => {

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        if (data.recipes && data.recipes.length > 0) {
          loadRecipes(data.recipes)
        } else {
          recipesContainer.innerHTML = "No recipes found"
        }
      })
      .catch(error => {
        recipesContainer.innerHTML = `${error.message}`
      })
  }

  //Random
  const getRandomRecipe = () => {
    const URL = `${baseURL}/?apiKey=${apiKey}&number=1`
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.recipes && data.recipes.length > 0)
          loadRecipes(data.recipes)
      })
      .catch((error) => console.error("Error fetching recipe:", error))
  }

  const surpriseButton = document.getElementById("button")

  if (surpriseButton) {
    surpriseButton.addEventListener("click", getRandomRecipe)
  }

  //Empty message
  const getChefsChoice = () => {
    recipesContainer.innerHTML = `<p>No recipes found today from our chef. Try another button!</p>`
  }

  const chefsButton = document.getElementById("button1")

  if (chefsButton) {
    chefsButton.addEventListener("click", getChefsChoice)
  }

  //Filter
  const filterDiets = () => {
    const filterValue = document.querySelector('input[name="diet"]:checked').value


    if (filterValue === "all") {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          loadRecipes(data.recipes)
        })
        .catch(error => console.log("error fetching recipes", error))

    } else {
      updatedURL = `${baseURL}?apiKey=${apiKey}&tags=${filterValue}`
      fetch(updatedURL)
        .then((response) => response.json())
        .then((data) => {
          loadRecipes(data.recipes)
        })
        .catch(error => console.log("error fetching recipes", error))
    }
  }

  document.querySelectorAll(`input[name = "diet"]`).forEach(radio => {
    radio.addEventListener(`change`, filterDiets)
  })


  //Sort
  const sortTime = () => {
    const sortValue = document.querySelector(`input[name="time"]:checked`).value


    if (sortValue === "descending") {
      fetch(updatedURL)
        .then((response) => response.json())
        .then((data) => {
          const timeSortedRecipes = data.recipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes)
          loadRecipes(timeSortedRecipes)
        })
        .catch(error => console.log("error fetching recipes", error))


    } else {

      fetch(updatedURL)
        .then((response) => response.json())
        .then((data) => {
          const timeSortedRecipes = data.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes)
          loadRecipes(timeSortedRecipes);
        })
        .catch(error => console.log("error fetching recipes", error))
    }
  }

  document.querySelectorAll(`input[name = "time"]`).forEach(radio => {
    radio.addEventListener(`change`, sortTime)
  })

  fetchRecipe()
})