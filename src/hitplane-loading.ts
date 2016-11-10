// 通过jsonp来下载资源，类 requirejs
window['hitplane_define'] = function (name, src) {
    onLoadFile(name, src);
};

// 图片资源
let sourceArr = ["bg.jpg", "boom.png", "bullet01.png", "bullet02.png", "bullet03.png", "enemy.png", "enemy_bullet.png", "heart.png", "hp.png", "plane.png"];

let dict = {};

let num = 0;

sourceArr.map(n => {
    var img = new Image();
    img.onload = function () {
        onLoadFile(n.split('.')[0], img);
    };
    img.src = "src/img/" + n;
});

/**
 * 触发器
 */
function onLoadFile(name, img) {
    // 保存资源
    dict[name] = img;

    // 进度触发
    num++;
    if (num >= sourceArr.length) { // 加载完毕
        // return;
        window['hitplane_source'] = dict;

        onInvoke(null, true);
        let script = document.createElement('script');
        script.src = `dist/hitplane.js`;
        document.body.appendChild(script);

    } else { // 加载百分比
        onInvoke(name, ~~(num * 100 / sourceArr.length) + '%');
    }
}


var loading = document.getElementById('loading');

/**
 * 通知进度
 * 
 * @param {*} name
 * @param {*} state
 */
function onInvoke(name: any, state: any) {
    if (state === true) {
        loading.style.display = 'none';
        console.log('所有资源加载完毕...')
    } else {
        loading.innerHTML = state;
        console.log(name + '加载完毕...');
    }
}
