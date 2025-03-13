document.addEventListener("DOMContentLoaded", () => {

  const baseURL = "https://api.spoonacular.com/recipes/random"
  const apiKey = "f22e66767aca4bdda6a1d293d962b29e"
  const URL = `${baseURL}/?apiKey=${apiKey}&number=5`


  // Calling my container and make sure it is empty.
  const recipesContainer = document.getElementById("recipes-container")

  const loadRecipes = (recipeArray) => {
    recipesContainer.innerHTML = ""

    // Function w. conditional statement handles the fact that in the Spoonacular API, diet information comes as boolean properties (recipe.vegan, recipe.vegetarian) rather than as a single string value.
    const getDietInfo = (recipe) => {
      if (recipe.vegan) return "Vegan"
      else if (recipe.vegetarian) return "Vegetarian"
      return "Non-veg"
    }

    //Iterating/looping through each recipe allowing me to process each recipe individually.
    recipeArray.forEach(recipe => {

      // The API returns ingredients as an array of objects, code checks if it exist. If it does it shows through map+join method, if not a fallback message is shown. 
      let ingredientList = ""
      if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
        ingredientList = recipe.extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join("")

      }
      else {
        ingredientList = "<li>No ingredients listed</li>"
      }

      // Template literal, uses the processed diet information and ingredients list, creates a dynamic html that shows on webpage.
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

  // Adapting my random/surprise button to API
  const getRandomRecipe = () => {
    let URL = `${baseURL}/?apiKey=${apiKey}&number=1`
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

  // FetchRecipe function that makes an API request to Spoonacular to see if we hit the quota limit, if yes an error message shows.
  const fetchRecipe = () => {
    fetch(URL)
      .then(response => {

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
      })

      .catch(error => {
        recipesContainer.innerHTML = `${error.message}`
      })
  }

  fetchRecipe()

  //Adding a copy of baseURL. This lets me modify it withouth the base being changed. 
  let updatedURL = URL

  //Function to filter diets + getting filter value.
  const filterDiets = () => {
    const filterValue = document.querySelector('input[name="diet"]:checked').value
    console.log("diet", filterValue)

    // Conditional statements, if all is selected show recipe with no specific diet.
    if (filterValue === "all") {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log("fetched data", data)
          loadRecipes(data.recipes)
        })
        .catch(error => console.log("error fetching recipes", error))

      // If specific filter is selected, show recipes with tag vegan, vegetarian.
    } else {
      updatedURL = `${baseURL}?apiKey=${apiKey}&tags=${filterValue}`
      fetch(updatedURL)
        .then((response) => response.json())
        .then((data) => {
          console.log("fetched data", data)
          loadRecipes(data.recipes)
        })
        .catch(error => console.log("error fetching recipes", error))
    }
  }

  //Adding an action to each diet filter radio button to trigger filtering.
  document.querySelectorAll(`input[name = "diet"]`).forEach(radio => {
    radio.addEventListener(`change`, filterDiets)
  })


  // Function to sort on time + getting sortvalue.
  const sortTime = () => {
    const sortValue = document.querySelector(`input[name="time"]:checked`).value
    console.log("time", sortValue)

    // Conditional statement, if descending is selected show recipes longest to shortest time.
    if (sortValue === "descending") {
      fetch(updatedURL)
        .then((response) => response.json())
        .then((data) => {
          const timeSortedRecipes = data.recipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes)
          console.log("Sorted recipes (longest to shortest):", timeSortedRecipes)
          loadRecipes(timeSortedRecipes)
        })
        .catch(error => console.log("error fetching recipes", error))

      // If ascending is selected show recipes shortes to longest time.
    } else {

      fetch(updatedURL)
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

})