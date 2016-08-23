import {imgBoom} from './../img/imgBase64';
import Shape from './Shape';

let img = new Image();
img.src = imgBoom;

class Boom extends Shape {

    /**
     *  原图中每张图片宽度
     */
    private baseWidth: number = 64;

    /**
     * 原图中图片数量
     */
    private baseWidthNum: number = 14;

    /**
     * 原图中图片高度
     */
    private baseHeight: number = 64;

    /**
     * 当前该显示的图片等索引
     */
    private index: number = 0;

    /**
     * 使用的图片，原图 
     */
    private img: HTMLImageElement = img;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // drawImage（image，Sx，Sy，Sw，Sh，Dx，Dy，Dw，Sh）；

        ctx.save();

        ctx.drawImage(this.img, this.baseWidth * this.index, 0, this.baseWidth, this.baseHeight, this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}