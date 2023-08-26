// Get all required elements references
const penTool = document.querySelector(".pen-btn");
const clearTool = document.querySelector(".clear-btn");
const colorPicker = document.querySelector(".color-btn");
const randomColorTool = document.querySelector(".random-color-btn");

const BUTTONS = [penTool, clearTool, colorPicker, randomColorTool];

const canvas = document.querySelector(".canvas");

const minGridSizeSpan = document.querySelector(".canvas-size-value.min");
const gridSizeSlider = document.querySelector(".canvas-size");
const maxGridSizeSpan = document.querySelector(".canvas-size-value.max");

const minPenSizeSpan = document.querySelector(".pen-size-value.min");
const penSizeSlider = document.querySelector(".pen-size");
const maxPenSizeSpan = document.querySelector(".pen-size-value.max");

// Setup text beside sliders

minGridSizeSpan.textContent = gridSizeSlider.min;
maxGridSizeSpan.textContent = gridSizeSlider.max;

minPenSizeSpan.textContent = penSizeSlider.min;
maxPenSizeSpan.textContent = penSizeSlider.max;

// Setup aliases

const LEFT_CLICK = 1;
const RIGHT_CLICK = 3;
const WHITE_COLOR = "#ffffff";

const PEN = "pen";
const RANDOM_COLOR_TOOL = "random_color";

// Setup global variables

let pixels = [];
let penSize = 1;
let currentColor = colorPicker.value;
let currentTool = PEN;

// Add eventListeners

window.addEventListener("resize", regenerateGrid);
canvas.addEventListener("mousedown", (e) => {
  if (!e.target.matches(".canvas")) changeColor(e);
});
canvas.addEventListener("mousemove", (e) => {
  if (!e.target.matches(".canvas")) changeColor(e);
});

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

gridSizeSlider.addEventListener("change", regenerateGrid);
penSizeSlider.addEventListener("change", (e) => (penSize = +e.target.value));

BUTTONS.forEach((button) => {
  let tooltipText = button.getAttribute("tooltip-text");
  button.addEventListener("mouseover", (e) => createTooltip(e, tooltipText));
  button.addEventListener("mouseout", (e) => removeChildren(e));
});

// initialize required functions

function createTooltip(e, text) {
  let button = getButtonNode(e);
  if (text) {
    let tooltip = document.createElement("div");

    tooltip.textContent = text;
    tooltip.classList.add("tooltip");

    button.appendChild(tooltip);
  }
}

function removeChildren(e) {
  let button = getButtonNode(e);

  for (let child of button.children) {
    if (child.nodeName === "DIV") {
      button.removeChild(child);
    }
  }
}

function getButtonNode(e) {
  let node = e.target;

  if (node.nodeName === "DIV") {
    return node;
  } else {
    return node.parentNode;
  }
}

function regenerateGrid() {
  clearGrid();
  fillGrid(+gridSizeSlider.value);
}

function setGridToOneColor() {
  for (let row of pixels) {
    for (let pixel of row) {
      pixel.style.backgroundColor = WHITE_COLOR;
    }
  }
}

function setupPixel(row, column) {
  let pixel = document.createElement("div");

  pixel.classList.add("pixel");
  pixel.setAttribute("index", `${row},${column}`);

  return pixel;
}

function fillGrid(widthInPixels) {
  canvas.style.setProperty(
    "grid-template-rows",
    `repeat(${widthInPixels}, 1fr)`
  );
  canvas.style.setProperty(
    "grid-template-columns",
    `repeat(${widthInPixels}, 1fr)`
  );

  for (let row = 0; row < widthInPixels; row++) {
    pixels.push([]);

    for (let column = 0; column < widthInPixels; column++) {
      let pixel = setupPixel(row, column);
      pixels[row].push(pixel);
      canvas.appendChild(pixel);
    }
  }
}

function clearGrid() {
  canvas.textContent = "";
  pixels = [];
}

function changeColor(e) {
  e.preventDefault();
  if (e.which === LEFT_CLICK) {
    if (currentTool === PEN) {
      draw(e);
    } else if (currentTool === RANDOM_COLOR_TOOL) {
      draw(e, getRandomColor());
    }
  } else if (e.which === RIGHT_CLICK) {
    draw(e, WHITE_COLOR);
  }
}

function draw(e, color = currentColor) {
  if (penSize > 1) {
    let [rowIndex, columnIndex] = e.target.getAttribute("index").split(",");

    rowIndex = +rowIndex;
    columnIndex = +columnIndex;

    let range = penSize - 1;

    drawMultiple(rowIndex, columnIndex, range, color);
  } else {
    e.target.style.backgroundColor = color;
  }
}

function drawMultiple(rowIndex, columnIndex, range, color = currentColor) {
  let gridSize = +gridSizeSlider.value;
  for (let row = rowIndex - range; row <= rowIndex + range; row++) {
    for (
      let column = columnIndex - range;
      column <= columnIndex + range;
      column++
    ) {
      if (IsInRange(row, 0, gridSize) && IsInRange(column, 0, gridSize)) {
        let pixel = pixels[row][column];
        pixel.style.backgroundColor = color;
      }
    }
  }
}

function IsInRange(value, min, max) {
  return value >= min && value < max;
}

function getRandomColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

function getColorPart() {
  return Math.floor(Math.random() * 255);
}

// Draw initial grid

fillGrid(+gridSizeSlider.value);
