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
let currentColor = '#000000';

function fillGrid(width) {
    for (let i = 0; i < width; i++) {
        pixels.push([]);
        for (let j = 0; j < width; j++) {
          let pixel = document.createElement("div");

          pixel.style.border = "1px solid black";
          pixel.style.minHeight = "30px";
          pixel.style.minWidth = "30px";
          pixel.setAttribute("index", `${i},${j}`);

          pixels[i].push(pixel);
          canvas.appendChild(pixel);
        }
      }
}

fillGrid(16);