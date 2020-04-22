const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// returning drawing context to a variable, in this case: 2d 
const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(100, 100, 100, 100);
// console.log(canvas);

// for (let i = 0; i < 50; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);

//     const colorArray = ['blue', 'yellow', 'pink', 'red', 'green', 'orange'];
//     const currColor = colorArray[Math.floor(Math.random() * colorArray.length)];
//     ctx.strokeStyle = currColor; 
//     ctx.stroke();
// };

class Circle {
    constructor(posx, posy, dx, dy, rad, color) {
        this.posx = posx; 
        this.posy = posy;

        this.dx = dx;
        this.dy = dy; 

        this.rad = rad;

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
        console.log('Animate: OK')

        this.draw();
    };
};

const circleArray = [];

for (let i = 0; i < 50; i++) {
    let rad = 30; 
    let speed = 10;

    let x = Math.random() * (innerWidth - rad * 2) + rad;
    let y = Math.random() * (innerHeight - rad * 2) + rad; 
    let dx = (Math.random() - 0.5) * speed; 
    let dy = (Math.random() - 0.5) * speed;

    const colorArray = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551'];
    const currColor = colorArray[Math.floor(Math.random() * colorArray.length)];

    circleArray.push(new Circle(x, y, dx, dy, rad, currColor))
};


const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    };
};

animate();