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


    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }

    public start(): void {

    }

    private newPlane(): void {

    }

    private checkIntersect(): void {
        let i = 0, x = 0, y = 0, len = 0, len2 = 0;
        let enemy: Enemy;
        let bullet: Bullet;
        let enemyBullet: EnemyBullet;
        // 自己子弹与敌军的检测
        for (x = 0, len = this.enemyList.length; x < len; x++) {
            enemy = this.enemyList[x];
            for (y = 0, len2 = this.bulletList.length; y < len2; y++) {
                bullet = this.bulletList[y];
                if (enemy.alive && utils.ifIntersect(enemy, bullet)) {   // 如果子弹击中敌军
                    bullet.alive = false;
                    enemy.HP -= bullet.ATK; // 扣除生命值
                    if (enemy.HP <= 0) {  // 被打挂了
                        enemy.HP = 0;
                        enemy.alive = false;
                    }
                }
            }
        }

        // 敌军子弹跟自己碰撞检测 
        for (i = 0, len = this.enemyBulletList.length; i < len; i++) {
            enemyBullet = this.enemyBulletList[i];
            if (this.plane.alive && utils.ifIntersect(this.plane, enemyBullet)) {  // 被击中
                this.plane.alive = false;
            }
        }

    }

    private onPaint(): void {

        let i = 0, len = 0;
        let bullet: Bullet;
        let enemyBullet: EnemyBullet;
        let enemy: Enemy;

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

        // 绘制自身飞机
        this.plane.onPaint(this.ctx);

    }

}