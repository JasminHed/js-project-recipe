const messageHolder = document.getElementById("message") //getting element and saving in messageHolder
const veganButton = document.getElementById("vegan-button")
const descendingButton = document.getElementById("descending-button")

//creating function called getRecipe w. parameter diet. The parameter returns recipe
const getRecipe = (diet) => {
  if (diet === "vegan") return "falafel"
}

//creating function called handleSelection w. parameter userChoice
const handleSelection = (userChoice) => {
  //creating it empty to fill later, like let winner from live session
  let message = ""

  //if a user chooses vegan = message below
  if (userChoice === "vegan") {
    message = `You chose vegan? Here is a suited recipe ${getRecipe("vegan")}`
  }
  else if (userChoice === "descending") {
    message = "Aha, short on time? Not a problem!"
  }

  //Message show in messageHolder
  messageHolder.innerHTML += message
}


if (veganButton) { //Checking that button exists then veganButton clicked, call function handleSelection to send message.
  veganButton.addEventListener("click", () => {
    handleSelection("vegan")
  })
}


if (descendingButton) {
  descendingButton.addEventListener("click", () => {
    handleSelection("descending")
  })
}


