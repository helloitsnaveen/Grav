const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// returning drawing context to a variable, in this case: 2d 
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(100, 100, 100, 100);
console.log(canvas);

// Line 
ctx.beginPath(); 
ctx.moveTo(50, 300);
ctx.lineTo(300, 100); 
ctx.strokeStyle = "#fa34a3"
ctx.stroke();

// Arc / Circle 
ctx.beginPath();
ctx.arc(300, 300, 30, 0, Math.PI * 2, false)
ctx.strokeStyle = '#fa32b1'
ctx.stroke();