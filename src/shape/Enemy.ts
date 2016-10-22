import Shape from './Shape';

import { imgDrawSingle } from '../utils/utils';

import { imgEnemy, imgHP } from '../img/imgBase64';

import { EnemyBullet } from './Bullet'

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

    // public 

    constructor(x: number, y: number, width: number, typeIndex: number, hp: number) {
        var area = areaArr[typeIndex];
        let height: number = width * area.h / area.w;
        super(x, y, width, height);
        this.area = area;
        this.img = img;
        this.HP = hp;
        this.maxHP = hp;
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
     * 
     * @memberOf Enemy
     */
    public onPaint(ctx: CanvasRenderingContext2D): void {
        var opa = 1;
        if (this.opacity != 1 && new Date().getTime() - this.opacityTime.getTime() < this.opacityLast) {
            opa = this.opacity;
        }

        // 血条
        imgDrawSingle(ctx, imghp, 0, 0, imghp.width, imghp.height, this.x - this.width / 2, this.y - this.height / 2 - 20, this.width * this.HP / this.maxHP, 10, opa);

        // imgDrawSingle(ctx,imghp)
        // 自身
        imgDrawSingle(ctx, this.img, this.area.x, this.area.y, this.area.w, this.area.h, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, opa);

    }

}