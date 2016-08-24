/**
 * 形状类，基类
 * 
 * @class Shape
 */
abstract class Shape {

    /**
     * 原图中每张图片宽度
     * 
     * @protected
     * @type {number}
     */
    protected baseWidth: number;

    /**
     * 原图中图片数量
     * 
     * @protected
     * @type {number}
     */
    protected baseWidthNum: number;

    /**
     * 原图中图片高度
     * 
     * @protected
     * @type {number}
     */
    protected baseHeight: number;

    /**
     * 当前该显示的图片等索引
     * 
     * @protected
     * @type {number}
     */
    protected index: number = 0;

    /**
     * 使用的图片，原图 
     * 
     * @protected
     * @type {HTMLImageElement}
     */
    protected img: HTMLImageElement;

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
     * @abstract
     * @param {CanvasRenderingContext2D} [ctx]
     */
    public abstract draw(ctx?: CanvasRenderingContext2D): void;


    //     if (!this.img) return;

    //     if (this.img) {
    //         console.log(this.baseWidth, this.baseHeight, this.baseWidthNum);
    //         return;
    //     }

    //     // drawImage（image，Sx，Sy，Sw，Sh，Dx，Dy，Dw，Sh）；

    //     ctx.save();

    //     ctx.drawImage(this.img, this.baseWidth * this.index, 0, this.baseWidth, this.baseHeight, this.x, this.y, this.width, this.height);

    //     ctx.restore();
    // }

}

export default Shape;