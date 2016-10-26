import Shape from './Shape';

import { imgDrawSingle } from '../utils/utils';

import { imgEnemy, imgHP } from '../img/imgBase64';

import { EnemyBullet } from './Bullet'

import AI from '../logic/AI';

let img = new Image();
img.src = imgEnemy;

let imghp = new Image();
imghp.src = imgHP;

let areaArr = [  // 每种敌军飞机在图片中的坐标和宽高
    {
        x: 0,
        y: 0,
        w: 103,
        h: 74
    }, {
        x: img.width - 97,
        y: 0,
        w: 97,
        h: 75
    }, {
        x: 0,
        y: img.height - 81,
        w: 113,
        h: 81
    }, {
        x: img.width - 100,
        y: img.height - 76,
        w: 100,
        h: 76
    }
];

/**
 * 飞机类型
 * 
 * @export
 * @enum {number}
 */
export enum EnemyType {
    /**
     * 黄色小飞机
     */
    Yello,
    /**
     * 白色小飞机
     */
    White,
    /**
     * 红色双螺旋桨飞机
     */
    Red,
    /**
     * 绿色双螺旋桨飞机
     */
    Green
}

/**
 * 敌军
 * 
 * @export
 * @class Enemy
 * @extends {Shape}
 */
export default class Enemy extends Shape {

    private area: any;

    private maxHP: number;
    public HP: number;

    public ai: AI;

    public baseX: number;
    public baseY: number;

    public speed: number;

    // public 

    constructor(x: number, y: number, width: number, enemyType: EnemyType, hp: number) {
        var area = areaArr[enemyType];
        let height: number = width * area.h / area.w;
        super(x, y, width, height);
        this.area = area;
        this.img = img;
        this.HP = hp;
        this.maxHP = hp;
        this.realWidth = width;
        this.baseX = x;
        this.baseY = y;
        this.ai = new AI();
        this.speed = 0.1;
    }

    /**
     * 开火
     * 
     * @param {number} [scale=1]
     * @returns {EnemyBullet[]}
     * 
     * @memberOf Enemy
     */
    public fire(scale: number = 1): EnemyBullet[] {
        return [new EnemyBullet(this.x, this.y + this.height / 2 + 2, this.width / 2, scale)];
    }

    /**
     * 绘制自身
     * 
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} [scale=1]
     * 
     * @memberOf Enemy
     */
    public onPaint(ctx: CanvasRenderingContext2D, scale: number = 1): void {
        // this.ai.behave(this);
        let timeNow = new Date();

        this.ai.behave(this, timeNow); // ai 行为

        var opa = 1;
        if (this.opacity != 1 && timeNow.getTime() - this.opacityTime.getTime() < this.opacityLast) {
            opa = this.opacity;
        }

        // 血条
        imgDrawSingle(ctx, imghp, 0, 0, imghp.width, imghp.height, this.x - this.width / 2, this.y - this.height / 2 - 20 * scale, this.width * this.HP / this.maxHP, 10 * scale);

        // imgDrawSingle(ctx,imghp)
        // 自身
        imgDrawSingle(ctx, this.img, this.area.x, this.area.y, this.area.w, this.area.h, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, opa);

        // ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

    }

}