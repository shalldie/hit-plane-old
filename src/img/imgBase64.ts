declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};


let imgPlane: any = require("!url!./plane.png");

let imgBoom: any = require("!url!./boom.png");

let imgBulletArr: any[] = [
    require("!url!./bullet01.png"),
    require("!url!./bullet02.png"),
    require("!url!./bullet03.png")
]

let imgHP: any = require("!url!./hp.png");

export {imgPlane};

export {imgBoom};

export {imgBulletArr};

export {imgHP};