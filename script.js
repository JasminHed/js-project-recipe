document.addEventListener("DOMContentLoaded", () => {


  const URL = "https://api.spoonacular.com/recipes/random?apiKey=f22e66767aca4bdda6a1d293d962b29e&number=10"
  const recipesContainer = document.getElementById("recipes-container")

  // Fetch API recipes, save them to local storage and when limit is hit show stored recipes + show an error message
  const fetchRecipe = () => {
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          recipesContainer.innerHTML = `<p>API limit reached, but don't worry! We've got a full load of saved recipes for you.</p>`
          throw new Error("API limit reached")
        }
        return response.json()
      })
      .then(data => {
        if (data && data.recipes && data.recipes.length > 0) {
          localStorage.setItem("recipes", JSON.stringify(data.recipes)) // Save fetched recipes to localStorage.
          loadRecipes(data.recipes)
        }
      })
      .catch(() => {
        const storedRecipes = localStorage.getItem("recipes")
        if (storedRecipes) {
          loadRecipes(JSON.parse(storedRecipes)) // parse means converting string from storage to a usabel JS array
        }
      })
  }

  // Loop through all recipes
  const loadRecipes = (recipeArray) => {
    recipesContainer.innerHTML = ""

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

  //Random recipe
  const getRandomRecipe = () => {
    const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=f22e66767aca4bdda6a1d293d962b29e&number=1"
    fetch(randomURL)
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

  // Filter - Using localStorage
  const filterDiets = () => {
    const filterValue = document.querySelector('input[name="diet"]:checked').value
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"))

    if (storedRecipes.length === 0) {
      recipesContainer.innerHTML = `<p>No recipes available to filter.</p>`
      return
    }

    if (filterValue === "all") {
      loadRecipes(storedRecipes)
    } else {
      const filteredRecipes = storedRecipes.filter(recipe => {
        if (filterValue === "vegan") return recipe.vegan
        if (filterValue === "vegetarian") return recipe.vegetarian && !recipe.vegan //not showing vegan recipes
        if (filterValue === "pescatarian") return recipe.diets && recipe.diets.includes("pescatarian")
        return false
      })

      if (filteredRecipes.length > 0) {
        loadRecipes(filteredRecipes)
      } else {
        recipesContainer.innerHTML = `<p>No ${filterValue} recipes found. Try loading more recipes first!</p>`
      }
    }
  }
  document.querySelectorAll('input[name="diet"]').forEach(radio => {
    radio.addEventListener('change', filterDiets)
  })

  // Sort - Using localStorage
  const sortTime = () => {
    const sortValue = document.querySelector('input[name="time"]:checked').value
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"))

    if (storedRecipes.length === 0) {
      recipesContainer.innerHTML = `<p>No recipes available to sort.</p>`
      return
    }

    const sortedRecipes = storedRecipes.slice() //Slice method returns copy of array sortedRecipes

    if (sortValue === "descending") {
      sortedRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes)
    } else {
      sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes)
    }

    loadRecipes(sortedRecipes)
  }

  document.querySelectorAll('input[name="time"]').forEach(radio => {
    radio.addEventListener('change', sortTime)
  })

  fetchRecipe()

})


