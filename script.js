//getting elements and saving to messageHolder
const messageHolder = document.getElementById("message")


const veganButton = document.getElementById("vegan-button")
if (veganButton) {
  veganButton.addEventListener("click", () => {
    messageHolder.innerHTML += "<p>You chose vegan</p>"
  })
}

const descendingButton = document.getElementById("descending-button")
if (descendingButton) {
  descendingButton.addEventListener("click", () => {
    messageHolder.innerHTML += "<p>In a hurry? No problem.</p>"
  })
}

