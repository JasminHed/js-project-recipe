const veganButton = document.getElementById("vegan-button")

if (veganButton) {
  veganButton.addEventListener("click", () => {
    console.log("veganButton was clicked")
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