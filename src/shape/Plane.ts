import { imgPlane, imgHP } from './../img/imgBase64';
import Shape from './Shape';
import { imgSpirit, imgDrawSingle } from '../utils/utils';
import { Bullet } from './Bullet';

let img = new Image();
img.src = imgPlane;

let imghp = new Image();


/**
 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
 * 
 * @export
 * @class Plane
 * @extends {Shape}
 */
export default class Plane extends Shape {

    protected fireSpan: number = 120;
    protected lastFireTime: Date = new Date();

    private maxHP: number;

    /**
     * 当前HP
     * 
     * @type {number}
     * @memberOf Plane
     */
    public HP: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.img = img;
        this.imgSum = 11;
        this.colourSpeed = 50;
        this.realWidth = width * 0.5;
        this.realHeight = height * 0.5;
        this.maxHP = 100;
        this.HP = this.maxHP;
    }

    public fire(option: [number, boolean][], scale: number): Bullet[] {
        // 发射间隔
        if (+new Date - this.lastFireTime.getTime() < this.fireSpan) {
            return [];
        }

        this.lastFireTime = new Date();

        let arr: Bullet[] = [];
        let i = 0, len = option.length;
        for (; i < len; i++) {
            arr = arr.concat(this.fireType(option[i][0], option[i][1], scale));
        }
        return arr;
    }

    private fireType(typeIndex: number, double: boolean = false, scale: number): Bullet[] {
        let offsetArr = [8 * scale, 25 * scale, 50 * scale]; // 偏移量
        let arr: Bullet[] = [];
        if (double) {
            arr.push(new Bullet(this.x + offsetArr[typeIndex], this.y - this.height / 2, 96 * scale, 96 * scale, typeIndex, scale));
            arr.push(new Bullet(this.x - offsetArr[typeIndex], this.y - this.height / 2, 96 * scale, 96 * scale, typeIndex, scale));
        } else {
            arr.push(new Bullet(this.x, this.y - this.height / 2, 96 * scale, 96 * scale, typeIndex, scale));
        }
        return arr;
    }

    // private drawBullets(ctx: CanvasRenderingContext2D): void {
    //     this.bullets = this.bullets.filter(n => n.alive);
    //     for (let i = 0, len = this.bullets.length; i < len; i++) {
    //         this.bullets[i].onPaint(ctx);
    //     }
    // }

    public onPaint(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;

        var opa = 1;
        if (this.opacity != 1 && new Date().getTime() - this.opacityTime.getTime() < this.opacityLast) {
            opa = this.opacity;
        }

        imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, this.ifImgX, this.imgSum, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, opa);

        // 绘制 HP
        imgDrawSingle(ctx, imghp, 0, 0, imghp.width, imghp.height, this.x - this.width / 2, this.y - this.height / 2 - 20, this.width * this.HP / this.maxHP, 10, 1);


        // this.drawBullets(ctx);
    }

}