import Boom from './Shape/Boom';

import Plane from './Shape/Plane';

let bg = <HTMLDivElement>document.getElementById("bg");
let ele = <HTMLCanvasElement>document.getElementById("demo");

ele.height = document.body.clientHeight * 2;
ele.width = ele.height * 512 / 768;

ele.style.cssText = `transform:translate3d(-50%,-50%,0) scale(.5)`;

bg.style.width = ele.width / 2 + "px";
bg.style.height = ele.height + "px";

let ctx = ele.getContext("2d");

var plane = new Plane(200, 200, 172, 200);

function drawAll() {
    ctx.clearRect(0, 0, ele.width, ele.height);
    plane.onPaint(ctx);
    requestAnimationFrame(drawAll);
}

drawAll();

ele.addEventListener('mousemove', function (ex) {
    plane.x = ex.offsetX;
    plane.y = ex.offsetY;
});