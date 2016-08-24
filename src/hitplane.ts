import Boom from './Shape/Boom';

import Plane from './Shape/Plane';

let p = new Plane(1, 2, 3, 4);

let ele = document.createElement("canvas");

ele.style.cssText = "margin:50px auto;border:1px solid #2ad;display:block;";

document.body.appendChild(ele);

ele.width = 500;
ele.height = 300;

let ctx = ele.getContext("2d");

p.draw(ctx);