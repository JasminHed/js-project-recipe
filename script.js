//orgin array
const recipes = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: "assets/lentilsoup.jpg",
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: "Vegan",
    readyInMinutes: 30,
    cuisine: "Mediterranean",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "assets/pestopasta.jpg",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: "Vegetarian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ]
  },
  {
    id: 3,
    title: "Chicken Stir-Fry",
    image: "assets/chicken.jpg",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: "Non-veg",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ]
  },
  {
    id: 4,
    title: "Tacos",
    image: "assets/tacos.jpg",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: "Non-veg",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ]

  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image: "assets/hummus.jpg",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: "Non-veg",
    cuisine: "Middle Eastern",
    ingredients: [
      "chickpeas",
      "tahini",
      "garlic",
      "lemon juice",
      "olive oil"
    ]
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "assets/avocadotoast.jpg",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: "Vegan",
    cuisine: "Mediterranean",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ]
  },
  {
    id: 7,
    title: "Vegeterian Stew",
    image: "assets/vegstew.jpg",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: "Vegetarian",
    ingredients: [
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms"
    ]
  }
]


let workingRecipes = recipes //Global

const recipesContainer = document.getElementById("recipes-container")

const loadRecipes = (recipeArray) => {
  recipesContainer.innerHTML = "" // Clearing container of recipes before adding new recipes.


  if (recipeArray.length === 0) {
    console.log("empty, show message")
    recipesContainer.innerHTML = ` 
<div class="empty">
<h3> No recipes found. Select a different filter. </h3>
</div>
`

    return
  }


  //Creating a function w. conditional statements to fetch diets
  const getDietInfo = (recipe) => {
    if (recipe.vegan) return "Vegan"
    else if (recipe.vegetarian) return "Vegetarian"
    return "Non-veg"
  }

  //Looping through the recipes from API
  recipeArray.forEach(recipe => {

    // Creating a function with a conditional statement to check if ingredients exist.  
    // Uses .length to verify if there are more than 0 ingredients.  
    // If ingredients exist, .map creates a list, and .join formats it as a string.  
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

// this code fetches one random recipe from the Spoonacular API
const URL = "https://api.spoonacular.com/recipes/random/?apiKey=f22e66767aca4bdda6a1d293d962b29e&number=1"

const fetchRecipe = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("what is the data", data)
      loadRecipes(data.recipes) //calling my function to show on webpage


      const recipes = data.recipes //giving my variabel a value, saving data.recipes in my variabel recipes
      console.log("recipes", recipes)


    })
}
const fetchbutton = document.getElementById("fetch-button")
if (fetchbutton) {
  fetchbutton.addEventListener("click", fetchRecipe)
}




const getRandomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length)
  const randomRecipe = recipes[randomIndex]

  console.log("Surprise button was clicked")
  console.log(`Random recipe selected: ${randomRecipe.title}`)

  //loadRecipes is responsible for showing all recipes
  //Calling it with the array randomRecipe to just get 1 random recipe
  loadRecipes([randomRecipe])
}

//Adding an action to button to trigger a random recipe.
const surpriseButton = document.getElementById("button")
if (surpriseButton) {
  surpriseButton.addEventListener("click", getRandomRecipe)
}


const filterDiets = () => {
  const filterValue = document.querySelector('input[name="diet"]:checked').value
  console.log("diet", filterValue)


  if (filterValue === "all") {
    workingRecipes = recipes //Variabel-value. 
    console.log("Show ALL recipes")
    console.log("recipes")
    loadRecipes(workingRecipes)


  } else {
    workingRecipes = recipes.filter(recipe =>
      recipe.diets.toLowerCase() === filterValue.toLowerCase()
    )
    console.log(`Filtering recipes for ${filterValue}`, workingRecipes)

    loadRecipes(workingRecipes)

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
    const timeSortedRecipes = workingRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes)
    console.log("Sorted recipes (longest to shortest):", timeSortedRecipes)
    loadRecipes(timeSortedRecipes)


  } else {
    const timeSortedRecipes = workingRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes)
    console.log("Sorted recipes (shortest to longest):", timeSortedRecipes)

    loadRecipes(timeSortedRecipes)
  }
}

//Adding an action to each time sort radio button to trigger sorting.
document.querySelectorAll(`input[name = "time"]`).forEach(radio => {
  radio.addEventListener(`change`, sortTime)
})


loadRecipes(recipes)

