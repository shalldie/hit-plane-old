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
	var ifPC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	var logic = new Logic_1.default(ele.width, ele.height, ctx, !ifPC);
	logic.start();
	if (ifPC) {
	    ele.addEventListener('mousemove', function (ex) {
	        logic.setPosition(ex.offsetX, ex.offsetY);
	    });
	}
	else {
	    var basePoint_1 = {
	        x: 0,
	        y: 0
	    };
	    ele.addEventListener('touchstart', function (ex) {
	        var touch = ex.touches[0];
	        basePoint_1 = {
	            x: touch.clientX,
	            y: touch.clientY
	        };
	    });
	    ele.addEventListener('touchmove', function (ex) {
	        var touch = ex.touches[0];
	        logic.offsetPosition((touch.clientX - basePoint_1.x) * 2, (touch.clientY - basePoint_1.y) * 2);
	        basePoint_1 = {
	            x: touch.clientX,
	            y: touch.clientY
	        };
	        ex.preventDefault();
	        ex.cancelBubble = true;
	    });
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils = __webpack_require__(2);
	var Boom_1 = __webpack_require__(3);
	var Enemy_1 = __webpack_require__(6);
	var Plane_1 = __webpack_require__(9);
	/**
	 * 游戏逻辑类
	 *
	 * @export
	 * @class Logic
	 */
	var Logic = (function () {
	    function Logic(width, height, ctx, ifPhone) {
	        /**
	         * 敌军列表
	         *
	         * @private
	         * @type {Enemy[]}
	         * @memberOf Logic
	         */
	        this.enemyList = [];
	        this.enemyBulletList = [];
	        this.bulletList = [];
	        /**
	         * 爆炸对象列表 💥
	         *
	         * @private
	         * @type {Boom[]}
	         * @memberOf Logic
	         */
	        this.boomList = [];
	        this.scale = 1;
	        this.width = width;
	        this.height = height;
	        this.ctx = ctx;
	        this.scale = this.height / 1200; // 等比缩放，保证在不同分辨率下比例一致，类似rem的效果
	        // console.log(height);
	        if (ifPhone) {
	            this.scale *= 1.3;
	        }
	        // this.scale = 1;
	    }
	    Logic.prototype.start = function () {
	        // let that = this;
	        this.newPlane();
	        setInterval(function () {
	            this.newEnemy();
	            // console.log(that.bulletList.length);
	        }.bind(this), 1500);
	        // this.newEnemy();
	        this.keepRefresh();
	    };
	    Logic.prototype.setPosition = function (x, y) {
	        this.plane.x = x;
	        this.plane.y = y;
	    };
	    Logic.prototype.offsetPosition = function (x, y) {
	        this.plane.x += x;
	        this.plane.y += y;
	    };
	    /**
	     * 出现新飞机
	     *
	     * @private
	     *
	     * @memberOf Logic
	     */
	    Logic.prototype.newPlane = function () {
	        this.plane = new Plane_1.default(this.width / 2, 0, 172, 200, this.scale);
	        this.plane.y = this.height - this.plane.height * this.scale;
	        this.plane.makeOpacity(0.5, 3000);
	        setInterval(function () {
	            this.plane.fire([
	                [0, 0],
	                [1, 1],
	                [1, 2],
	                [2, 1],
	                [2, 2]
	            ], this.bulletList);
	        }.bind(this), 110);
	    };
	    /**
	     * 新敌军
	     *
	     * @private
	     *
	     * @memberOf Logic
	     */
	    Logic.prototype.newEnemy = function () {
	        var x = this.width / 10 * ~~(Math.random() * 10 + 1);
	        var wid = 80 + Math.random() * 80;
	        var enemyType = ~~(Math.random() * 4);
	        var enemy = new Enemy_1.default(x, -x / 2, wid, enemyType, 100, this.scale);
	        if (enemy.x + enemy.width / 2 > this.width || enemy.x < enemy.width / 2) {
	            this.newEnemy();
	            return;
	        }
	        enemy.resetY(-enemy.height / 2);
	        enemy.speed *= Math.random() + 1;
	        this.enemyList.push(enemy);
	        var self = this;
	        var timer = setInterval(function () {
	            if (!enemy.alive) {
	                clearInterval(timer);
	                return;
	            }
	            self.enemyBulletList = self.enemyBulletList.concat(enemy.fire());
	        }, 800 + Math.random() * 500);
	    };
	    Logic.prototype.newBoom = function (x, y, width) {
	        var boom = new Boom_1.default(x, y, width, width, this.scale);
	        this.boomList.push(boom);
	    };
	    /**
	     * 开始帧动画
	     *
	     * @private
	     *
	     * @memberOf Logic
	     */
	    Logic.prototype.keepRefresh = function () {
	        var self = this;
	        utils.makeRequestAnimationFrame(function () {
	            self.checkIntersectAndOut(); // 碰撞检测和出界
	            self.onGC(); // 垃圾回收
	            self.onPaint(); // 绘制
	        }, null);
	    };
	    /**
	     * 碰撞检测，出界，并判断有效性
	     *
	     * @private
	     *
	     * @memberOf Logic
	     */
	    Logic.prototype.checkIntersectAndOut = function () {
	        var i = 0, x = 0, y = 0, len = 0, len2 = 0;
	        var enemy;
	        var bullet;
	        var enemyBullet;
	        // 自己子弹与敌军的检测
	        for (x = 0, len = this.enemyList.length; x < len; x++) {
	            enemy = this.enemyList[x];
	            for (y = 0, len2 = this.bulletList.length; y < len2; y++) {
	                bullet = this.bulletList[y];
	                if (bullet.alive && bullet.y + bullet.height < 0) {
	                    bullet.alive = false;
	                }
	                if (bullet.alive && enemy.alive && utils.ifIntersect(enemy, bullet)) {
	                    bullet.alive = false;
	                    enemy.HP -= bullet.ATK; // 扣除生命值
	                    enemy.makeOpacity(0.5, 10);
	                    if (enemy.HP <= 0) {
	                        enemy.HP = 0;
	                        enemy.alive = false;
	                        this.newBoom(enemy.x, enemy.y, enemy.width * 1.2);
	                    }
	                }
	            }
	        }
	        // 敌军子弹跟自己碰撞检测 
	        for (i = 0, len = this.enemyBulletList.length; i < len; i++) {
	            enemyBullet = this.enemyBulletList[i];
	            if (this.plane.alive && utils.ifIntersect(this.plane, enemyBullet)) {
	                // this.plane.alive = false;
	                enemyBullet.alive = false;
	                this.plane.makeOpacity(0.5, 2000);
	            }
	        }
	    };
	    /**
	     * 垃圾回收
	     *
	     * @private
	     *
	     * @memberOf Logic
	     */
	    Logic.prototype.onGC = function () {
	        var _this = this;
	        // this.bulletList = this.bulletList.filter(n => n.alive && n.y + n.height > 0);
	        this.enemyBulletList = this.enemyBulletList.filter(function (n) { return n.alive && n.y - n.height < _this.height; });
	        this.boomList = this.boomList.filter(function (n) { return n.alive; });
	        this.enemyList = this.enemyList.filter(function (n) { return n.alive && n.y < n.height + _this.height; });
	    };
	    Logic.prototype.onPaint = function () {
	        this.ctx.clearRect(0, 0, this.width, this.height);
	        var i = 0, len = 0;
	        var bullet;
	        var enemyBullet;
	        var enemy;
	        var boom;
	        try {
	            // 绘制自身子弹
	            for (i = 0, len = this.bulletList.length; i < len; i++) {
	                bullet = this.bulletList[i];
	                if (bullet.alive) {
	                    bullet.onPaint(this.ctx);
	                }
	            }
	            // 绘制敌军子弹
	            for (i = 0, len = this.enemyBulletList.length; i < len; i++) {
	                enemyBullet = this.enemyBulletList[i];
	                if (enemyBullet.alive) {
	                    enemyBullet.onPaint(this.ctx);
	                }
	            }
	            // 绘制敌军
	            for (i = 0, len = this.enemyList.length; i < len; i++) {
	                enemy = this.enemyList[i];
	                if (enemy.alive) {
	                    enemy.onPaint(this.ctx);
	                }
	            }
	            // 爆炸效果
	            for (i = 0, len = this.boomList.length; i < len; i++) {
	                boom = this.boomList[i];
	                if (boom.alive) {
	                    boom.onPaint(this.ctx);
	                }
	            }
	            // 绘制自身飞机
	            this.plane.onPaint(this.ctx);
	        }
	        catch (ex) {
	            console.log(ex);
	            throw ex;
	        }
	    };
	    return Logic;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * 游戏逻辑类
	 *
	 * @export
	 * @class Logic
	 */
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
	 * @param {number} globalAlpha 透明度
	 * @param {onceCallback} onceCallback 当轮回之后进行的回调
	 */
	function imgSpirit(ctx, img, speed, baseTime, ifX, sum, tX, tY, tW, tH, globalAlpha, onceCallback) {
	    if (globalAlpha === void 0) { globalAlpha = 1; }
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
	    ctx.save();
	    ctx.globalAlpha = globalAlpha;
	    ctx.drawImage(img, ~~fX, ~~fY, ~~fW, ~~fH, tX, tY, tW, tH);
	    ctx.restore();
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
	 * @param {number} [globalAlpha=1] 透明度
	 */
	function imgDrawSingle(ctx, img, fX, fY, fW, fH, tX, tY, tW, tH, globalAlpha) {
	    if (fX === void 0) { fX = 0; }
	    if (fY === void 0) { fY = 0; }
	    if (fW === void 0) { fW = img.width; }
	    if (fH === void 0) { fH = img.height; }
	    if (tX === void 0) { tX = 0; }
	    if (tY === void 0) { tY = 0; }
	    if (tW === void 0) { tW = img.width; }
	    if (tH === void 0) { tH = img.height; }
	    if (globalAlpha === void 0) { globalAlpha = 1; }
	    if (globalAlpha == 1) {
	        ctx.drawImage(img, fX, fY, fW, fH, tX, tY, tW, tH);
	    }
	    else {
	        ctx.save();
	        ctx.globalAlpha = globalAlpha;
	        ctx.drawImage(img, fX, fY, fW, fH, tX, tY, tW, tH);
	        ctx.restore();
	    }
	}
	exports.imgDrawSingle = imgDrawSingle;
	/**
	 * 绘制单一图片
	 *
	 * @export
	 * @param {CanvasRenderingContext2D} ctx 画布对象
	 * @param {HTMLCanvasElement} canvas 画布
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
	function canvasDrawSingle(ctx, canvas, fX, fY, fW, fH, tX, tY, tW, tH, globalAlpha) {
	    if (fX === void 0) { fX = 0; }
	    if (fY === void 0) { fY = 0; }
	    if (fW === void 0) { fW = canvas.width; }
	    if (fH === void 0) { fH = canvas.height; }
	    if (tX === void 0) { tX = 0; }
	    if (tY === void 0) { tY = 0; }
	    if (tW === void 0) { tW = canvas.width; }
	    if (tH === void 0) { tH = canvas.height; }
	    if (globalAlpha === void 0) { globalAlpha = 1; }
	    if (globalAlpha == 1) {
	        ctx.drawImage(canvas, fX, fY, fW, fH, tX, tY, tW, tH);
	    }
	    else {
	        ctx.save();
	        ctx.globalAlpha = globalAlpha;
	        ctx.drawImage(canvas, fX, fY, fW, fH, tX, tY, tW, tH);
	        ctx.restore();
	    }
	}
	exports.canvasDrawSingle = canvasDrawSingle;
	/**
	 * 是否碰撞
	 *
	 * @export
	 * @param {Shape} obj1
	 * @param {Shape} obj2
	 * @returns {boolean}
	 */
	function ifIntersect(obj1, obj2) {
	    return !(obj1.x + obj1.realWidth / 2 < obj2.x - obj2.realWidth / 2 ||
	        obj1.y + obj1.realHeight / 2 < obj2.y - obj2.realHeight / 2 ||
	        obj2.x + obj2.realWidth / 2 < obj1.x - obj1.realWidth / 2 ||
	        obj2.y + obj2.realHeight / 2 < obj1.y - obj1.realHeight / 2);
	}
	exports.ifIntersect = ifIntersect;
	/**
	 *
	 *
	 * @export
	 * @param {function} callback
	 * @param {number} interval
	 */
	function makeRequestAnimationFrame(callback, interval) {
	    if (interval) {
	        setInterval(callback, interval);
	        return;
	    }
	    callback();
	    requestAnimationFrame(function () {
	        makeRequestAnimationFrame(callback);
	    });
	}
	exports.makeRequestAnimationFrame = makeRequestAnimationFrame;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var imgBase64_1 = __webpack_require__(4);
	var Shape_1 = __webpack_require__(5);
	var utils_1 = __webpack_require__(2);
	/**
	 * 爆炸 ， 现充都去爆炸吧！！！
	 *
	 * @export
	 * @class Boom
	 * @extends {Shape}
	 */
	var Boom = (function (_super) {
	    __extends(Boom, _super);
	    function Boom(x, y, width, height, scale) {
	        var _this = _super.call(this, x, y, width, height, scale) || this;
	        _this.img = imgBase64_1.imgBoom;
	        _this.imgSum = 14;
	        _this.colourSpeed = 40;
	        return _this;
	    }
	    Boom.prototype.onPaint = function (ctx) {
	        var self = this;
	        utils_1.imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, true, 14, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale, 1, function () {
	            self.alive = false;
	        });
	    };
	    return Boom;
	}(Shape_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * 爆炸 ， 现充都去爆炸吧！！！
	 *
	 * @export
	 * @class Boom
	 * @extends {Shape}
	 */
	exports.default = Boom;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var source = window["hitplane_source"];
	exports.imgPlane = source["plane"];
	exports.imgBoom = source["boom"];
	exports.imgBulletArr = [
	    source["bullet01"],
	    source["bullet02"],
	    source["bullet03"],
	    source["enemy_bullet"]
	];
	exports.imgHP = source["hp"]; // HP 图片
	exports.imgEnemy = source["enemy"]; // 敌军飞机图片
	exports.imgHeart = source["heart"]; // ❤️ 图片


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(2); // 精灵渲染辅助方法
	/**
	 * 形状类，基类
	 *
	 * @class Shape
	 */
	var Shape = (function () {
	    /**
	     * Creates an instance of Shape.
	     *
	     * @param {number} x
	     * @param {number} y
	     * @param {number} width
	     * @param {number} height
	     * @param {number} scale
	     */
	    function Shape(x, y, width, height, scale) {
	        /**
	         * 是否 生存/可用
	         *
	         * @public
	         * @type {boolean}
	         * @memberOf Shape
	         */
	        this.alive = true;
	        /**
	         * 创建时间
	         *
	         * @public
	         * @type {Date}
	         * @memberOf Shape
	         */
	        this.createTime = new Date();
	        /**
	         * 图片是否是x轴展开
	         *
	         * @protected
	         * @type {boolean}
	         * @memberOf Shape
	         */
	        this.ifImgX = true;
	        /**
	         * 图片帧数量
	         *
	         * @protected
	         * @type {number}
	         * @memberOf Shape
	         */
	        this.imgSum = 1;
	        this.opacity = 1;
	        this.x = x;
	        this.y = y;
	        this.width = width;
	        this.height = height;
	        this.realWidth = width * scale;
	        this.realHeight = height * scale;
	        this.scale = scale;
	    }
	    Object.defineProperty(Shape.prototype, "x", {
	        get: function () {
	            return this._x;
	        },
	        set: function (num) {
	            this._x = ~~num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shape.prototype, "y", {
	        get: function () {
	            return this._y;
	        },
	        set: function (num) {
	            this._y = ~~num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shape.prototype, "width", {
	        get: function () {
	            return this._width;
	        },
	        set: function (num) {
	            this._width = ~~num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shape.prototype, "height", {
	        get: function () {
	            return this._height;
	        },
	        set: function (num) {
	            this._height = ~~num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shape.prototype, "realWidth", {
	        get: function () {
	            return this._realWidth;
	        },
	        set: function (num) {
	            this._realWidth = ~~num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shape.prototype, "realHeight", {
	        get: function () {
	            return this._realHeight;
	        },
	        set: function (num) {
	            this._realHeight = ~~num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * 持续一段时间半透明
	     *
	     * @param {number} opacity
	     * @param {number} last
	     *
	     * @memberOf Shape
	     */
	    Shape.prototype.makeOpacity = function (opacity, last) {
	        this.opacity = opacity;
	        this.opacityTime = new Date();
	        this.opacityLast = last;
	    };
	    /**
	     * 画出来,show yourself!
	     *
	     * @param {CanvasRenderingContext2D} [ctx]
	     *
	     * @memberOf Shape
	     */
	    Shape.prototype.onPaint = function (ctx) {
	        if (!this.alive)
	            return;
	        var opa = 1;
	        if (this.opacity != 1 && new Date().getTime() - this.opacityTime.getTime() < this.opacityLast) {
	            opa = this.opacity;
	        }
	        utils_1.imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, this.ifImgX, this.imgSum, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, opa);
	    };
	    return Shape;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Shape;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Shape_1 = __webpack_require__(5);
	var utils_1 = __webpack_require__(2);
	var imgBase64_1 = __webpack_require__(4);
	var Bullet_1 = __webpack_require__(7);
	var AI_1 = __webpack_require__(8);
	var areaArr = [
	    {
	        x: 0,
	        y: 0,
	        w: 103,
	        h: 74
	    }, {
	        x: 218 - 97,
	        y: 0,
	        w: 97,
	        h: 75
	    }, {
	        x: 0,
	        y: 164 - 81,
	        w: 113,
	        h: 81
	    }, {
	        x: 218 - 100,
	        y: 164 - 76,
	        w: 100,
	        h: 76
	    }
	];
	/**
	 * 飞机类型
	 *
	 * @export
	 * @enum {number}
	 */
	(function (EnemyType) {
	    /**
	     * 黄色小飞机
	     */
	    EnemyType[EnemyType["Yello"] = 0] = "Yello";
	    /**
	     * 白色小飞机
	     */
	    EnemyType[EnemyType["White"] = 1] = "White";
	    /**
	     * 红色双螺旋桨飞机
	     */
	    EnemyType[EnemyType["Red"] = 2] = "Red";
	    /**
	     * 绿色双螺旋桨飞机
	     */
	    EnemyType[EnemyType["Green"] = 3] = "Green";
	})(exports.EnemyType || (exports.EnemyType = {}));
	var EnemyType = exports.EnemyType;
	/**
	 * 敌军
	 *
	 * @export
	 * @class Enemy
	 * @extends {Shape}
	 */
	var Enemy = (function (_super) {
	    __extends(Enemy, _super);
	    // public 
	    function Enemy(x, y, width, enemyType, hp, scale) {
	        var _this;
	        var area = areaArr[enemyType];
	        var height = width * area.h / area.w;
	        _this = _super.call(this, x, y, width, height, scale) || this;
	        _this.area = area;
	        _this.img = imgBase64_1.imgEnemy;
	        _this.HP = hp;
	        _this.maxHP = hp;
	        // this.realWidth = width * this.scale;
	        _this.baseX = x;
	        _this.baseY = y;
	        _this.ai = new AI_1.default();
	        _this.speed = 0.1;
	        _this.cacheImg();
	        return _this;
	    }
	    /**
	     * 缓存，性能优化
	     *
	     * @private
	     *
	     * @memberOf Enemy
	     */
	    Enemy.prototype.cacheImg = function () {
	        this.cacheCanvas = document.createElement('canvas');
	        this.cacheCanvas.width = this.realWidth;
	        this.cacheCanvas.height = this.realHeight;
	        var cacheCtx = this.cacheCanvas.getContext('2d');
	        // 先在缓存画布上画一次
	        utils_1.imgDrawSingle(cacheCtx, this.img, this.area.x, this.area.y, this.area.w, this.area.h, 0, 0, this.realWidth, this.realHeight);
	    };
	    Enemy.prototype.resetY = function (y) {
	        this.baseY = y;
	        this.y = y;
	    };
	    /**
	     * 开火
	     *
	     * @returns {EnemyBullet[]}
	     *
	     * @memberOf Enemy
	     */
	    Enemy.prototype.fire = function () {
	        return [new Bullet_1.EnemyBullet(this.x, this.y + this.height / 2 + 2, this.width / 2, this.scale)];
	    };
	    /**
	     * 绘制自身
	     *
	     * @param {CanvasRenderingContext2D} ctx
	     *
	     * @memberOf Enemy
	     */
	    Enemy.prototype.onPaint = function (ctx) {
	        if (!this.cacheCanvas)
	            return;
	        // this.ai.behave(this);
	        var timeNow = new Date();
	        this.ai.behave(this, timeNow, this.scale); // ai 行为
	        var opa = 1;
	        if (this.opacity != 1 && timeNow.getTime() - this.opacityTime.getTime() < this.opacityLast) {
	            opa = this.opacity;
	        }
	        // 血条
	        utils_1.imgDrawSingle(ctx, imgBase64_1.imgHP, 0, 0, imgBase64_1.imgHP.width, imgBase64_1.imgHP.height, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2 - 20 * this.scale, this.width * this.scale * this.HP / this.maxHP, 10 * this.scale);
	        // imgDrawSingle(
	        //     ctx,
	        //     this.img,
	        //     this.area.x,
	        //     this.area.y,
	        //     this.area.w,
	        //     this.area.h,
	        //     this.x - this.width * this.scale / 2,
	        //     this.y - this.height * this.scale / 2,
	        //     this.width * this.scale,
	        //     this.height * this.scale
	        // );
	        // imgDrawSingle(ctx,imghp)
	        // 自身
	        if (opa == 1) {
	            ctx.drawImage(this.cacheCanvas, this.x - this.realWidth / 2, this.y - this.realHeight / 2);
	        }
	        else {
	            ctx.save();
	            ctx.globalAlpha = opa;
	            ctx.drawImage(this.cacheCanvas, this.x - this.realWidth / 2, this.y - this.realHeight / 2);
	            ctx.restore();
	        }
	        // canvasDrawSingle(
	        //     ctx,
	        //     this.cacheCanvas,
	        //     0,
	        //     0,
	        //     this.realWidth,
	        //     this.realHeight,
	        //     this.x - this.realWidth / 2,
	        //     this.y - this.realHeight / 2,
	        //     this.realWidth,
	        //     this.realHeight,
	        //     opa
	        // );
	        // ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	    };
	    return Enemy;
	}(Shape_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * 敌军
	 *
	 * @export
	 * @class Enemy
	 * @extends {Shape}
	 */
	exports.default = Enemy;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Shape_1 = __webpack_require__(5);
	var imgBase64_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(2); // 精灵渲染辅助方法
	/**
	 * 子弹
	 *
	 * @export
	 * @class Bullet
	 * @extends {Shape}
	 */
	var Bullet = (function (_super) {
	    __extends(Bullet, _super);
	    function Bullet(x, y, width, height, typeIndex, scale) {
	        if (typeIndex === void 0) { typeIndex = 0; }
	        if (scale === void 0) { scale = 1; }
	        var _this = _super.call(this, x, y, width, height, scale) || this;
	        _this.typeIndex = 0;
	        _this.ATK = 10;
	        /**
	         * 子弹飞行速度，每多少毫秒移动一个单位长度
	         *
	         * @protected
	         * @type {number}
	         * @memberOf Bullet
	         */
	        _this.speedSpan = 0.34;
	        _this.resetBullet(x, y, width, height, typeIndex, scale);
	        _this.makeCache();
	        return _this;
	    }
	    Bullet.prototype.makeCache = function () {
	        this.cacheCanvas = document.createElement('canvas');
	        this.cacheCanvas.width = this.realWidth;
	        this.cacheCanvas.height = this.realHeight;
	        var cacheCtx = this.cacheCanvas.getContext('2d');
	        cacheCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.cacheCanvas.width, this.cacheCanvas.height);
	    };
	    Bullet.prototype.resetBullet = function (x, y, width, height, typeIndex, scale) {
	        if (typeIndex === void 0) { typeIndex = 0; }
	        if (scale === void 0) { scale = 1; }
	        this.x = x;
	        this.y = y;
	        this.width = width;
	        this.height = height;
	        this.img = imgBase64_1.imgBulletArr[typeIndex];
	        this.baseY = y;
	        this.speedSpan = 0.34 / scale;
	        this.speedSpan = (0.34 + 0.12 * typeIndex) / scale;
	        this.typeIndex = typeIndex;
	        this.alive = true;
	        this.createTime = new Date();
	    };
	    Bullet.prototype.onPaint = function (ctx) {
	        var timeSpan = new Date().getTime() - this.createTime.getTime();
	        this.y = this.baseY - ~~(timeSpan / this.speedSpan);
	        ctx.drawImage(this.cacheCanvas, this.x - this.realWidth / 2, this.y - this.realHeight / 2);
	    };
	    return Bullet;
	}(Shape_1.default));
	exports.Bullet = Bullet;
	var EnemyBullet = (function (_super) {
	    __extends(EnemyBullet, _super);
	    function EnemyBullet(x, y, width, scale) {
	        if (scale === void 0) { scale = 1; }
	        var _this = _super.call(this, x, y, width, width, 3, scale) || this;
	        _this.speedSpan = 3 / scale;
	        return _this;
	    }
	    EnemyBullet.prototype.onPaint = function (ctx) {
	        var timeSpan = new Date().getTime() - this.createTime.getTime();
	        this.y = this.baseY + ~~(timeSpan / this.speedSpan);
	        utils_1.imgSpirit(ctx, this.img, 300, this.createTime, true, 3, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale);
	    };
	    return EnemyBullet;
	}(Bullet));
	exports.EnemyBullet = EnemyBullet;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	(function (BehaveType) {
	    BehaveType[BehaveType["Normal"] = 0] = "Normal";
	    BehaveType[BehaveType["Shake"] = 1] = "Shake";
	    BehaveType[BehaveType["Crooked"] = 2] = "Crooked";
	    BehaveType[BehaveType["Boss"] = 3] = "Boss";
	})(exports.BehaveType || (exports.BehaveType = {}));
	var BehaveType = exports.BehaveType;
	var AI = (function () {
	    function AI() {
	        this.behaveType = 0;
	    }
	    AI.prototype.behave = function (enemy, timeNow, scale) {
	        if (scale === void 0) { scale = 1; }
	        var behaveArr = [
	            this.getNormalBehave
	        ];
	        behaveArr[this.behaveType](enemy, timeNow, scale);
	    };
	    AI.prototype.getNormalBehave = function (enemy, timeNow, scale) {
	        if (scale === void 0) { scale = 1; }
	        var timeDiff = timeNow.getTime() - enemy.createTime.getTime();
	        enemy.y = enemy.baseY + (timeDiff * enemy.speed) * scale;
	    };
	    AI.prototype.getShakeBehave = function (enemy, timeNow) {
	    };
	    return AI;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AI;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var imgBase64_1 = __webpack_require__(4);
	var Shape_1 = __webpack_require__(5);
	var utils_1 = __webpack_require__(2);
	var Bullet_1 = __webpack_require__(7);
	/**
	 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
	 *
	 * @export
	 * @class Plane
	 * @extends {Shape}
	 */
	var Plane = (function (_super) {
	    __extends(Plane, _super);
	    function Plane(x, y, width, height, scale) {
	        var _this = _super.call(this, x, y, width, height, scale) || this;
	        _this.img = imgBase64_1.imgPlane;
	        _this.imgSum = 11;
	        _this.colourSpeed = 50;
	        _this.realWidth = width * 0.5;
	        _this.realHeight = height * 0.5;
	        _this.maxHP = 100;
	        _this.HP = _this.maxHP;
	        return _this;
	    }
	    Plane.prototype.fire = function (option, bulletList) {
	        // 发射间隔
	        // if (+new Date - this.lastFireTime.getTime() < this.fireSpan) {
	        //     return;
	        // }
	        // this.lastFireTime = new Date();
	        var sumNow = 0; // 当前子弹数量
	        var sumNum = option.length; // 需要的子弹数量
	        var i = 0;
	        var len = bulletList.length;
	        var bullet;
	        for (; i < len; i++) {
	            if (sumNow >= sumNum)
	                break; // 如果够了就停下来
	            bullet = bulletList[i];
	            if (!bullet.alive && bullet.typeIndex == option[sumNow][0]) {
	                this.resetBullet(bullet, option[sumNow][0], option[sumNow][1]);
	                // console.log(1);
	                sumNow++;
	            }
	        }
	        while (sumNow < sumNum) {
	            bulletList.push(this.resetBullet(null, option[sumNow][0], option[sumNow][1]));
	            sumNow++;
	        }
	    };
	    /**
	     * 重置子弹类型
	     *
	     * @private
	     * @param {Bullet} bullet
	     * @param {number} typeIndex
	     * @param {number} typeMark
	     * @returns {Bullet}
	     *
	     * @memberOf Plane
	     */
	    Plane.prototype.resetBullet = function (bullet, typeIndex, typeMark) {
	        if (typeMark === void 0) { typeMark = 0; }
	        var offsetArr = [8, 25, 50];
	        var x = this.x + [0, -1, 1][typeMark] * offsetArr[typeIndex];
	        if (bullet) {
	            bullet.resetBullet(x, this.y - this.height / 2, 96, 96, typeIndex, this.scale);
	        }
	        else {
	            bullet = new Bullet_1.Bullet(x, this.y - this.height / 2, 96, 96, typeIndex, this.scale);
	        }
	        return bullet;
	    };
	    Plane.prototype.onPaint = function (ctx) {
	        if (!this.alive)
	            return;
	        var opa = 1;
	        // 半透明状态
	        if (this.opacity != 1 && new Date().getTime() - this.opacityTime.getTime() < this.opacityLast) {
	            opa = this.opacity;
	        }
	        else if (this.opacity != 1) {
	            opa = 1;
	        }
	        utils_1.imgSpirit(ctx, this.img, this.colourSpeed, this.createTime, this.ifImgX, this.imgSum, this.x - this.width * this.scale / 2, this.y - this.height * this.scale / 2, this.width * this.scale, this.height * this.scale, opa);
	        // 绘制 HP
	        // imgDrawSingle(ctx, imghp, 0, 0, imghp.width, imghp.height, this.x - this.width / 2, this.y - this.height / 2 - 20, this.width * this.HP / this.maxHP, 10, 1);
	        // ctx.strokeRect(this.x - this.realWidth / 2, this.y - this.realHeight / 2, this.realWidth, this.realHeight);
	        // this.drawBullets(ctx);
	    };
	    return Plane;
	}(Shape_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * 飞机，打飞机~ 大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～
	 *
	 * @export
	 * @class Plane
	 * @extends {Shape}
	 */
	exports.default = Plane;


/***/ }
/******/ ]);