import {imgSpirit} from '../utils/utils';  // 精灵渲染辅助方法

/**
 * 形状类，基类
 * 
 * @class Shape
 */
abstract class Shape {
    /**
     * 是否 生存/可用
     * 
     * @protected
     * @type {boolean}
     * @memberOf Shape
     */
    protected alive: boolean = true;

    /**
     * 使用的图片，原图 
     * 
     * @protected
     * @type {HTMLImageElement}
     */
    protected img: HTMLImageElement;

    /**
     * 创建时间
     * 
     * @protected
     * @type {Date}
     * @memberOf Shape
     */
    protected createTime: Date = new Date();

    /**
     * 渲染速度
     * 
     * @protected
     * @type {number}
     * @memberOf Shape
     */
    protected colourSpeed: number;

    /**
     * 图片是否是x轴展开
     * 
     * @protected
     * @type {boolean}
     * @memberOf Shape
     */
    protected ifImgX: boolean = true;

    /**
     * 图片帧数量
     * 
     * @protected
     * @type {number}
     * @memberOf Shape
     */
    protected imgSum: number = 1;

    /**
     * x 坐标
     * 
     * @type {number}
     */
    public x: number;

    /**
     * y 坐标
     * 
     * @type {number}
     */
    public y: number;

    /**
     * 宽度
     * 
     * @type {number}
     */
    public width: number;

    /**
     * 高度
     * 
     * @type {number}
     */
    public height: number;


    /**
     * Creates an instance of Shape.
     * 
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * 画出来,show yourself!
     * 
     * @param {CanvasRenderingContext2D} [ctx]
     * 
     * @memberOf Shape
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;
        imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, this.ifImgX, this.imgSum, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }


}

export default Shape;