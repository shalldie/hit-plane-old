import Shape from './Shape';

import {imgDrawSingle} from '../utils/utils';

import {imgEnemy, imgHP} from '../img/imgBase64';

import {EnemyBullet} from './Bullet'

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

    /**
     * 子弹数组
     * 
     * @type {EnemyBullet[]}
     * @memberOf Enemy
     */
    public bullets: EnemyBullet[];

    // public 

    constructor(x: number, y: number, width: number, typeIndex: number, hp: number) {
        var area = areaArr[typeIndex];
        let height: number = width * area.h / area.w;
        super(x, y, width, height);
        this.area = area;
        this.img = img;
        this.HP = hp;
        this.maxHP = hp;

        this.bullets = [];
    }

    public fire() {
        let bullet: EnemyBullet = new EnemyBullet(this.x, this.y + this.height / 2 + 2, this.width / 2);
        this.bullets.push(bullet);
    }

    /**
     * 绘制自身
     * 
     * @param {CanvasRenderingContext2D} ctx
     * 
     * @memberOf Enemy
     */
    public onPaint(ctx: CanvasRenderingContext2D): void {
        // 血条
        imgDrawSingle(ctx, imghp, 0, 0, imghp.width, imghp.height, this.x - this.width / 2, this.y - this.height / 2 - 20, this.width * this.HP / this.maxHP, 10);

        // imgDrawSingle(ctx,imghp)
        // 自身
        imgDrawSingle(ctx, this.img, this.area.x, this.area.y, this.area.w, this.area.h, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        // 子弹
        let allAlive = true; // 标记，节省开销
        for (let i = 0, len = this.bullets.length; i < len; i++) {
            let bullet = this.bullets[i];
            if (bullet.alive) {
                bullet.onPaint(ctx);
            } else {
                this.bullets[i] = null; // 听说等于null，有益于释放资源
                allAlive = false;
            }
        }
        if (!allAlive) {
            this.bullets = this.bullets.filter(n => n != null && n.alive);
        }
    }

}