import { imgPlane, imgHP } from './../img/imgBase64';
import Shape from './Shape';
import { imgSpirit, imgDrawSingle } from '../utils/utils';
import { Bullet } from './Bullet';

let img = new Image();
img.src = imgPlane;

let imghp = new Image();
imghp.src = imgHP;


/**
 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
 * 
 * @export
 * @class Plane
 * @extends {Shape}
 */
export default class Plane extends Shape {

    protected fireSpan: number = 110;
    protected lastFireTime: Date = new Date();

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
        this.img = img;
        this.imgSum = 11;
        this.colourSpeed = 50;
        this.realWidth = width * 0.5;
        this.realHeight = height * 0.5;
        this.maxHP = 100;
        this.HP = this.maxHP;
    }

    public fire(option: [number, boolean][]): Bullet[] {
        // 发射间隔
        if (+new Date - this.lastFireTime.getTime() < this.fireSpan) {
            return [];
        }

        this.lastFireTime = new Date();

        let arr: Bullet[] = [];
        let i = 0, len = option.length;
        for (; i < len; i++) {
            arr = arr.concat(this.fireType(option[i][0], option[i][1]));
        }
        return arr;
    }

    private fireType(typeIndex: number, double: boolean = false): Bullet[] {
        let offsetArr = [8, 25, 50]; // 偏移量
        let arr: Bullet[] = [];
        if (double) {
            arr.push(new Bullet(this.x + offsetArr[typeIndex], this.y - this.height / 2, 96, 96, typeIndex, this.scale));
            arr.push(new Bullet(this.x - offsetArr[typeIndex], this.y - this.height / 2, 96, 96, typeIndex, this.scale));
        } else {
            arr.push(new Bullet(this.x, this.y - this.height / 2, 96, 96, typeIndex, this.scale));
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