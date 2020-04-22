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


const circleInfo = {
    posx: Math.random() * innerWidth, 
    posy: Math.random() * innerHeight,

    dx: (Math.random() - 0.5) * 10,
    dy: (Math.random() - 0.5) * 10, 

    rad: 30,
};

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    ctx.beginPath();
    ctx.arc(circleInfo.posx, circleInfo.posy, circleInfo.rad, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'black';
    ctx.stroke(); 

    
    if (circleInfo.posx + circleInfo.rad > innerWidth || circleInfo.posx - circleInfo.rad < 0) {
        circleInfo.dx = -circleInfo.dx;
    }; 

    if (circleInfo.posy + circleInfo.rad > innerHeight || circleInfo.posy - circleInfo.rad < 0) {
        circleInfo.dy = -circleInfo.dy;
    };

    circleInfo.posx += circleInfo.dx;
    circleInfo.posy += circleInfo.dy;
    console.log('Animate: OK')
};

animate();