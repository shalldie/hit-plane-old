import config from '../config';
/**
 * 游戏逻辑类
 * 
 * @export
 * @class Logic
 */
export default class Logic {


    public Logic(width: number, height: number, ctx: CanvasRenderingContext2D) {
        config.width = width;
        config.height = height;
        config.ctx = ctx;
    }

    public start() {

    }

}