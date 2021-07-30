import { getSocket } from "./socket";

const canvas = document.querySelector("canvas");
const jsColors = document.querySelector(".canvas-Colors");
const jsMode = document.querySelector(".jsMode");
const controls = document.querySelector(".controls")

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
const canvasSize = 450;
canvas.width = canvasSize;
canvas.height = canvasSize;

function handleTouch() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

const beginPath = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
};
const strokePath = (x, y,color) => {
    let currentColor = ctx.strokeStyle;
    if(color){
        ctx.strokeStyle = color;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = currentColor
};

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle,
    });
  }
}

function handleColor(event) {
  const { target } = event;
  const color = target.style.backgroundColor;
  if (target.className !== "jsColor") {
    return;
  }
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleFilling() {
  if (filling) {
    fill()
    getSocket().emit(window.events.fill,{color:ctx.fillStyle})
  }
}
function handleMode() {
  const Mode = jsMode.innerText;
  if (Mode === "FILL") {
    jsMode.innerText = "PEN";
    filling = false;
  } else {
    jsMode.innerText = "FILL";
    filling = true;
    canvas.addEventListener("mouseup", handleFilling);
  }
}
function handleRightClick(e) {
  e.preventDefault();
}
function fill(color){
  let currentColor = ctx.fillStyle;
  if(color){
    ctx.fillStyle = color
  }
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = currentColor;
}

export const handleBeganPath = ({ x, y }) => {
  beginPath(x, y);
};
export const handleStrokePath = ({ x, y,color }) => {
  strokePath(x, y,color);
};
export const handleFilled = ({color})=>{
  fill(color)
}

export function enableCanvas(){
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", handleTouch);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
export function disableCanvas(){
  canvas.removeEventListener("mousemove", handleMouseMove);
  canvas.removeEventListener("mousedown", handleTouch);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
}
export const hideControls = ()=>{
  controls.style.display = "none";
}
export const showControls = ()=>{
  controls.style.display = "block";
}
export const resetCanvas =(color)=>{
  fill(color)
}
if (canvas) {
  canvas.addEventListener("contextmenu", handleRightClick);
  hideControls()
}
jsColors.addEventListener("click", handleColor);
jsMode.addEventListener("click", handleMode);
