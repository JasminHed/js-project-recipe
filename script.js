const messageBox = document.getElementById("message")

const veganButton = document.getElementById("vegan-button")

if (veganButton) {
  veganButton.addEventListener("click", () => {
    messageBox.innerHTML = ("You chose vegan")
  })
}

const vegeterianButton = document.getElementById("veg-button")

if (vegeterianButton) {
  vegeterianButton.addEventListener("click", () => {
    console.log("vegeterianButton was clicked")
  })
}

const nonvegButton = document.getElementById("nonveg-button")

if (nonvegButton) {
  nonvegButton.addEventListener("click", () => {
    console.log("nonvegButton was clicked")
  })
}

const descendingButton = document.getElementById("descending-button")
if (descendingButton) {
  descendingButton.addEventListener("click", () => {
    console.log("descendingButton was clicked")
  })
}

const ascendingButton = document.getElementById("ascending-button")
if (ascendingButton) {
  ascendingButton.addEventListener("click", () => {
    console.log("ascendingButton was clicked")
  })
}