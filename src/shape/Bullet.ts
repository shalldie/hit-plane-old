import Shape from './Shape';

import {imgBullet} from '../img/imgBase64';

let img = new Image();
img.src = imgBullet;

/**
 * 子弹
 * 
 * @export
 * @class Bullet
 * @extends {Shape}
 */
export default class Bullet extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.img = img;
    }

    /**
     * 子弹飞行速度
     * 
     * @protected
     * @type {number}
     * @memberOf Bullet
     */
    protected speed: number;
}