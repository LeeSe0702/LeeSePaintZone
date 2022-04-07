const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext("2d");

const colors = document.querySelectorAll(".controls_color");
const colorPreview = document.querySelector(".contorls_color_preview");
const range = document.querySelector("#jsRange");

const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const clearBtn = document.querySelector("#jsClear");

const INITIAL_COLOR = "#2c2c2c";
const INITIAL_LINE_WIDTH = "2.5";
const CANVAS_DEFAULT_SIZE = "500";
const INITIAL_CANVAS_COLOR = "white";

/////////////////색상적용//////////////////////
function handleColorClick(event) {
    const color = event.target.style.backgroundColor; //target은 이벤트가 발생한 객체를 가리킨다.. ! 아래 Preveiw에서는 target 지정하는거아님...!
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    console.log(colorPreview);
    colorPreview.style.backgroundColor = color;
}

Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));
/////////////////색상적용//////////////////////

canvas.width = CANVAS_DEFAULT_SIZE;
canvas.height = CANVAS_DEFAULT_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_LINE_WIDTH;

let painting = false;
let filling = true;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting && !filling) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (painting && !filling) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function stopPainting() {
    painting = false;
    //path 없애는게 더 나을거같다. 여기다가.
}

function startPainting() {
    painting = true;
}

function fillCanvas() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_DEFAULT_SIZE, CANVAS_DEFAULT_SIZE);
    }
}

function handleRangeChangeByWheel(event) {
    // console.log(event.wheelDelta / 120);

    if (event.wheelDelta / 120 > 0) {
        range.value += range.step;
    } else if (event.wheelDelta / 120 < 0) {
        range.value -= range.step;
    }
    console.log(range.value);
    const strokeSize = range.value;
    ctx.lineWidth = strokeSize * 5;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    //휴대폰 전용 이벤트 START
    canvas.addEventListener("touchmove", onMouseMove);
    canvas.addEventListener("touchstart", startPainting);
    canvas.addEventListener("touchend", stopPainting);
    //휴대폰 전용 이벤트 END
    canvas.addEventListener("click", fillCanvas);
    // canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("wheel", handleRangeChangeByWheel); //여기 하는중이였음 스크롤하면 Range 이동하게
}

function handleRangeChange(event) {
    console.log(event.target.value);
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize * 5;
}

if (range) {
    range.addEventListener("input", handleRangeChange); //range는 input 에 반응한다. . . .!
}

function handleModeBtnClick(event) {
    if (filling) {
        filling = false;
        modeBtn.innerText = "Draw";
    } else {
        filling = true;
        modeBtn.innerText = "Fill";
    }
}

if (modeBtn) {
    modeBtn.addEventListener("click", handleModeBtnClick);
}

function handleClearAll() {
    const beforeColor = ctx.fillStyle;
    ctx.fillStyle = INITIAL_CANVAS_COLOR;
    ctx.fillRect(0, 0, CANVAS_DEFAULT_SIZE, CANVAS_DEFAULT_SIZE);
    ctx.fillStyle = beforeColor;
}
if (clearBtn) {
    clearBtn.addEventListener("click", handleClearAll);
}
