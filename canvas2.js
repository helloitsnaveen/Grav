const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

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
    canvas.height = innerHeight;

    init();
}); 

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        init();
    }
});

class Circle {
    constructor(posx, posy, dx, dy, minRad, maxRad, color) {
        this.posx = posx; 
        this.posy = posy; 

        this.vel = {
            x: dx, 
            y: dy,
        };

        this.rad = minRad; 
        this.minRad = minRad; 
        this.maxRad = maxRad; 

        this.color = color;
    };

    draw() {
        c.beginPath(); 
        c.arc(this.posx, this.posy, this.rad, 0, Math.PI * 2, false);

        c.fillStyle = this.color; 
        c.strokeStyle = this.color; 

        c.fill();
        c.stroke();
        c.closePath();
    }; 

    update() {
        if (this.posx + this.rad > innerWidth || this.posx - this.rad < 0) {
            this.vel.x = -this.vel.x;
        }; 

        if (this.posy + this.rad > innerHeight || this.posy - this.rad < 0) {
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

class Config {
    constructor(numCircles, minRad, maxRad, speed) {
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
            ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']
        ]; 
        this.colorArray = this.colorPalettes[Math.floor(Math.random() * this.colorPalettes.length)];
    };

    circle() {
        return ({
            x: Math.random() * (innerWidth - this.rad * 2) + this.rad, 
            y: Math.random() * (innerHeight - this.rad * 2) + this.rad,
            vel: {
                x: (Math.random() - 0.5) * this.speed, 
                y: (Math.random() - 0.5) * this.speed,
            }, 
            minRad: this.rad, 
            maxRad: this.maxRad,
        });
    };

    colors() {
        return (this.colorArray[Math.floor(Math.random() * this.colorArray.length)]);
    }; 
};

let circles = []; 
const init = () => {
    circles = []; 
    const config = new Config(100, 15, 85, 6);

    for (let i = 0; i < config.numCircles; i++) {
        circles.push(new Circle(config.circle().x, config.circle().y, config.circle().vel.x, config.circle().vel.y, config.circle().minRad, config.circle().maxRad, config.colors()))
    };
};
init(); // first init 

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < circles.length; i++) {
        circles[i].update();
    };
};
animate();

