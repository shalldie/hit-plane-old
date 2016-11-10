/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// 通过jsonp来下载资源，类 requirejs
	window['hitplane_define'] = function (name, src) {
	    onLoadFile(name, src);
	};
	// 图片资源
	var sourceArr = ["bg.jpg", "boom.png", "bullet01.png", "bullet02.png", "bullet03.png", "enemy.png", "enemy_bullet.png", "heart.png", "hp.png", "plane.png"];
	var dict = {};
	var num = 0;
	sourceArr.map(function (n) {
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
	    if (num >= sourceArr.length) {
	        // return;
	        window['hitplane_source'] = dict;
	        onInvoke(null, true);
	        var script = document.createElement('script');
	        script.src = "dist/hitplane.js";
	        document.body.appendChild(script);
	    }
	    else {
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
	function onInvoke(name, state) {
	    if (state === true) {
	        loading.style.display = 'none';
	        console.log('所有资源加载完毕...');
	    }
	    else {
	        loading.innerHTML = state;
	        console.log(name + '加载完毕...');
	    }
	}


/***/ }
/******/ ]);