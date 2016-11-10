import Shape from './Shape';

import { imgBulletArr } from '../img/imgBase64';

import { imgSpirit } from '../utils/utils';  // 精灵渲染辅助方法

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

        this.resetBullet(x, y, width, height, typeIndex, scale);
        this.makeCache();
    }

    private makeCache() {
        this.cacheCanvas = document.createElement('canvas');
        this.cacheCanvas.width = this.realWidth;
        this.cacheCanvas.height = this.realHeight;

        let cacheCtx = this.cacheCanvas.getContext('2d');
        cacheCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.cacheCanvas.width, this.cacheCanvas.height);
    }

    public resetBullet(x: number, y: number, width: number, height: number, typeIndex: number = 0, scale: number = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = imgBulletArr[typeIndex];
        this.baseY = y;
        this.speedSpan = 0.34 / scale;
        this.speedSpan = (0.34 + 0.12 * typeIndex) / scale;
        this.typeIndex = typeIndex;
        this.alive = true;
        this.createTime = new Date();
    }

    public typeIndex: number = 0;

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

        ctx.drawImage(
            this.cacheCanvas, this.x - this.realWidth / 2, this.y - this.realHeight / 2
        );

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
        imgSpirit(ctx, this.img, 300, this.createTime, true, 3, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale);
    }
}