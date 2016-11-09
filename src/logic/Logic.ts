import * as utils from '../utils/utils';
import { Bullet, EnemyBullet } from '../shape/Bullet';
import Boom from '../shape/Boom';
import Enemy from '../shape/Enemy';
import Plane from '../shape/Plane';

/**
 * 游戏逻辑类
 * 
 * @export
 * @class Logic
 */
export default class Logic {

    /**
     * 敌军列表
     * 
     * @private
     * @type {Enemy[]}
     * @memberOf Logic
     */
    private enemyList: Enemy[] = [];

    private enemyBulletList: EnemyBullet[] = [];

    /**
     * 自己的飞机 ✈️
     * 
     * @private
     * @type {Plane}
     * @memberOf Logic
     */
    private plane: Plane;

    private bulletList: Bullet[] = [];

    /**
     * 爆炸对象列表 💥
     * 
     * @private
     * @type {Boom[]}
     * @memberOf Logic
     */
    private boomList: Boom[] = [];

    private ctx: CanvasRenderingContext2D;

    private width: number;

    private height: number;

    private scale: number = 1;


    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.scale = this.height / 1200; // 等比缩放，保证在不同分辨率下比例一致，类似rem的效果
        // this.scale = 1;
    }

    public start(): void {
        let that = this;
        this.newPlane();
        setInterval(function () {
            this.newEnemy();
            // console.log(that.bulletList.length);
        }.bind(this), 1500);
        this.newEnemy();
        this.keepRefresh();
    }

    public setPosition(x: number, y: number) {
        this.plane.x = x;
        this.plane.y = y;
    }

    public offsetPosition(x: number, y: number) {
        this.plane.x += x;
        this.plane.y += y;
    }

    /**
     * 出现新飞机
     * 
     * @private
     * 
     * @memberOf Logic
     */
    private newPlane(): void {
        this.plane = new Plane(this.width / 2, 0, 172, 200, this.scale);
        this.plane.y = this.height - this.plane.height * this.scale;
        this.plane.makeOpacity(0.5, 3000);
        setInterval(function () {
            this.plane.fire([
                [0, 0],
                [1, 1],
                [1, 2],
                [2, 1],
                [2, 2]
            ], this.bulletList);
        }.bind(this), 110);
    }

    /**
     * 新敌军
     * 
     * @private
     * 
     * @memberOf Logic
     */
    private newEnemy(): void {
        let x = this.width / 10 * ~~(Math.random() * 10 + 1);
        let wid = 80 + Math.random() * 80;
        let enemyType = ~~(Math.random() * 4);

        let enemy: Enemy = new Enemy(x, -x / 2, wid, enemyType, 100, this.scale);

        if (enemy.x + enemy.width / 2 > this.width || enemy.x < enemy.width / 2) {
            this.newEnemy();
            return;
        }

        enemy.resetY(-enemy.height / 2);
        enemy.speed *= Math.random() + 1;

        this.enemyList.push(enemy);

        let self = this;
        let timer = setInterval(function () {
            if (!enemy.alive) {
                clearInterval(timer);
                return;
            }
            self.enemyBulletList = self.enemyBulletList.concat(enemy.fire());
        }, 800 + Math.random() * 500);
    }

    private newBoom(x: number, y: number, width: number): void {
        let boom = new Boom(x, y, width, width, this.scale);
        this.boomList.push(boom);
    }

    /**
     * 开始帧动画
     * 
     * @private
     * 
     * @memberOf Logic
     */
    private keepRefresh() {
        let self = this;
        utils.makeRequestAnimationFrame(function () {
            self.checkIntersectAndOut(); // 碰撞检测和出界
            self.onGC();  // 垃圾回收
            self.onPaint();  // 绘制
        }, null);
    }

    /**
     * 碰撞检测，出界，并判断有效性
     * 
     * @private
     * 
     * @memberOf Logic
     */
    private checkIntersectAndOut(): void {
        let i = 0, x = 0, y = 0, len = 0, len2 = 0;
        let enemy: Enemy;
        let bullet: Bullet;
        let enemyBullet: EnemyBullet;
        // 自己子弹与敌军的检测
        for (x = 0, len = this.enemyList.length; x < len; x++) {
            enemy = this.enemyList[x];
            for (y = 0, len2 = this.bulletList.length; y < len2; y++) {
                bullet = this.bulletList[y];

                if (bullet.alive && bullet.y + bullet.height < 0) { // 子弹是否存活
                    bullet.alive = false;
                }

                if (bullet.alive && enemy.alive && utils.ifIntersect(enemy, bullet)) {   // 如果子弹击中敌军
                    bullet.alive = false;
                    enemy.HP -= bullet.ATK; // 扣除生命值
                    enemy.makeOpacity(0.5, 10);
                    if (enemy.HP <= 0) {  // 被打挂了
                        enemy.HP = 0;
                        enemy.alive = false;
                        this.newBoom(enemy.x, enemy.y, enemy.width * 1.2);
                    }
                }
            }
        }

        // 敌军子弹跟自己碰撞检测 
        for (i = 0, len = this.enemyBulletList.length; i < len; i++) {
            enemyBullet = this.enemyBulletList[i];
            if (this.plane.alive && utils.ifIntersect(this.plane, enemyBullet)) {  // 被击中
                // this.plane.alive = false;
                enemyBullet.alive = false;

                this.plane.makeOpacity(0.5, 2000);
            }
        }

    }

    /**
     * 垃圾回收
     * 
     * @private
     * 
     * @memberOf Logic
     */
    private onGC(): void {
        // this.bulletList = this.bulletList.filter(n => n.alive && n.y + n.height > 0);
        this.enemyBulletList = this.enemyBulletList.filter(n => n.alive && n.y - n.height < this.height);
        this.boomList = this.boomList.filter(n => n.alive);

        this.enemyList = this.enemyList.filter(n => n.alive && n.y < n.height + this.height);
    }


    private onPaint(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);

        let i = 0, len = 0;
        let bullet: Bullet;
        let enemyBullet: EnemyBullet;
        let enemy: Enemy;
        let boom: Boom;

        // 绘制自身子弹
        for (i = 0, len = this.bulletList.length; i < len; i++) {
            bullet = this.bulletList[i];
            if (bullet.alive) {
                bullet.onPaint(this.ctx);
            }
        }

        // 绘制敌军子弹
        for (i = 0, len = this.enemyBulletList.length; i < len; i++) {
            enemyBullet = this.enemyBulletList[i];
            if (enemyBullet.alive) {
                enemyBullet.onPaint(this.ctx);
            }
        }

        // 绘制敌军
        for (i = 0, len = this.enemyList.length; i < len; i++) {
            enemy = this.enemyList[i];
            if (enemy.alive) {
                enemy.onPaint(this.ctx);
            }
        }

        // 爆炸效果
        for (i = 0, len = this.boomList.length; i < len; i++) {
            boom = this.boomList[i];
            if (boom.alive) {
                boom.onPaint(this.ctx);
            }
        }

        // 绘制自身飞机
        this.plane.onPaint(this.ctx);

    }

}