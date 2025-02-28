//getting elements and saving to messageHolder
const messageHolder = document.getElementById("message")
const veganButton = document.getElementById("vegan-button")
const descendingButton = document.getElementById("descending-button")

//functions getRecipe/handleSelection w. parameter diet/userChoice.
const getRecipe = (diet) => {
  if (diet === "vegan") return "falafel"
}
const handleSelection = (userChoice) => {
  let message = "" //creating it empty to fill specific message below, like let winner from live session

  //if a user chooses vegan/descending = message below (ES6?)
  if (userChoice === "vegan") {
    message = `You chose vegan? Hope you like ${getRecipe("vegan")}` //this actives my function above and its return
  }
  else if (userChoice === "descending") {
    message = "Aha, short on time? Not a problem!"
  }

  //Show message in messageHolder
  messageHolder.innerHTML += message
}

//Checking that button exists. When each button clicked, function above will send message.
if (veganButton) {
  veganButton.addEventListener("click", () => {
    handleSelection("vegan")
  })
}

if (descendingButton) {
  descendingButton.addEventListener("click", () => {
    handleSelection("descending")
  })
}

