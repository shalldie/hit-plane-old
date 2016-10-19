import {imgPlane} from './../img/imgBase64';
import Shape from './Shape';
import {imgSpirit} from '../utils/utils';
import {Bullet} from './Bullet';

let img = new Image();
img.src = imgPlane;

/**
 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
 * 
 * @export
 * @class Plane
 * @extends {Shape}
 */
export default class Plane extends Shape {

    protected fireSpan: number = 60;
    protected lastFireTime: Date = new Date();
    protected bullets: Bullet[] = [];

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.img = img;
        this.imgSum = 11;
        this.colourSpeed = 50;
        this.realWidth = width * 0.8;
    }

    private fire(): void {
        this.fireType(0, false);
        this.fireType(1, true);
        this.fireType(2, true);
    }

    private fireType(typeIndex: number, double: boolean = false) {
        let offsetArr = [8, 25, 50]; // 偏移量
        if (double) {
            this.bullets.push(new Bullet(this.x + offsetArr[typeIndex], this.y - this.height / 2, 96, 96, typeIndex));
            this.bullets.push(new Bullet(this.x - offsetArr[typeIndex], this.y - this.height / 2, 96, 96, typeIndex));
        } else {
            this.bullets.push(new Bullet(this.x, this.y - this.height / 2, 96, 96, typeIndex));
        }
    }

    private drawBullets(ctx: CanvasRenderingContext2D): void {
        this.bullets = this.bullets.filter(n => n.alive);
        for (let i = 0, len = this.bullets.length; i < len; i++) {
            this.bullets[i].onPaint(ctx);
        }
    }

    public onPaint(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;
        imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, this.ifImgX, this.imgSum, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        if (+new Date - this.lastFireTime.getTime() >= this.fireSpan) {
            this.fire();
            this.lastFireTime = new Date();
        }
        this.drawBullets(ctx);
    }

}