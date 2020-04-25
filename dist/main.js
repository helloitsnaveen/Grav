/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Canvas Setup //\nconst canvas = document.querySelector('canvas');\nconst c = canvas.getContext('2d');\n\ncanvas.width = window.innerWidth; \ncanvas.height = 80/100 * window.innerHeight;\n\n// Initial Helper Objects, Functions, and Event Listeners // \nconst mouse = {\n    x: undefined,\n    y: undefined,\n};\n\nfunction randomIntFromRange(min, max) {\n    return Math.floor(Math.random() * (max - min + 1) + min);\n};\n\naddEventListener('mousemove', e => {\n    mouse.x = e.x;\n    mouse.y = e.y;\n});\n\n// Main Circle Class //\nclass Circle {\n    constructor(posx, posy, dx, dy, minRad, maxRad, fillColor) {\n        this.posx = posx; \n        this.posy = posy; \n\n        this.vel = {\n            x: dx, \n            y: dy,\n        };\n\n        this.rad = minRad; \n        this.minRad = minRad; \n        this.maxRad = maxRad; \n\n        this.fillColor = fillColor;\n    };\n\n    draw() {\n        c.beginPath(); \n        c.arc(this.posx, this.posy, this.rad, 0, Math.PI * 2, false);\n\n        c.fillStyle = this.fillColor; \n        c.strokeStyle = 'black';\n\n        c.fill();\n        c.stroke();\n        c.closePath();\n    }; \n\n\n    // fka update()\n    float() {\n        if (this.posx + this.rad > innerWidth || this.posx - this.rad < 0) {\n            this.vel.x = -this.vel.x;\n        }; \n\n        if (this.posy + this.rad > (80/100 * innerHeight) || this.posy - this.rad < 0) {\n            this.vel.y = -this.vel.y;\n        };\n\n        this.posx += this.vel.x;\n        this.posy += this.vel.y;\n\n        // interactivity // \n        if (mouse.x - this.posx < 130 && mouse.x - this.posx > -130 &&\n            mouse.y - this.posy < 130 && mouse.y - this.posy > -130\n        ) {\n            if (this.rad < this.maxRad) {\n                this.rad += 1;\n            };\n        } else if (this.rad > this.minRad) {\n            this.rad -= 1;\n        };\n\n        this.draw();\n    };\n\n    gravity(gravity, friction) {\n        if (this.posy + this.minRad >= (80/100 * innerHeight) && this.vel.y >= 0) {\n            this.vel.y = -this.vel.y * friction;\n        } else {\n            this.vel.y += gravity;\n        };\n\n        if (this.posx + this.minRad + this.vel.x > innerWidth || this.posx - this.minRad <= 0) {\n            this.vel.x = -this.vel.x;\n        };\n\n        this.posx += this.vel.x;\n        this.posy += this.vel.y;\n        this.draw();\n    };\n};\n\n// Main Program Class //\nclass Program {\n    constructor(numCircles, minRad, maxRad, speed) {\n        this.circles = []; // array of all circles\n\n        this.numCircles = numCircles; \n\n        this.rad = minRad; \n        this.maxRad = maxRad;\n\n        this.speed = speed; \n\n        this.colorPalettes = [\n            ['#EAF7CF', '#EBEFBF', '#CEB5A7', '#92828D', '#ADAABF'],\n            ['#FF5E5B', '#D8D8D8', '#FFFFEA', '#00CECB', '#FFED66'],\n            ['#241023', '#6B0504', '#A3320B', '#D5E68D', '#47A025'],\n            ['#E88D67', '#BB999C', '#9999C3', '#7B8CDE', '#C0E6DE'],\n            ['#58355E', '#E03616', '#FFF689', '#CFFFB0', '#5998C5'],\n            ['#FCB97D', '#EDD892', '#C6B89E', '#B5B8A3', '#AABA9E'],\n            ['#120309', '#2E0F15', '#70163C', '#95B2B8', '#307351'],\n            ['#0C1618', '#004643', '#FAF4D3', '#D1AC00', '#F6BE9A'],\n            ['#00BFB2', '#1A5E63', '#028090', '#F0F3BD', '#C64191'],\n            ['#586994', '#7D869C', '#A2ABAB', '#B4C4AE', '#E5E8B6'],\n            ['#8B1E3F', '#3C153B', '#89BD9E', '#F0C987', '#DB4C40'],\n            ['#272838', '#F3DE8A', '#EB9486', '#7E7F9A', '#F9F8F8'],\n            ['#931621', '#28464B', '#326771', '#2C8C99', '#42D9C8'],\n            ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551'],\n        ]; \n\n        this.circle = this.circle.bind(this);\n        this.floatInit = this.floatInit.bind(this);\n        this.gravityInit = this.gravityInit.bind(this);\n        this.floatAnimate = this.floatAnimate.bind(this);\n        this.gravityAnimate = this.gravityAnimate.bind(this);\n    };\n\n    circle() {\n        return ({\n            x: Math.random() * (innerWidth - this.rad * 2) + this.rad, \n            y: Math.random() * ((80/100 * innerHeight) - this.rad * 2) + this.rad,\n            vel: {\n                x: (Math.random() - 0.5) * this.speed, \n                y: (Math.random() - 0.5) * this.speed,\n            }, \n            minRad: this.rad, \n            maxRad: this.maxRad,\n        });\n    };\n\n    // use this to clear screen\n    clear() {\n        this.circles = [];\n    };\n\n    floatInit() {\n        this.colorArray = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];\n        const randomColor = (colorArray) => {\n            return(colorArray[Math.floor(Math.random() * this.colorArray.length)])\n        };\n\n        for(let i = 0; i < this.numCircles; i++) {\n            this.circles.push(new Circle(this.circle().x, this.circle().y, this.circle().vel.x, this.circle().vel.y, this.circle().minRad, this.circle().maxRad, randomColor(this.colorArray)))\n        };\n    };\n\n    gravityInit() {\n        this.colorArray = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];\n        const randomColor = colorArray => {\n            return(colorArray[Math.floor(Math.random() * this.colorArray.length)])\n        };\n\n        for (let i = 0; i < this.numCircles; i++) {\n            const radius = randomIntFromRange(8, 20);\n            const x = randomIntFromRange(0, canvas.width - 30);\n            const y = randomIntFromRange(0, canvas.height - 100);\n\n            const dx = randomIntFromRange(-2, 2);\n            const dy = randomIntFromRange(-2, 2);\n            this.circles.push(new Circle(x, y, dx, dy, radius, radius, randomColor(this.colorArray)))\n        };\n\n        // log of circles array\n        // console.log(this.circles); \n    };\n\n    floatAnimate() {\n        requestAnimationFrame(this.floatAnimate); \n        c.clearRect(0, 0, innerWidth, (80/100 * innerHeight)); \n\n        for(let i = 0; i < this.circles.length; i++) {\n            this.circles[i].float()\n        };\n    };\n\n    gravityAnimate() {\n        requestAnimationFrame(this.gravityAnimate); \n        c.clearRect(0, 0, innerWidth, (80/100 * innerHeight)); \n\n        for(let i = 0; i < this.circles.length; i++) {\n            // this.circles[i].gravity(this.speed, 0.9) // acceleration here\n            this.circles[i].gravity(0.5, 1) // acceleration here\n        };\n    };\n\n    floatRun() {\n        this.floatInit();\n        this.floatAnimate();\n    };\n\n    gravityRun() {\n        // this.gravityInit();\n        this.gravityAnimate();\n    };\n\n    run() {\n        // this.gravityRun();\n        // this.floatRun();\n\n        // figure out how to use same circles array, all circles should both bounce and expand\n    }\n};\n\n// Main Executables and Event Listeners //\n\n// Main execute function, pass as callback as needed.\nlet numCircles = parseInt(document.getElementById('num-circles-range').value);\nlet minRad = parseInt(document.getElementById('min-rad-range').value);\nlet maxRad = parseInt(document.getElementById('max-rad-range').value);\nlet speedRange = parseInt(document.getElementById('speed-range').value);\n\nlet userProgram = new Program(numCircles, minRad, maxRad, speedRange);\n\nlet gravity = false; \n\nconst gravityProgram = () => {\n    userProgram.gravityRun();\n    gravity = true; \n};\n\nconst floatProgram = () => {\n    userProgram.floatRun();\n    gravity = false; \n};\n\n\n// Execute upon range input changes, doesn't work with keyboard change\ndocument.getElementById('range-submit').addEventListener('click', () => {\n    gravityProgram();\n});\n\naddEventListener('resize', () => {\n    canvas.width = innerWidth;\n    canvas.height = 80 / 100 * innerHeight;\n\n    floatProgram();\n});\n\n// document.addEventListener('keyup', (e) => {\n//     if (gravity && e.code === 'Space') {\n//         numCircles = parseInt(document.getElementById('num-circles-range').value);\n//         minRad = parseInt(document.getElementById('min-rad-range').value);\n//         maxRad = parseInt(document.getElementById('max-rad-range').value);\n//         speedRange = 1;\n\n//         userProgram.clear();\n//         floatProgram();\n//         gravity = false;\n//         console.log('back to float');\n//     } else if (e.code === 'Space' && !gravity) {\n//         speedRange = parseInt(document.getElementById('speed-range').value);\n\n//         gravityProgram();\n//         gravity = true; \n//         console.log('over to gravity');\n//     };\n// });\n\n// document.addEventListener('keyup', (e) => {\n//     if (!gravity)\n// })\n\ndocument.addEventListener('keyup', (e) => {\n    if (e.code === 'KeyT') {\n        numCircles = parseInt(document.getElementById('num-circles-range').value);\n        minRad = parseInt(document.getElementById('min-rad-range').value);\n        maxRad = parseInt(document.getElementById('max-rad-range').value);\n        speedRange = parseInt(document.getElementById('speed-range').value);\n\n        userProgram.clear();\n        floatProgram();\n    }\n});\n\nconst ranges = document.getElementsByClassName('range-sliders');\nfor(let i = 0; i < ranges.length; i++) {\n    ranges[i].addEventListener('mouseup', () => {\n        userProgram.clear();\n        console.log(numCircles)\n        console.log(document.getElementById('num-circles-range').value)\n\n        numCircles = parseInt(document.getElementById('num-circles-range').value);\n        minRad = parseInt(document.getElementById('min-rad-range').value);\n        maxRad = parseInt(document.getElementById('max-rad-range').value);\n        speedRange = parseInt(document.getElementById('speed-range').value);\n        \n        userProgram = new Program(numCircles, minRad, maxRad, speedRange);\n        floatProgram();\n    })\n};\n\nwindow.onload = () => {\n    floatProgram();\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });