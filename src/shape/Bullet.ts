import Shape from './Shape';

import { imgBulletArr } from '../img/imgBase64';

import { imgSpirit } from '../utils/utils';  // 精灵渲染辅助方法

let imgEleBulletArr = imgBulletArr.map(n => {
    let img = new Image();
    img.src = n;
    while (!img.width); // 首次加载模块，阻塞ui等待加载完全
    return img;
});

// import config from '../config';
// let cacheArr: [boolean, HTMLCanvasElement, CanvasRenderingContext2D][];
let cacheArr = imgEleBulletArr.map(() => {
    let cacheCanvas = document.createElement('canvas');  // 离屏 canvas
    let cacheCtx = cacheCanvas.getContext('2d');
    return [
        false, // 是否已缓存
        cacheCanvas, // 离屏画布
        cacheCtx // 画布对象
    ];
});

/**
 * 子弹
 * 
 * @export
 * @class Bullet
 * @extends {Shape}
 */
export class Bullet extends Shape {

    constructor(x: number, y: number, width: number, height: number, typeIndex: number = 0, scale: number = 1) {
        super(x, y, width, height, scale);
        // this.realWidth = width / 2;
        // this.realHeight = height;
        // this.img = imgEleBulletArr[typeIndex];
        // this.baseY = y;
        // this.speedSpan /= scale;
        // this.speedSpan += 0.12 * typeIndex;
        this.resetBullet(x, y, width, height, typeIndex, scale);

        let cache = cacheArr[typeIndex];
        if (!cache[0]) { // 如果未缓存
            cache[0] = true;
            let cacheCanvas = <HTMLCanvasElement>cache[1];
            cacheCanvas.width = this.width * scale;
            cacheCanvas.height = this.height * scale;

            let cacheCtx = <CanvasRenderingContext2D>cache[2];

            // cacheCanvas.width
            cacheCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, cacheCanvas.width, cacheCanvas.height);
        }

        this.cacheCanvas = <HTMLCanvasElement>cache[1];
        // this.cacheCanvas = cache && <HTMLCanvasElement>cache[1];
    }

    public resetBullet(x: number, y: number, width: number, height: number, typeIndex: number = 0, scale: number = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = imgEleBulletArr[typeIndex];
        this.baseY = y;
        this.speedSpan = 0.34 / scale;
        this.speedSpan = (0.34 + 0.12 * typeIndex) / scale;
    }

    private cacheCanvas: HTMLCanvasElement;

    public ATK: number = 10;

    /**
     * 子弹飞行速度，每多少毫秒移动一个单位长度
     * 
     * @protected
     * @type {number}
     * @memberOf Bullet
     */
    protected speedSpan: number = 0.34;

    protected baseY: number;

    public onPaint(ctx: CanvasRenderingContext2D): void {
        let timeSpan = new Date().getTime() - this.createTime.getTime();
        this.y = this.baseY - ~~(timeSpan / this.speedSpan);

        // if (!this.img.width) { // 图片未加载完全
        //     return;
        // }

        // if(hasCached)


        // if (this.y < -this.height) {
        //     this.alive = false;
        //     // console.log(`${+new Date}`);
        //     // console.log(+new Date);
        //     return;
        // }

        // ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale);

        ctx.drawImage(
            this.cacheCanvas, 0, 0,
            this.cacheCanvas.width,
            this.cacheCanvas.height,
            this.x - this.cacheCanvas.width / 2,
            this.y - this.cacheCanvas.height / 2,
            this.cacheCanvas.width,
            this.cacheCanvas.height);

        // ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}

export class EnemyBullet extends Bullet {
    constructor(x: number, y: number, width: number, scale: number = 1) {
        super(x, y, width, width, 3, scale);
        this.speedSpan = 3 / scale;
    }

    public onPaint(ctx: CanvasRenderingContext2D): void {
        let timeSpan = new Date().getTime() - this.createTime.getTime();
        this.y = this.baseY + ~~(timeSpan / this.speedSpan);
        // if (this.y > config.height + this.height / 2) {
        //     this.alive = false;
        //     console.log('子弹失效...');
        //     return;
        // }
        // ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        imgSpirit(ctx, this.img, 300, this.createTime, true, 3, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale);
    }
}