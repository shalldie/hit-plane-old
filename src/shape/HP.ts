import Shape from './Shape';

import {imgHP} from '../img/imgBase64';

/**
 * 血条 HP
 * 
 * @export
 * @class HP
 * @extends {Shape}
 */
export default class HP extends Shape {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.img = imgHP;
    }
} 