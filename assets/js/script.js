// Constants first meaning my playingfield, different cards/colors
// and making sure that every color gets taken only twice
const memogameContainer = document.querySelector(".memo-game");
const colors = ["Magenta", "Lime", "Cyan", "Blue", "Orange", "Red", "Silver", "Indigo",];
const chosenColor = [...colors, ...colors];
const cardAnzahl = chosenColor.length;

// Game
let openCount = 0;
let activeCard = null;
let awaitingEndOfMove = false;

// card matching and "movement"/"animation??"/"behaviour"
function makeCard(color) {
  const element = document.createElement("div");

  element.classList.add("cards");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (awaitingEndOfMove || revealed === "true" || element === activeCard) {
      return;
    }
    element.style.backgroundColor = color;

    if (!activeCard) {
      activeCard = element;

      return;
    }

    const colorMatch = activeCard.getAttribute("data-color");

    if (colorMatch === color) {
      activeCard.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");

      awaitingEndOfMove = false;
      activeCard = null;
      openCount += 2;

      if (openCount === cardAnzahl) {
        alert("GOOD JOB!");
      }

      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeCard.style.backgroundColor = null;

      awaitingEndOfMove = false;
      activeCard = null;
    }, 500);
  });

  return element;
}

// Cards, make them appear randomly + limit amount of the same color
for (let i = 0; i < cardAnzahl; i++) {
  const randomIndex = Math.floor(Math.random() * chosenColor.length);
  const color = chosenColor[randomIndex];
  const cards = makeCard(color);

  chosenColor.splice(randomIndex, 1);
  memogameContainer.appendChild(cards);
}
