import Boom from './Shape/Boom';

import Plane from './Shape/Plane';


let ele = document.createElement("canvas");

ele.style.cssText = "margin:50px auto;border:1px solid #2ad;display:block;";

document.body.appendChild(ele);

ele.width = 500;
ele.height = 300;

let ctx = ele.getContext("2d");

var plane = new Plane(200, 200, 172, 200);

function drawAll() {
    ctx.clearRect(0, 0, ele.width, ele.height);
    plane.draw(ctx);
    requestAnimationFrame(drawAll);
}

drawAll();

ele.addEventListener('mousemove', function (ex) {
    plane.x = ex.offsetX;
    plane.y = ex.offsetY;
});