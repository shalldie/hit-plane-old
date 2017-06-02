/**
 * 重置画布大小
 * 
 * @export
 */
export default function resize() {
    let bg = <HTMLDivElement>document.getElementById("bg");
    let ele = <HTMLCanvasElement>document.getElementById("app");

    ele.height = document.body.clientHeight * 2;
    ele.width = ele.height * 512 / 768;

    ele.style.cssText = `transform:translate3d(-50%,-50%,0) scale(.5)`;

    bg.style.width = ele.width / 2 + "px";
    bg.style.height = ele.height + "px";
}
resize();