const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Dimensiones de la ventana
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ffffff";

class Circle {

    constructor(x, y, radius, color, text, speed) {

        this.posX = x;
        this.posY = y;

        this.radius = radius;

        this.color = color;
        this.originalColor = color;

        this.text = text;

        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {

        context.beginPath();

        context.strokeStyle = this.color;

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";

        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);

        context.stroke();
        context.closePath();
    }

    update(context) {

        this.draw(context);

        // Movimiento en X
        this.posX += this.dx;

        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        // Movimiento en Y
        this.posY += this.dy;

        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}


// Array que almacena los círculos
let circles = [];


// Generar círculos aleatorios
function generateCircles(n) {

    for (let i = 0; i < n; i++) {

        let radius = Math.random() * 30 + 20;

        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;

        let color = "#000000";

        // velocidad entre 1 y 5
        let speed = Math.random() * 4 + 1;

        let text = `C${i + 1}`;

        circles.push(new Circle(x, y, radius, color, text, speed));
    }
}


// Detección de colisiones
function detectCollisions() {

    for (let i = 0; i < circles.length; i++) {

        for (let j = i + 1; j < circles.length; j++) {

            let c1 = circles[i];
            let c2 = circles[j];

            let dx = c1.posX - c2.posX;
            let dy = c1.posY - c2.posY;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < c1.radius + c2.radius) {

                c1.color = "#0000FF";
                c2.color = "#0000FF";

            }

        }

    }

}


// Animación
function animate() {

    ctx.clearRect(0, 0, window_width, window_height);

    // Resetear colores antes de verificar colisiones
    circles.forEach(circle => {
        circle.color = circle.originalColor;
    });

    detectCollisions();

    circles.forEach(circle => {
        circle.update(ctx);
    });

    requestAnimationFrame(animate);
}


// Generar 20 círculos
generateCircles(20);

// Iniciar animación
animate();