declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};


let imgPlane: any = require("!url!./plane.png");

let imgBoom: any = require("!url!./boom.png");

let imgBulletArr: any[] = [  // 子弹数组
    require("!url!./bullet01.png"), // 基础子弹
    require("!url!./bullet02.png"), // 二级子弹
    require("!url!./bullet03.png")  // 三级子弹
];

let imgEnemyArr: any[] = [ // 敌军图片数组

];

let imgHP: any = require("!url!./hp.png");

export {imgPlane};

export {imgBoom};

export {imgBulletArr};

export {imgHP};

export {imgEnemyArr};