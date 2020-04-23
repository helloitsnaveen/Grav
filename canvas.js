const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// returning drawing context to a variable, in this case: 2d 
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined, 
    y: undefined,
};

window.addEventListener('mousemove', (e) => {
    mouse.x = event.x;
    mouse.y = event.y; 
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

        this.dx = dx;
        this.dy = dy; 
        
        this.rad = minRad;
        this.minRad = minRad; 
        this.maxRad = maxRad;

        this.color = color;
    };

    draw() {
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.rad, 0, Math.PI * 2, false);


        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color; 
        
        ctx.fill()
        ctx.stroke();
    };

    update() {
        if (this.posx + this.rad > innerWidth || this.posx - this.rad < 0) {
            this.dx = -this.dx;
        }; 

        if (this.posy + this.rad > innerHeight || this.posy - this.rad < 0) {
            this.dy = -this.dy;
        };

        this.posx += this.dx;
        this.posy += this.dy;
        // console.log('Animate: OK')

        // interactivity // 
        if (mouse.x - this.posx < 125 && mouse.x - this.posx > -125 && 
            mouse.y - this.posy < 125 && mouse.y - this.posy > -125
            ) {
                if (this.rad < this.maxRad) {
                    this.rad += 1; 
                }

        } else if (this.rad > this.minRad) {
            this.rad -= 1;
        };

        this.draw();
    };
};

const colorPalettes = [
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

let circleArray = [];
const init = () => {
    circleArray = [];

    for (let i = 0; i < 500; i++) {
        let rad = 30;
        let speed = 3;

        let x = Math.random() * (innerWidth - rad * 2) + rad;
        let y = Math.random() * (innerHeight - rad * 2) + rad;
        let dx = (Math.random() - 0.5) * speed;
        let dy = (Math.random() - 0.5) * speed;

        let minRad = Math.floor(Math.random() * 7 + 1);
        let maxRad = 85;

        const colorArray = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        const currColor = colorArray[Math.floor(Math.random() * colorArray.length)];

        circleArray.push(new Circle(x, y, dx, dy, minRad, maxRad, currColor))
    };
};
init();

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    };
};
animate();