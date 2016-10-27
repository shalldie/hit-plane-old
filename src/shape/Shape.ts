import { imgSpirit } from '../utils/utils';  // 精灵渲染辅助方法

/**
 * 形状类，基类
 * 
 * @class Shape
 */
abstract class Shape {
    /**
     * 是否 生存/可用
     * 
     * @public
     * @type {boolean}
     * @memberOf Shape
     */
    public alive: boolean = true;

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
     * @public
     * @type {Date}
     * @memberOf Shape
     */
    public createTime: Date = new Date();

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
     * 用于碰撞检测的宽度
     * 
     * @type {number}
     * @memberOf Shape
     */
    public realWidth: number;

    /**
     * 用于碰撞检测的高度
     * 
     * @type {number}
     * @memberOf Shape
     */
    public realHeight: number;

    /**
     * 绘制时候的倍数，用于自适应
     * 
     * @type {number}
     * @memberOf Shape
     */
    public scale: number;

    protected opacityTime: Date;

    protected opacityLast: number;

    protected opacity: number = 1;

    /**
     * 持续一段时间半透明
     * 
     * @param {number} opacity
     * @param {number} last
     * 
     * @memberOf Shape
     */
    public makeOpacity(opacity: number, last: number): void {
        this.opacity = opacity;
        this.opacityTime = new Date();
        this.opacityLast = last;
    }

    /**
     * Creates an instance of Shape.
     * 
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} scale
     */
    constructor(x: number, y: number, width: number, height: number, scale: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.realWidth = width;
        this.realHeight = height;
        this.scale = scale;
    }

    /**
     * 画出来,show yourself!
     * 
     * @param {CanvasRenderingContext2D} [ctx]
     * 
     * @memberOf Shape
     */
    public onPaint(ctx: CanvasRenderingContext2D): void {
        if (!this.alive) return;
        var opa = 1;
        if (this.opacity != 1 && new Date().getTime() - this.opacityTime.getTime() < this.opacityLast) {
            opa = this.opacity;
        }

        imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, this.ifImgX, this.imgSum, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, opa);
    }


}

export default Shape;