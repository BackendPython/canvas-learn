const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []
let hue = 0

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 50; i++) {
        particlesArray.push(new Practicle())
    }
})

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Practicle())
    }
})

class Practicle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = 'hsl('+ hue + ', 100%, 50%)'
    }
    uptade(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size>0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill()
    }
}


function handlePracticles(){
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].uptade()
        particlesArray[i].draw()
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x
            const dy = particlesArray[i].y - particlesArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size/10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1)
            console.log(particlesArray.length);
            i--
        }
    }
}

function animtion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handlePracticles();
    hue+=1;
    requestAnimationFrame(animtion);
}

animtion()