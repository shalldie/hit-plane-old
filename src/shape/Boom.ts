import { imgBoom } from './../img/imgBase64';
import Shape from './Shape';
import { imgSpirit } from './../utils/utils'

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
    constructor(x: number, y: number, width: number, height: number, scale: number) {
        super(x, y, width, height, scale);
        this.img = img;
        this.imgSum = 14;
        this.colourSpeed = 40;
    }

    public onPaint(ctx: CanvasRenderingContext2D): void {
        var self = this;
        imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, true, 14, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale, 1, function () {
            self.alive = false;
        });
    }
}