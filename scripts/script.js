let outerContainer = document.querySelector('#container');
let defaultGridSize = 16;

outerContainer.addEventListener("mouseover", hoverOver);

drawGrid();

function drawGrid(userSelection = defaultGridSize) {
    let gridSize = userSelection ** 2;
    outerContainer.innerHTML = "";
    
    outerContainer.style.gridTemplateColumns = `repeat(${userSelection}, 1fr)`;
    outerContainer.style.gridTemplateRows = `repeat(${userSelection}, 1fr)`;

    for (let i = 1; i <= gridSize; i++) {
        outerContainer.appendChild(document.createElement("div"));
    }
}

function hoverOver(event) {
    if (event.target !== outerContainer) {
        event.target.style.backgroundColor = `rgba(0, 0, 0, ${getAlpha(event.target)}`;
    }
}

function getAlpha(element) {
    // regex targeted at numbers with digits taken from this StackOverflow comment
    // https://stackoverflow.com/questions/3751877/how-to-extract-r-g-b-a-values-from-css-color#comment79938383_3752026
    let alphaTag = Number(window.getComputedStyle(element).backgroundColor.match(/[.?\d]+/g)[3]);

    if (alphaTag <= 1) {
        return alphaTag += 0.1;
    }

    return alphaTag;
}

let resetButton = document.querySelector('#reset');
resetButton.addEventListener("click", resetSketch);

function resetSketch() {
 

    let gridChildren = getGridChildren();

    for (const child of gridChildren) {
        child.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }

    let keepGridlines = gridChildren[0].classList.contains("add-gridlines");

    drawGrid(newGridSize);
    adjustGridlines(keepGridlines);
}

function resizeSketch() {
    let newGridSize = requestGridSize();

    if (newGridSize === "cancel") {
        return;
    }

    let gridChildren = getGridChildren();

    for (const child of gridChildren) {
        child.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }

    let keepGridlines = gridChildren[0].classList.contains("add-gridlines");

    drawGrid(newGridSize);
    adjustGridlines(keepGridlines);
}

function requestGridSize() {
    userSelection = prompt("How many rows would you like the sketchbook to have?(1-100)");
    
    if (typeof Number(userSelection) === "number" && Number(userSelection) > 0) {
        return Number(userSelection);
    } else if (userSelection == null || userSelection === '') {
        return "cancel";
    } else {
        return requestGridSize();
    } 
}

let gridsizeButton = document.querySelector('#resize');
gridsizeButton.addEventListener("click", resizeSketch);


let gridlineButton = document.querySelector('#display-gridlines');
gridlineButton.addEventListener("click", adjustGridlines);

function adjustGridlines(keepGridlines = true) {
    let gridChildren = getGridChildren();

    if (gridChildren[0].classList.contains("add-gridlines") || !keepGridlines) {
        for (const child of gridChildren) {
            child.classList.remove("add-gridlines");
            gridlineButton.textContent = "GRID";
        }
    } else {
        for (const child of gridChildren) {
            child.classList.add("add-gridlines");
            gridlineButton.textContent = "NO GRID";
        }
    }
}

function getGridChildren() {
    return document.querySelector('#container').children;
}



// Selection of id's and classes from html document
const bgclr = document.getElementById("clr");
const container = document.querySelector("#container");
  
// Here we are adding event listener which 
// is used to detect the mouse movement
bgclr.addEventListener("input", () => {
  // This updates the background color which is 
  // picked by the user from the picker
  document.getElementById("container").style.backgroundColor = bgclr.value;
  
  // This is the conditional statement that is used
  // to change the text color from BLACK to WHITE
  // when the background color changes to dark!
  if (
    bgclr.value.includes("00") ||
    bgclr.value.includes("0a") ||
    bgclr.value.includes("0b") ||
    bgclr.value.includes("0c") ||
    bgclr.value.includes("0d") ||
    bgclr.value.includes("0e") ||
    bgclr.value.includes("0f")
  ) {
    container.style.color = "#fff";
  } else {
    container.style.color = "#000";
  }
});