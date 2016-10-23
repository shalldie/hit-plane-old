declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};


export let imgPlane: any = require("!url!./plane.png");

export let imgBoom: any = require("!url!./boom.png");

export let imgBulletArr: any[] = [  // 子弹数组
    require("!url!./bullet01.png"), // 基础子弹
    require("!url!./bullet02.png"), // 二级子弹
    require("!url!./bullet03.png"),  // 三级子弹
    require("!url!./enemy_bullet.png")  // 敌军子弹
];


export let imgHP: any = require("!url!./hp.png"); // HP 图片

export let imgEnemy: any = require("!url!./enemy.png"); // 敌军飞机图片

export let imgHeart: any = require("!url!./heart.png"); // ❤️ 图片
