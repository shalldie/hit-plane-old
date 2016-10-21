import Shape from './Shape';

import { imgBulletArr } from '../img/imgBase64';

import { imgSpirit } from '../utils/utils';  // 精灵渲染辅助方法

// import config from '../config';

/**
 * 子弹
 * 
 * @export
 * @class Bullet
 * @extends {Shape}
 */
export class Bullet extends Shape {

    constructor(x: number, y: number, width: number, height: number, typeIndex: number = 0) {
        super(x, y, width, height);
        this.img = new Image();
        this.img.src = imgBulletArr[typeIndex];
        this.baseY = y;
        this.speedSpan += 0.05 * typeIndex;
    }

    public ATK: number = 0;

    /**
     * 子弹飞行速度，每多少毫秒移动一个单位长度
     * 
     * @protected
     * @type {number}
     * @memberOf Bullet
     */
    protected speedSpan: number = 0.4;

    protected baseY: number;

    public onPaint(ctx: CanvasRenderingContext2D): void {
        let timeSpan = new Date().getTime() - this.createTime.getTime();
        this.y = this.baseY - ~~(timeSpan / this.speedSpan);

        // if (this.y < -this.height) {
        //     this.alive = false;
        //     // console.log(`${+new Date}`);
        //     // console.log(+new Date);
        //     return;
        // }

        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}

export class EnemyBullet extends Bullet {
    constructor(x: number, y: number, width: number) {
        super(x, y, width, width, 3);
        this.speedSpan = 2;
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
        imgSpirit(ctx, this.img, 300, this.createTime, true, 3, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}