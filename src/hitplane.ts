import Logic from './logic/Logic';
// import config from './config';

let bg = <HTMLDivElement>document.getElementById("bg");
let ele = <HTMLCanvasElement>document.getElementById("demo");

ele.height = document.body.clientHeight * 2;
ele.width = ele.height * 512 / 768;

ele.style.cssText = `transform:translate3d(-50%,-50%,0) scale(.5)`;

bg.style.width = ele.width / 2 + "px";
bg.style.height = ele.height + "px";

let ctx = ele.getContext("2d");

let logic = new Logic(ele.width, ele.height, ctx);

logic.start();

ele.addEventListener('mousemove', function (ex) {
    logic.setPosition(ex.offsetX, ex.offsetY);
});