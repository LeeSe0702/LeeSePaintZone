const canvas = document.querySelector("#js-canvas");
let painting = false;

function onMouseMove(event) {
    // offsetX: 140 //캔버스 위에서 마우스 위치
    // offsetY: 148
    const x = event.offsetX;
    const y = event.offsetY;
}
function stopPainting() {
    painting = false;
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}
