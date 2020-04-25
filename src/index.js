// Canvas Setup //
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth; 
canvas.height = 80/100 * window.innerHeight;

// Initial Helper Objects, Functions, and Event Listeners // 
const mouse = {
    x: undefined,
    y: undefined,
};

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Main Circle Class //
class Circle {
    constructor(posx, posy, dx, dy, minRad, maxRad, fillColor) {
        this.posx = posx; 
        this.posy = posy; 

        this.vel = {
            x: dx, 
            y: dy,
        };

        this.rad = minRad; 
        this.minRad = minRad; 
        this.maxRad = maxRad; 

        this.fillColor = fillColor;
    };

    draw() {
        c.beginPath(); 
        c.arc(this.posx, this.posy, this.rad, 0, Math.PI * 2, false);

        c.fillStyle = this.fillColor; 
        c.strokeStyle = this.fillColor;

        c.fill();
        c.stroke();
        c.closePath();
    }; 


    // fka update()
    float() {
        if (this.posx + this.rad > innerWidth || this.posx - this.rad < 0) {
            this.vel.x = -this.vel.x;
        }; 

        if (this.posy + this.rad > (80/100 * innerHeight) || this.posy - this.rad < 0) {
            this.vel.y = -this.vel.y;
        };

        this.posx += this.vel.x;
        this.posy += this.vel.y;

        // interactivity // 
        if (mouse.x - this.posx < 130 && mouse.x - this.posx > -130 &&
            mouse.y - this.posy < 130 && mouse.y - this.posy > -130
        ) {
            if (this.rad < this.maxRad) {
                this.rad += 1;
            };
        } else if (this.rad > this.minRad) {
            this.rad -= 1;
        };

        this.draw();
    };

    gravity(gravity, friction) {
        if (this.posy + this.minRad >= (80/100 * innerHeight) && this.vel.y >= 0) {
            this.vel.y = -this.vel.y * friction;
        } else {
            this.vel.y += gravity;
        };

        if (this.posx + this.minRad + this.vel.x > innerWidth || this.posx - this.minRad <= 0) {
            this.vel.x = -this.vel.x;
        };

        this.posx += this.vel.x;
        this.posy += this.vel.y;
        this.draw();
    };
};

// Main Program Class //
class Program {
    constructor(numCircles, minRad, maxRad, speed) {
        this.circles = []; // array of all circles

        this.numCircles = numCircles; 

        this.rad = minRad; 
        this.maxRad = maxRad;

        this.speed = speed; 

        this.colorPalettes = [
            ['#EAF7CF', '#EBEFBF', '#CEB5A7', '#92828D', '#ADAABF'],
            ['#FF5E5B', '#D8D8D8', '#FFFFEA', '#00CECB', '#FFED66'],
            ['#241023', '#6B0504', '#A3320B', '#D5E68D', '#47A025'],
            ['#E88D67', '#BB999C', '#9999C3', '#7B8CDE', '#C0E6DE'],
            ['#58355E', '#E03616', '#FFF689', '#CFFFB0', '#5998C5'],
            ['#FCB97D', '#EDD892', '#C6B89E', '#B5B8A3', '#AABA9E'],
            ['#120309', '#2E0F15', '#70163C', '#95B2B8', '#307351'],
            ['#0C1618', '#004643', '#FAF4D3', '#D1AC00', '#F6BE9A'],
            ['#00BFB2', '#1A5E63', '#028090', '#F0F3BD', '#C64191'],
            ['#586994', '#7D869C', '#A2ABAB', '#B4C4AE', '#E5E8B6'],
            ['#8B1E3F', '#3C153B', '#89BD9E', '#F0C987', '#DB4C40'],
            ['#272838', '#F3DE8A', '#EB9486', '#7E7F9A', '#F9F8F8'],
            ['#931621', '#28464B', '#326771', '#2C8C99', '#42D9C8'],
            ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551'],
        ]; 

        this.circle = this.circle.bind(this);
        this.floatInit = this.floatInit.bind(this);
        this.gravityInit = this.gravityInit.bind(this);
        this.floatAnimate = this.floatAnimate.bind(this);
        this.gravityAnimate = this.gravityAnimate.bind(this);
    };

    circle() {
        return ({
            x: Math.random() * (innerWidth - this.rad * 2) + this.rad, 
            y: Math.random() * ((80/100 * innerHeight) - this.rad * 2) + this.rad,
            vel: {
                x: (Math.random() - 0.5) * this.speed, 
                y: (Math.random() - 0.5) * this.speed,
            }, 
            minRad: this.rad, 
            maxRad: this.maxRad,
        });
    };

    floatInit() {
        this.circles = []; 
        this.colorArray = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
        const randomColor = (colorArray) => {
            return(colorArray[Math.floor(Math.random() * this.colorArray.length)])
        };

        for(let i = 0; i < this.numCircles; i++) {
            this.circles.push(new Circle(this.circle().x, this.circle().y, this.circle().vel.x, this.circle().vel.y, this.circle().minRad, this.circle().maxRad, randomColor(this.colorArray)))
        };
    };

    gravityInit() {
        this.circles = []
        this.colorArray = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
        console.log(this.colorArray);
        const randomColor = colorArray => {
            return(colorArray[Math.floor(Math.random() * this.colorArray.length)])
        };

        for (let i = 0; i < this.numCircles; i++) {
            const radius = randomIntFromRange(8, 20);
            const x = randomIntFromRange(0, canvas.width - 30);
            const y = randomIntFromRange(0, canvas.height - 100);

            const dx = randomIntFromRange(-2, 2);
            const dy = randomIntFromRange(-2, 2);
            this.circles.push(new Circle(x, y, dx, dy, radius, radius, randomColor(this.colorArray)))
        };

        // log of circles array
        // console.log(this.circles); 
    };

    floatAnimate() {
        requestAnimationFrame(this.floatAnimate); 
        c.clearRect(0, 0, innerWidth, (80/100 * innerHeight)); 

        for(let i = 0; i < this.circles.length; i++) {
            this.circles[i].float()
        };
    };

    gravityAnimate() {
        requestAnimationFrame(this.gravityAnimate); 
        c.clearRect(0, 0, innerWidth, (80/100 * innerHeight)); 

        for(let i = 0; i < this.circles.length; i++) {
            this.circles[i].gravity(this.speed, 0.9)
        };
    };

    floatRun() {
        this.floatInit();
        this.floatAnimate();
    };

    gravityRun() {
        this.gravityInit();
        this.gravityAnimate();
    };

    run() {
        // this.gravityRun();
        // this.floatRun();

        // figure out how to use same circles array, all circles should both bounce and expand
    }
};

// Main Executables and Event Listeners //

// Main execute function, pass as callback as needed.
const beginProgram = () => {
    const numCircles = parseInt(document.getElementById('num-circles-range').value);
    const minRad = parseInt(document.getElementById('min-rad-range').value);
    const maxRad = parseInt(document.getElementById('max-rad-range').value);
    const speedRange = parseInt(document.getElementById('speed-range').value);

    const userProgram = new Program(numCircles, minRad, maxRad, speedRange);
    userProgram.gravityRun();
};

// Execute upon range input changes, doesn't work with keyboard change
document.getElementById('range-submit').addEventListener('click', () => {
    beginProgram();
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = 80 / 100 * innerHeight;

    beginProgram();
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        beginProgram();
    }
});

const ranges = document.getElementsByClassName('range-sliders');
for(let i = 0; i < ranges.length; i++) {
    ranges[i].addEventListener('mouseup', () => {
        console.log('range')
        beginProgram();
    })
};

beginProgram();