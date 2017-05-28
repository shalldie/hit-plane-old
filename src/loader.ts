import './style.scss';

let imgSrcArr = ["bg.jpg", "boom.png", "bullet01.png", "bullet02.png", "bullet03.png", "enemy.png", "enemy_bullet.png", "heart.png", "hp.png", "plane.png"];

let loadedImgCount: number = 0;

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
    for (let i = 0, len = imgArr.length; i < len; i++) {  // for 要比 forEach,map 等效率高不少，，在v8下
        let name = imgArr[i].src.replace(/^[^\/]*\/|\.[^\.]+$/g, '');
        if (name != 'bg') imgDict[name] = imgArr[i];
    }
})();