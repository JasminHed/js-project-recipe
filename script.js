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


let workingRecipes = recipes //Global, Creates a separate working array copy, preserves the original recipes array, enables modifications without losing initial data (for sort/filter).

const recipesContainer = document.getElementById("recipes-container") // This selects my html recipecontainer and allows me to display things in it. 

const loadRecipes = (recipeArray) => { //Creating a function named loadRecipes and adding a *parameter called recipeArray to dynamically *render, display recipes in my container.
  recipesContainer.innerHTML = "" // Clearing container of recipes before adding new recipes.


  if (recipeArray.length === 0) { //Using .length method to count the numbers of recipes in the array.Checking if the count is zero.
    console.log("empty, show message")
    recipesContainer.innerHTML = ` 
<div class="empty">
<h3> No recipes found. Select a different filter. </h3>
</div>
` //Connects a message to a chosen part of the innerHTML, this case recipecontainer.

    return //Stops the forEach loop from continuing to run.
  }

  // Looping through objects with forEach method. Using template literal ``to create dynamic HTML.Inserting recipe-specific information through values ${}. Code makes sure every recipe from origin recipes array is displayed on the webpage. // .map() converts each ingredient to a list item .join("") combines those list items into one continuous HTML string.
  recipeArray.forEach(recipe => {
    recipesContainer.innerHTML += `
      <div class="recipe-item">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h2>${recipe.title}</h2>

        <hr>

        <h3>Diet:</h3> <p> ${recipe.diets}</p>
        <h3>Time:</h3> <p>${recipe.readyInMinutes} minutes</p>
        <hr>
        
        <h3>Ingredients:</h3>
        <ul class="ingredient-list">
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul> 
      </div>
    `
  })
}
// Creating a function called getRandomRecipe
//Using math and length method to get a random number/recipe
const getRandomRecipe = () => {
  const randomIndex = Math.floor(Math.random() * recipes.length)
  const randomRecipe = recipes[randomIndex];

  console.log("Surprise button was clicked");
  console.log(`Random recipe selected: ${randomRecipe.title}`)

  //loadRecipes is responsible for showing all recipes
  //Calling it with the array randomRecipe to just get 1 random recipe
  loadRecipes([randomRecipe]);
}

//Adding an action to button to trigger a random recipe.
const surpriseButton = document.getElementById("button")
if (surpriseButton) {
  surpriseButton.addEventListener("click", getRandomRecipe)
}


//Creating a function called filterDiets and then selecting the checked radio buttons + capture their value (veg, vegan). 
const filterDiets = () => {
  const filterValue = document.querySelector('input[name="diet"]:checked').value
  console.log("diet", filterValue)

  // Using the global array workingRecipes.
  // Copying all items from the origin recipes array to new.
  // Ensuring all recipes will be displayed when "all" is selected.
  if (filterValue === "all") {
    workingRecipes = recipes //Variabel-value. 
    console.log("Show ALL recipes")
    console.log("recipes")
    loadRecipes(workingRecipes)

    //Using the global array again, w. filter method to be able to filter only the recipes matching the selected diet filter, while keeping the original recipes array unchanged.
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

//Creating a function called sortTime and then selecting the checked radio buttons, capture their value (desc, ascend).
const sortTime = () => {
  const sortValue = document.querySelector(`input[name="time"]:checked`).value
  console.log("time", sortValue)

  //Sorts the recipes based on time using the sort method. Checks the value of sortValue and sorts the workingRecipes array in descending order if it's "descending", or in ascending order otherwise.
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

