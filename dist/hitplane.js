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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Logic_1 = __webpack_require__(1);
	// import config from './config';
	var bg = document.getElementById("bg");
	var ele = document.getElementById("demo");
	ele.height = document.body.clientHeight * 2;
	ele.width = ele.height * 512 / 768;
	ele.style.cssText = "transform:translate3d(-50%,-50%,0) scale(.5)";
	bg.style.width = ele.width / 2 + "px";
	bg.style.height = ele.height + "px";
	var ctx = ele.getContext("2d");
	var logic = new Logic_1.default(ele.width, ele.height, ctx);
	logic.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils = __webpack_require__(2);
	/**
	 * 游戏逻辑类
	 *
	 * @export
	 * @class Logic
	 */
	var Logic = (function () {
	    function Logic(width, height, ctx) {
	        /**
	         * 敌军列表
	         *
	         * @private
	         * @type {Enemy[]}
	         * @memberOf Logic
	         */
	        this.enemyList = [];
	        /**
	         * 爆炸对象列表 💥
	         *
	         * @private
	         * @type {Boom[]}
	         * @memberOf Logic
	         */
	        this.boomList = [];
	        this.width = width;
	        this.height = height;
	        this.ctx = ctx;
	    }
	    Logic.prototype.start = function () {
	    };
	    Logic.prototype.checkIntersect = function () {
	        var i = 0, x = 0, y = 0, len = 0, len2 = 0;
	        var enemy;
	        // 自己子弹与敌军的检测
	        for (x = 0, len = this.enemyList.length; x < len; x++) {
	            enemy = this.enemyList[x];
	            for (y = 0, len2 = this.plane.bullets.length; y < len2; y++) {
	                if (utils.ifIntersect(enemy, this.plane.bullets[y])) {
	                }
	            }
	        }
	    };
	    Logic.prototype.onPaint = function () {
	        var i = 0, len = 0;
	        var bullet;
	        var enemy;
	        // 绘制自身子弹
	        for (i = 0, len = this.plane.bullets.length; i < len; i++) {
	            bullet = this.plane.bullets[i];
	            if (bullet.alive) {
	                bullet.onPaint(this.ctx);
	            }
	        }
	        // 绘制敌军
	        for (i = 0, len = this.enemyList.length; i < len; i++) {
	            enemy = this.enemyList[i];
	            if (enemy.alive) {
	                enemy.onPaint(this.ctx);
	            }
	        }
	        this.enemyList = this.enemyList.filter(function (n) { return n.alive; }); // 去除无效的飞机
	        // 绘制自身飞机
	        this.plane.onPaint(this.ctx);
	    };
	    return Logic;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Logic;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
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
	 * @param {onceCallback} onceCallback 当轮回之后进行的回调
	 */
	function imgSpirit(ctx, img, speed, baseTime, ifX, sum, tX, tY, tW, tH, onceCallback) {
	    if (sum <= 1) {
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
	    ctx.drawImage(img, ~~fX, ~~fY, ~~fW, ~~fH, tX, tY, tW, tH);
	    if (nowIndex + 1 >= sum) {
	        onceCallback && onceCallback();
	    }
	}
	exports.imgSpirit = imgSpirit;
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
	 */
	function imgDrawSingle(ctx, img, fX, fY, fW, fH, tX, tY, tW, tH) {
	    if (fX === void 0) { fX = 0; }
	    if (fY === void 0) { fY = 0; }
	    if (fW === void 0) { fW = img.width; }
	    if (fH === void 0) { fH = img.height; }
	    if (tX === void 0) { tX = 0; }
	    if (tY === void 0) { tY = 0; }
	    if (tW === void 0) { tW = img.width; }
	    if (tH === void 0) { tH = img.height; }
	    ctx.drawImage(img, fX, fY, fW, fH, tX, tY, tW, tH);
	}
	exports.imgDrawSingle = imgDrawSingle;
	/**
	 * 是否碰撞
	 *
	 * @export
	 * @param {Shape} obj1
	 * @param {Shape} obj2
	 * @returns {boolean}
	 */
	function ifIntersect(obj1, obj2) {
	    return !(obj1.x + obj1.realWidth / 2 < obj2.x + obj2.realWidth / 2 ||
	        obj1.y + obj1.realHeight / 2 < obj2.y + obj2.realHeight / 2 ||
	        obj2.x + obj2.realWidth / 2 < obj1.x + obj1.realWidth / 2 ||
	        obj2.y + obj2.realHeight / 2 < obj1.y + obj1.realHeight / 2);
	}
	exports.ifIntersect = ifIntersect;
	/**
	 *
	 *
	 * @export
	 * @param {any} callback
	 */
	function makeRequestAnimationFrame(callback) {
	    callback();
	    requestAnimationFrame(function () {
	        makeRequestAnimationFrame(callback);
	    });
	}
	exports.makeRequestAnimationFrame = makeRequestAnimationFrame;


/***/ }
/******/ ]);