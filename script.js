const messageHolder = document.getElementById("message")

const veganButton = document.getElementById("vegan-button")

if (veganButton) {
  veganButton.addEventListener("click", () => {
    messageHolder.innerHTML += "You chose vegan" // + då lägger vi till i html
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

const descendingButton = document.getElementById("descending-button")
if (descendingButton) {
  descendingButton.addEventListener("click", () => {
    messageHolder.innerHTML += "Aha, short on time! No problem."
  })
}

const ascendingButton = document.getElementById("ascending-button")
if (ascendingButton) {
  ascendingButton.addEventListener("click", () => {
    messageHolder.innerHTML += "Plenty of time, enjoy!"
  })
}