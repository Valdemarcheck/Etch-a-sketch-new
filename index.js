// Get all required elements references

const penTool = document.querySelector(".pen-btn");
const eraserTool = document.querySelector(".eraser-btn");
const clearTool = document.querySelector(".clear-btn");
const penSizeTool = document.querySelector(".pen-size-btn");
const colorPicker = document.querySelector(".color-btn");
const randomColorTool = document.querySelector(".random-color-btn");

const canvas = document.querySelector(".canvas");

const minSizeSpan = document.querySelector(".slider-value.min");
const slider = document.querySelector(".canvas-size");
const maxSizeSpan = document.querySelector(".slider-value.max");

minSizeSpan.textContent = slider.min;
maxSizeSpan.textContent = slider.max;

let pixels = [];
let brushSize = 1;
let currentColor = "#000000";

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

function setupPixel(row, column, pixelAmount) {
  let pixel = document.createElement("div");
  let pixelSize = canvas.clientWidth / pixelAmount;

  pixel.style.border = "1px solid black";
  pixel.style.minHeight = pixelSize + "px";
  pixel.style.minWidth = pixelSize + "px";
  pixel.setAttribute("index", `${row},${column}`);

  return pixel;
}

function clearCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.lastChild);
  }
  while (pixels.length > 0) {
    pixels.pop();
  }
}

fillGrid(16);
