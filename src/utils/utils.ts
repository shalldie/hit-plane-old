import Shape from '../shape/Shape';

/**
 * 将雪碧图按照指定速度，画在画布的指定区域
 * 
 * @export void
 * @param {CanvasRenderingContext2D} ctx 画布
 * @param {HTMLImageElement} img 图片
 * @param {number} speed 渲染速度
 * @param {Date} baseTime 创建时间
 * @param {boolean} ifX 是否是横向的雪碧图
 * @param {number} sum 图片帧数
 * @param {number} tX 画在画布上的x坐标
 * @param {number} tY 画在画布上的y坐标
 * @param {number} tW 图片在画布上的宽度
 * @param {number} tH 图片在画布上的高度
 * @param {number} globalAlpha 透明度
 * @param {onceCallback} onceCallback 当轮回之后进行的回调
 */
export function imgSpirit(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    speed: number,
    baseTime: Date,
    ifX: boolean,
    sum: number,
    tX: number,
    tY: number,
    tW: number,
    tH: number,
    globalAlpha: number = 1,
    onceCallback?: Function): void {

    if (sum <= 1) {  // 如果是单帧图片
        imgDrawSingle(ctx, img, 0, 0, img.width, img.height, tX, tY, tW, tH);
        onceCallback && onceCallback();
        return;
    }

    var diffTime = +new Date - +baseTime; // 当前时间与创建时间的时间差
    diffTime = diffTime % (speed * sum);

    var nowIndex = ~~(diffTime / speed); // 当前要画的第几帧
    var fX = ifX ? (nowIndex * img.width / sum) : 0;
    var fY = ifX ? 0 : (nowIndex * img.height / sum);
    var fW = ifX ? (img.width / sum) : img.width;
    var fH = ifX ? img.height : (img.height / sum);

    ctx.save();
    ctx.globalAlpha = globalAlpha;
    ctx.drawImage(img, ~~fX, ~~fY, ~~fW, ~~fH, tX, tY, tW, tH);
    ctx.restore();

    if (nowIndex + 1 >= sum) {  // 最后一帧绘制完毕进行回调
        onceCallback && onceCallback();
    }
}


/**
 * 绘制单一图片
 * 
 * @export
 * @param {CanvasRenderingContext2D} ctx 画布对象
 * @param {HTMLImageElement} img 原始图片
 * @param {number} [fX=0] 原始图片x轴偏移量
 * @param {number} [fY=0] 原始图片y轴偏移量
 * @param {number} [fW=img.width] 原始图片截取宽度
 * @param {number} [fH=img.height] 原始图片截图高度
 * @param {number} [tX=0] 画在画布上的x轴坐标
 * @param {number} [tY=0] 画在画布上的y轴坐标
 * @param {number} [tW=img.width] 图片在画布上的宽度
 * @param {number} [tH=img.height] 图片在画布上的高度
 * @param {number} [globalAlpha=1] 透明度
 */
export function imgDrawSingle(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    fX: number = 0,
    fY: number = 0,
    fW: number = img.width,
    fH: number = img.height,
    tX: number = 0,
    tY: number = 0,
    tW: number = img.width,
    tH: number = img.height,
    globalAlpha: number = 1): void {
    if (globalAlpha == 1) {
        ctx.drawImage(img, fX, fY, fW, fH, tX, tY, tW, tH);
    } else {
        ctx.save();
        ctx.globalAlpha = globalAlpha;
        ctx.drawImage(img, fX, fY, fW, fH, tX, tY, tW, tH);
        ctx.restore();
    }

}

/**
 * 是否碰撞
 * 
 * @export
 * @param {Shape} obj1
 * @param {Shape} obj2
 * @returns {boolean}
 */
export function ifIntersect(obj1: Shape, obj2: Shape): boolean {
    return !(
        obj1.x + obj1.realWidth / 2 < obj2.x - obj2.realWidth / 2 ||
        obj1.y + obj1.realHeight / 2 < obj2.y - obj2.realHeight / 2 ||
        obj2.x + obj2.realWidth / 2 < obj1.x - obj1.realWidth / 2 ||
        obj2.y + obj2.realHeight / 2 < obj1.y - obj1.realHeight / 2
    );
}

/**
 * 
 * 
 * @export
 * @param {any} callback
 */
export function makeRequestAnimationFrame(callback) {
    callback();
    requestAnimationFrame(function () {
        makeRequestAnimationFrame(callback);
    });
}