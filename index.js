// Get all required elements references

const penTool = document.querySelector(".pen-btn");
const clearTool = document.querySelector(".clear-btn");
const penSizeTool = document.querySelector(".pen-size-btn");
const colorPicker = document.querySelector(".color-btn");
const randomColorTool = document.querySelector(".random-color-btn");

const canvas = document.querySelector(".canvas");

const minSizeSpan = document.querySelector(".slider-value.min");
const slider = document.querySelector(".canvas-size");
const maxSizeSpan = document.querySelector(".slider-value.max");

// Setup text beside slider

minSizeSpan.textContent = slider.min;
maxSizeSpan.textContent = slider.max;

// Setup aliases

const LEFT_CLICK = 1;
const RIGHT_CLICK = 3;
const WHITE_COLOR = "#ffffff";

const PEN = "pen";
const RANDOM_COLOR_TOOL = "random_color";

// Setup global variables

let pixels = [];
let brushSize = 1;
let currentColor = "#000000";
let currentTool = PEN;

// Add eventListeners

slider.addEventListener("change", regenerateGrid);
penTool.addEventListener("click", () => (currentTool = PEN));
randomColorTool.addEventListener(
  "click",
  () => (currentTool = RANDOM_COLOR_TOOL)
);

// initialize required functions

function regenerateGrid() {
  clearCanvas();
  fillGrid(+slider.value);
}

function setupPixel(row, column, pixelAmount) {
  let pixel = document.createElement("div");
  let pixelSize = canvas.clientWidth / pixelAmount;

  pixel.style.border = "1px solid black";
  pixel.style.minHeight = pixelSize + "px";
  pixel.style.minWidth = pixelSize + "px";
  pixel.setAttribute("index", `${row},${column}`);

  pixel.addEventListener("mousedown", (e) => changeColor(e));

  return pixel;
}

function fillGrid(width) {
  for (let row = 0; row < width; row++) {
    pixels.push([]);

    for (let column = 0; column < width; column++) {
      let pixel = setupPixel(row, column, width);
      pixels[row].push(pixel);
      canvas.appendChild(pixel);
    }
  }
}

function clearGrid() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.lastChild);
  }
  while (pixels.length > 0) {
    pixels.pop();
  }
}

function changeColor(e) {
  if (currentTool === PEN) {
    e.preventDefault();
    console.log(e);
    if (e.which === LEFT_CLICK) {
      e.target.style.backgroundColor = currentColor;
    } else if (e.which === RIGHT_CLICK) {
      e.target.style.backgroundColor = WHITE_COLOR;
    }
  } else if (currentTool === RANDOM_COLOR_TOOL) {
    e.target.style.backgroundColor = getRandomColor();
  }
}

function getRandomColor() {
  return `rgb(${getColorPart()}, ${getColorPart()}, ${getColorPart()})`;
}

function getColorPart() {
  return Math.floor(Math.random() * 255);
}
fillGrid(8);
