import { imgPlane, imgHP } from './../img/imgBase64';
import Shape from './Shape';
import { imgSpirit, imgDrawSingle } from '../utils/utils';
import { Bullet } from './Bullet';


/**
 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
 * 
 * @export
 * @class Plane
 * @extends {Shape}
 */
export default class Plane extends Shape {

    // protected fireSpan: number = 110;
    // protected lastFireTime: Date = new Date();

    private maxHP: number;

    /**
     * 当前HP
     * 
     * @type {number}
     * @memberOf Plane
     */
    public HP: number;

    constructor(x: number, y: number, width: number, height: number, scale: number) {
        super(x, y, width, height, scale);
        this.img = imgPlane;
        this.imgSum = 11;
        this.colourSpeed = 50;
        this.realWidth = width * 0.5;
        this.realHeight = height * 0.5;
        this.maxHP = 100;
        this.HP = this.maxHP;
    }

    public fire(option: [number, number][], bulletList: Bullet[]): void {
        // 发射间隔
        // if (+new Date - this.lastFireTime.getTime() < this.fireSpan) {
        //     return;
        // }

        // this.lastFireTime = new Date();

        let sumNow = 0;  // 当前子弹数量
        let sumNum = option.length;  // 需要的子弹数量

        let i = 0;
        let len = bulletList.length;
        let bullet: Bullet;
        for (; i < len; i++) {  // 在原子弹列表中寻找不用的子弹，再利用
            if (sumNow >= sumNum) break; // 如果够了就停下来
            bullet = bulletList[i];
            if (!bullet.alive && bullet.typeIndex == option[sumNow][0]) {
                this.resetBullet(bullet, option[sumNow][0], option[sumNow][1]);
                // console.log(1);
                sumNow++;
            }
        }

        while (sumNow < sumNum) {  // 如果子弹还不够，就添加
            bulletList.push(this.resetBullet(null, option[sumNow][0], option[sumNow][1]));
            sumNow++;
        }

    }

    /**
     * 重置子弹类型
     * 
     * @private
     * @param {Bullet} bullet
     * @param {number} typeIndex
     * @param {number} typeMark
     * @returns {Bullet}
     * 
     * @memberOf Plane
     */
    private resetBullet(bullet: Bullet, typeIndex: number, typeMark: number = 0): Bullet {
        let offsetArr = [8, 25, 50];
        let x = this.x + [0, -1, 1][typeMark] * offsetArr[typeIndex];
        if (bullet) {
            bullet.resetBullet(x, this.y - this.height / 2, 96, 96, typeIndex, this.scale);
        } else {
            bullet = new Bullet(x, this.y - this.height / 2, 96, 96, typeIndex, this.scale);
        }
        return bullet;
    }

    public onPaint(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;

        var opa = 1;
        // 半透明状态
        if (this.opacity != 1 && new Date().getTime() - this.opacityTime.getTime() < this.opacityLast) {
            opa = this.opacity;
        }
        else if (this.opacity != 1) {  // 超时恢复
            opa = 1;
        }

        imgSpirit(
            ctx,
            this.img,
            this.colourSpeed,
            this.createTime,
            this.ifImgX,
            this.imgSum,
            this.x - this.width * this.scale / 2,
            this.y - this.height * this.scale / 2,
            this.width * this.scale,
            this.height * this.scale,
            opa);

        // 绘制 HP
        // imgDrawSingle(ctx, imghp, 0, 0, imghp.width, imghp.height, this.x - this.width / 2, this.y - this.height / 2 - 20, this.width * this.HP / this.maxHP, 10, 1);

        // ctx.strokeRect(this.x - this.realWidth / 2, this.y - this.realHeight / 2, this.realWidth, this.realHeight);
        // this.drawBullets(ctx);
    }

}