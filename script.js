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

//create an array with let

let workingRecipes = recipes

const recipesContainer = document.getElementById("recipes-container");

const loadRecipes = (recipeArray) => {
  recipesContainer.innerHTML = "" // Clear before adding new recipes

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


//Getting my filter diet values
const filterDiets = () => {
  const filterValue = document.querySelector('input[name="diet"]:checked').value
  console.log("diet", filterValue)

  //Show all recipes if all-button is selected
  if (filterValue === "all") {
    workingRecipes = recipes //putting all the recipes into this array. Variabel-value. 
    console.log("Show ALL recipes")
    console.log("recipes")
    loadRecipes(workingRecipes)

    //Show recipes filtered by diet
  } else {
    workingRecipes = recipes.filter(recipe =>
      recipe.diets.toLowerCase() === filterValue.toLowerCase()
    )
    console.log(`Filtering recipes for ${filterValue}`, workingRecipes)

    loadRecipes(workingRecipes)

  }
}
//Add action to each radiobutton filter
document.querySelectorAll(`input[name = "diet"]`).forEach(radio => {
  radio.addEventListener(`change`, filterDiets)
})

//Getting my sort time value
const sortTime = () => {
  const sortValue = document.querySelector(`input[name="time"]:checked`).value
  console.log("time", sortValue)

  //Show recipes sorted longest to shortest
  if (sortValue === "descending") {
    const timeSortedRecipes = workingRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes)
    console.log("Sorted recipes (longest to shortest):", timeSortedRecipes)
    loadRecipes(timeSortedRecipes)

    //Show recipes sorted shortest to longest
  } else {
    const timeSortedRecipes = workingRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes)
    console.log("Sorted recipes (shortest to longest):", timeSortedRecipes)

    loadRecipes(timeSortedRecipes)
  }
}

//Add action to each radiobutton sort
document.querySelectorAll(`input[name = "time"]`).forEach(radio => {
  radio.addEventListener(`change`, sortTime)
})

//Makes sure all recipes show when page loads
loadRecipes(recipes)


