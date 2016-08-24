import {imgBoom} from './../img/imgBase64';
import Shape from './Shape';

let img = new Image();
img.src = imgBoom;

/**
 * 爆炸 ， 现充都去爆炸吧！！！
 * 
 * @export
 * @class Boom
 * @extends {Shape}
 */
export default class Boom extends Shape {

    /**
     * 原图中每张图片宽度
     * 
     * @protected
     * @type {number}
     */
    protected baseWidth: number = 64;

    /**
     * 原图中图片数量
     * 
     * @protected
     * @type {number}
     */
    protected baseWidthNum: number = 14;

    /**
     * 原图中图片高度
     * 
     * @protected
     * @type {number}
     */
    protected baseHeight: number = 64;

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
    protected img: HTMLImageElement = img;

    /**
     * 画出来,show yourself!
     * 
     * @param {CanvasRenderingContext2D} ctx
     */
    public draw(ctx: CanvasRenderingContext2D) {

    }
}