declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};


let imgPlane: any = require("!url!./plane.png");

let imgBoom: any = require("!url!./boom.png");

let imgBullet: any = require("!url!./bullet.png");

export {imgPlane};

export {imgBoom};

export {imgBullet};