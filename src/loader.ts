// declare var require: {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };
declare function require(moduleName: string): any;

// 加载样式
import './style.scss';

// 画布
import './utils/resize';

// 预加载图片
let imgSrcArr: string[] = ["bg.jpg", "boom.png", "bullet01.png", "bullet02.png", "bullet03.png", "enemy.png", "enemy_bullet.png", "heart.png", "hp.png", "plane.png"]
// .map(n => require(`file-loader?name=[name].[ext]&context=./src/img/&outputPath=img/&publicPath=../!./img/${n}`));  // file-loader 好难 0.0

let loadedImgCount: number = 0;

/**
 * 根据图片地址返回一个预加载Promise
 * 
 * @param {string} imgSrc 
 * @returns {Promise<HTMLImageElement>} 
 */
function updateLoading(imgSrc: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>(res => {
        let img = new Image();
        img.onload = function () {
            loadedImgCount++;
            document.getElementById('loading').innerHTML = 'loading......' + ~~(loadedImgCount * 100 / imgSrcArr.length) + '%';
            res(img);
        };
        img.src = imgSrc;
    });
}

(async () => {
    let imgArr = await Promise.all(imgSrcArr.map(src => updateLoading('img/' + src)));
    let imgDict: object = {};
    for (let i = 0, len = imgArr.length; i < len; i++) {  // for 要比 forEach,map 等效率高不少，，在V8下
        let name = imgArr[i].src.replace(/^\S*\/|\.[^\.]*$/g, '');
        if (name != 'bg') imgDict[name] = imgArr[i];
    }
})();