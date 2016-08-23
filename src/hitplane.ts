declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

// import Shape from './shape/Shape';

// let s = new Shape(12, 21);

// console.log(s.x, s.y);

// import './img/boom.png';

// import baseData from './img/boom.png';

let baseData = require("!url!./img/plane.png");

// require("!style!css!less!dd");

// var img = document.createElement('img');
// img.src = baseData;
// document.body.appendChild(img);
