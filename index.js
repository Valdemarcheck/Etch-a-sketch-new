// Get all required elements references

const penTool = document.querySelector(".pen-btn");
const eraserTool = document.querySelector(".eraser-btn");
const clearTool = document.querySelector(".clear-btn");
const penSizeTool = document.querySelector(".pen-size-btn");
const colorPicker = document.querySelector(".color-btn");
const randomColorTool = document.querySelector(".random-color-btn");

const canvas = document.querySelector(".canvas");

let pixels = [];
let brushSize = 1;
let currentColor = "#000000";

function fillGrid(width) {
  for (let row = 0; row < width; row++) {
    pixels.push([]);
    for (let column = 0; column < width; column++) {
      let pixel = setupPixel(row, column);
      pixels[row].push(pixel);
      canvas.appendChild(pixel);
    }
  }
}

function setupPixel(row, column) {
  let pixel = document.createElement("div");
  pixel.style.border = "1px solid black";
  pixel.style.minHeight = "30px";
  pixel.style.minWidth = "30px";
  pixel.setAttribute("index", `${row},${column}`);
  return pixel;
}

fillGrid(16);
