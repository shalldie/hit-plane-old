import Shape from './Shape';

import {imgSpirit} from '../utils/utils';


/**
 * 敌军
 * 
 * @export
 * @class Enemy
 * @extends {Shape}
 */
export class Enemy extends Shape {

    constructor(x: number, y: number, width: number, height: number, typeIndex: number) {
        super(x, y, width, height);

    }

    /**
     * 绘制帧速度
     * 
     * @protected
     * @type {number}
     * @memberOf Enemy
     */
    protected speedSpan: number;

    /**
     * 绘制自身
     * 
     * @param {CanvasRenderingContext2D} ctx
     * 
     * @memberOf Enemy
     */
    public onPaint(ctx: CanvasRenderingContext2D): void {

    }

}