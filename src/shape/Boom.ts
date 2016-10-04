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
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.img = img;
        this.imgSum = 14;
        this.colourSpeed = 40;
    }
}