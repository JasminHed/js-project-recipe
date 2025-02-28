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

  //cond.statements, if a user chooses vegan/descending = message below (ES6?)
  if (userChoice === "vegan") {
    message = `<p>You chose vegan? Hope you like ${getRecipe("vegan")}</p>` //this way of writing it actives my function above and its return
  }
  else if (userChoice === "descending") {
    message = "<p>Aha, short on time? Not a problem!</p>" //a string because nothing else is needed
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
//This also gives messages. 

/*const allButton = document.getElementById("all-button")
if (allButton) {
  allButton.addEventListener("click", () => {
    messageHolder.innerHTML+="All eater huh?"
  })
}

const vegeterianButton = document.getElementById("veg-button")

if (vegeterianButton) {
  vegeterianButton.addEventListener("click", () => {
    messageHolder.innerHTML += "You chose vegeterian"
  })
}

const nonvegButton = document.getElementById("nonveg-button")

if (nonvegButton) {
  nonvegButton.addEventListener("click", () => {
    messageHolder.innerHTML += "You chose nonveg and nonvegan"
  })
}

const ascendingButton = document.getElementById("ascending-button")
if (ascendingButton) {
  ascendingButton.addEventListener("click", () => {
    messageHolder.innerHTML += "Plenty of time, enjoy!"
  })
}*/