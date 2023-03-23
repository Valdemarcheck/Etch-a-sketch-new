// Get all required elements references

const penTool = document.querySelector(".pen-btn");
const clearTool = document.querySelector(".clear-btn");
const penSizeTool = document.querySelector(".pen-size-btn");
const colorPicker = document.querySelector(".color-btn");
const randomColorTool = document.querySelector(".random-color-btn");

const BUTTONS = [penTool, clearTool, penSizeTool, colorPicker, randomColorTool];

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
let currentColor = colorPicker.value;
let currentTool = PEN;

// Add eventListeners

penTool.addEventListener("click", () => (currentTool = PEN));
clearTool.addEventListener("click", setGridToOneColor);
colorPicker.addEventListener(
  "change",
  () => (currentColor = colorPicker.value)
);
randomColorTool.addEventListener(
  "click",
  () => (currentTool = RANDOM_COLOR_TOOL)
);
slider.addEventListener("change", regenerateGrid);

BUTTONS.forEach((button) => {
  let tooltipText = button.getAttribute("tooltip-text");
  button.addEventListener("mouseover", (e) => setTooltip(e, tooltipText));
  button.addEventListener("mouseout", (e) => removeTooltip(e));
});

// initialize required functions

function setTooltip(e, text) {
  let tooltip = document.createElement("div");
  let div = getNodeForTooltip(e);

  tooltip.textContent = text;
  tooltip.classList.add("tooltip");

  div.appendChild(tooltip);
}

function removeTooltip(e) {
  let div = getNodeForTooltip(e);
  div.lastChild.remove();
}

function getNodeForTooltip(e) {
  let node = e.target;

  if (node.nodeName === 'DIV') {
    return node;
  } else if (node.nodeName === 'IMG') {
    return node.parentNode;
  }
}

function regenerateGrid() {
  clearGrid();
  fillGrid(+slider.value);
}

function setGridToOneColor() {
  let gridWidth = +slider.value;
  for (let row = 0; row < gridWidth; row++) {
    for (let column = 0; column < gridWidth; column++) {
      pixels[row][column].style.backgroundColor = WHITE_COLOR;
    }
  }
}

function setupPixel(row, column, pixelAmount) {
  let pixel = document.createElement("div");
  let pixelSize = canvas.clientHeight / pixelAmount;

  pixel.style.border = "1px solid black";
  pixel.style.minHeight = pixelSize + "px";
  pixel.style.minWidth = pixelSize + "px";
  pixel.setAttribute("index", `${row},${column}`);

  pixel.addEventListener("mousedown", (e) => changeColor(e));
  pixel.addEventListener("mousemove", (e) => changeColor(e));

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
  e.preventDefault();
  if (e.which === LEFT_CLICK) {
    if (currentTool === PEN) {
      e.target.style.backgroundColor = currentColor;
    } else if (currentTool === RANDOM_COLOR_TOOL) {
      e.target.style.backgroundColor = getRandomColor();
    }
  } else if (e.which === RIGHT_CLICK) {
    e.target.style.backgroundColor = WHITE_COLOR;
  }
}

function getRandomColor() {
  return `rgb(${getColorPart()}, ${getColorPart()}, ${getColorPart()})`;
}

function getColorPart() {
  return Math.floor(Math.random() * 255);
}

fillGrid(+slider.value);
