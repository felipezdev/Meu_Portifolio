// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('matrix-bg');
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Caracteres para o efeito matrix
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.drops = [];
        
        this.initialize();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initialize();
    }
    
    initialize() {
        const columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for(let i = 0; i < columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        // Fundo semi-transparente para criar o efeito de fade
        this.ctx.fillStyle = 'rgba(10, 15, 26, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0f0';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for(let i = 0; i < this.drops.length; i++) {
            // Caractere aleatório
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Desenha o caractere
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Move a gota para baixo
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.95) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializa o efeito matrix
const matrixRain = new MatrixRain();
matrixRain.animate();

// Scanlines Effect
const createScanlines = () => {
    const scanlines = document.createElement('div');
    scanlines.classList.add('scanlines');
    document.body.appendChild(scanlines);
};

// Adiciona os efeitos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createScanlines();
});
