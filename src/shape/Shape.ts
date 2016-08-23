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

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default Shape;