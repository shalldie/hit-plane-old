import {imgPlane} from './../img/imgBase64';
import Shape from './Shape';
import {imgSpirit} from '../utils/utils';

let img = new Image();
img.src = imgPlane;

/**
 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
 * 
 * @export
 * @class Plane
 * @extends {Shape}
 */
export default class Plane extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.img = img;
        this.imgSum = 11;
        this.colourSpeed = 50;
    }
    
}