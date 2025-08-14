// Advanced Logo Effects
class AdvancedLogo {
    constructor(container) {
        this.container = container;
        this.wrapper = container.querySelector('.logo-wrapper');
        this.logo = container.querySelector('.logo');
        this.text = container.querySelector('.logo-text');
        
        this.setupParticles();
        this.setupInteractivity();
        this.setupParallax();
    }
    
    setupParticles() {
        const particles = document.createElement('div');
        particles.className = 'logo-particles';
        
        // Create multiple particles with random properties
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position and animation properties
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            const z = Math.random() * 30 - 15;
            const duration = 3 + Math.random() * 2;
            const opacity = 0.3 + Math.random() * 0.5;
            
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            particle.style.setProperty('--z', `${z}px`);
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--opacity', opacity);
            
            // Random starting position in animation
            particle.style.animationDelay = `${Math.random() * -duration}s`;
            
            particles.appendChild(particle);
        }
        
        this.wrapper.appendChild(particles);
    }
    
    setupInteractivity() {
        let rect = this.container.getBoundingClientRect();
        const sensitivity = 15; // Rotation sensitivity
        
        // Track mouse movement for parallax effect
        this.container.addEventListener('mousemove', (e) => {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const rotateX = (y - rect.height / 2) / rect.height * sensitivity;
            const rotateY = (rect.width / 2 - x) / rect.width * sensitivity;
            
            // Apply smooth rotation
            this.wrapper.style.transform = `
                translateZ(20px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
            
            // Update particles position
            this.updateParticles(x, y);
        });
        
        // Reset position on mouse leave
        this.container.addEventListener('mouseleave', () => {
            this.wrapper.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        });
        
        // Update rectangle size on window resize
        window.addEventListener('resize', () => {
            rect = this.container.getBoundingClientRect();
        });
    }
    
    setupParallax() {
        const particles = this.wrapper.querySelectorAll('.particle');
        const parallaxLayers = [this.logo, ...particles];
        
        window.addEventListener('deviceorientation', (e) => {
            if (!e.beta || !e.gamma) return;
            
            const tiltX = Math.min(Math.max(e.beta, -45), 45);
            const tiltY = Math.min(Math.max(e.gamma, -45), 45);
            
            parallaxLayers.forEach((layer, index) => {
                const depth = index * 2;
                const moveX = tiltY * depth;
                const moveY = tiltX * depth;
                
                layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    updateParticles(mouseX, mouseY) {
        const particles = this.wrapper.querySelectorAll('.particle');
        const rect = this.container.getBoundingClientRect();
        
        particles.forEach(particle => {
            const x = (mouseX - rect.width / 2) / 10;
            const y = (mouseY - rect.height / 2) / 10;
            const z = parseFloat(particle.style.getPropertyValue('--z'));
            
            particle.style.transform = `
                translateZ(${z}px)
                translate(
                    calc(var(--x) + ${x * (z/10)}px),
                    calc(var(--y) + ${y * (z/10)}px)
                )
            `;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.logo-container');
    containers.forEach(container => new AdvancedLogo(container));
});
