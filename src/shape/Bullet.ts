import Shape from './Shape';

/**
 * 子弹
 * 
 * @export
 * @class Bullet
 * @extends {Shape}
 */
export default class Bullet extends Shape {

    constructor(x: number, y: number, width: number, height: number, img: HTMLImageElement) {
        super(x, y, width, height);
        this.img = img;
    }

    protected speed: number;
}