const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth; 
canvas.height = 80/100 * window.innerHeight;

const mouse = {
    x: undefined, 
    y: undefined,
}; 

addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

addEventListener('resize', () => {
    canvas.width = innerWidth; 
    canvas.height = 80/100 * innerHeight;

    program.init();
}); 

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        program.init();
    }
});

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

    update() {
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
};

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
        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
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

    init() {
        this.circles = []; 
        this.colorArray = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
        const randomColor = (colorArray) => {
            return(colorArray[Math.floor(Math.random() * this.colorArray.length)])
        };

        for(let i = 0; i < this.numCircles; i++) {
            this.circles.push(new Circle(this.circle().x, this.circle().y, this.circle().vel.x, this.circle().vel.y, this.circle().minRad, this.circle().maxRad, randomColor(this.colorArray)))
        };
    };

    animate() {
        requestAnimationFrame(this.animate); 
        c.clearRect(0, 0, innerWidth, (80/100 * innerHeight)); 

        for(let i = 0; i < this.circles.length; i++) {
            this.circles[i].update()
        };
    };

    run() {
        this.init();
        this.animate();
    };
};


// final creation of run program, with parameters.
// numCircles, minRad, maxRad, speed
const program = new Program(1, 15, 85, 3);
program.run();