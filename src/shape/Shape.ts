/**
 * 形状(基类)
 */
class Shape {
    /**
     * x 坐标
     */
    public x: number;

    /**
     * y 坐标
     */
    public y: number;

    /**
     * 宽度
     */
    public width: number;

    /**
     * 高度
     */
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

}

export default Shape;