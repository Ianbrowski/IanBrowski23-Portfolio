/**
 * IAN/CORP Portfolio Management System
 * Refactored into OOP for better maintainability and performance.
 */

class Portfolio {
    constructor() {
        this.movieData = {
            'Pulp Fiction': {
                tag: 'Crime / Drama',
                img: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
                plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
            },
            'Goodfellas': {
                tag: 'Biography / Crime',
                img: 'https://image.tmdb.org/t/p/w500/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg',
                plot: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.'
            },
            'Babylon': {
                tag: 'Comedy / Drama',
                img: 'https://image.tmdb.org/t/p/w500/wjOHjWCUE0YzDiEzKv8AfqHj3ir.jpg',
                plot: 'A tale of outsized ambition and outrageous excess, tracing the rise and fall of multiple characters during an era of unbridled decadence in early Hollywood.'
            },
            'Star Wars: III': {
                tag: 'Action / Sci-Fi',
                img: 'https://image.tmdb.org/t/p/w500/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg',
                plot: 'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. Anakin acts as a double agent and is lured into a sinister plan to rule the galaxy.'
            },
            'V for Vendetta': {
                tag: 'Action / Drama',
                img: 'https://image.tmdb.org/t/p/w500/piZOwjyk1g51oPHonc7zaQY3WOv.jpg',
                plot: 'In a future British tyranny, a shadowy freedom fighter, known only by the alias of "V", plots to overthrow it with the help of a young woman.'
            },
            'Talladega Nights': {
                tag: 'Comedy / Sport',
                img: 'https://image.tmdb.org/t/p/w500/3iCiTqsmJz1mO85AHzTiHNkRmb6.jpg',
                plot: 'NASCAR driver Ricky Bobby stays atop the heap until a French Formula One driver makes his way up the ladder, putting Ricky’s talent to the test.'
            },
            'End of Evangelion': {
                tag: 'Anime / Sci-Fi',
                img: 'https://image.tmdb.org/t/p/w500/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg',
                plot: 'The Human Instrumentality Project reaches its catastrophic conclusion in this alternate ending to the legendary TV series.'
            },
            'The Northman': {
                tag: 'Action / Adventure',
                img: 'https://image.tmdb.org/t/p/w500/aSSJMnHknzKjlZ6zybwD7eyJ4Po.jpg',
                plot: 'A young Viking prince embarks on a relentless quest to avenge his father’s murder and reclaim his kingdom.'
            },
            'The Batman': {
                tag: 'Action / Crime',
                img: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
                plot: 'When a sadistic serial killer begins murdering key political figures, Batman is forced to investigate Gotham’s hidden corruption.'
            },
            'Pacific Rim': {
                tag: 'Action / Adventure',
                img: 'https://image.tmdb.org/t/p/w500/8wo4eN8dWKaKlxhSvBz19uvj8gA.jpg',
                plot: 'As a war between humankind and monstrous sea creatures continues, pilots drive massive jaegers in a desperate effort to save the world.'
            },
            'Se7en': {
                tag: 'Crime / Drama',
                img: 'https://image.tmdb.org/t/p/w500/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg',
                plot: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.'
            }
        };

        this.cursorGlow = null;
        this.vignette = null;
        this.scanlines = null;
        this.heroSection = null;
        this.geometric = null;
        this.ctaButton = null;
        this.glitchElements = [];
        this.profileReveal = null;
        this.isProfileUnlocked = false;
        this.modal = null;
        this.modalBody = null;
        this.experienceSection = null;
        this.expDots = [];
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.isInRedMode = false;
        this.redModeIntensity = 0;
        
        this.orbitParticles = [];
        this.particleCount = 8;
        
        this.lastTrailTime = 0;
        this.trailTickRate = 30;

        this.ticking = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.initAudio();
        this.initDataRain(); // Start the background data stream
        this.initAudioVisualizer(); // Initialize the high-fidelity sound waves
        this.runBootSequence(); 
        this.createCursorGlow();
        this.initOrbitParticles();
        this.setupEventListeners();
        this.setupObservers();
    }

    initDataRain() {
        const canvas = document.getElementById('data-rain');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const hex = "0123456789ABCDEF";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        const draw = () => {
            ctx.fillStyle = "rgba(0, 20, 39, 0.1)"; // Match dark navy with alpha for trail
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#708d81"; // Muted green
            ctx.font = fontSize + "px Orbitron";
            
            for (let i = 0; i < drops.length; i++) {
                const text = hex.charAt(Math.floor(Math.random() * hex.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 33); // Stable 30fps for background rain
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    initAudioVisualizer() {
        const bars = document.querySelectorAll('.wave-bars span');
        if (!bars.length) return;

        bars.forEach((bar, i) => {
            // ALGO: Create a bell-curve effect (higher in the middle)
            const centerDist = Math.abs(i - 30) / 30; // 0 at center, 1 at ends
            const intensity = 1 - centerDist; // 1 at center, 0 at ends
            
            // Randomize duration and delay for "not parallel" look
            const duration = 0.6 + Math.random() * 0.8;
            const delay = Math.random() * -2;
            
            // Apply unique styles to each bar
            bar.style.animationDuration = `${duration}s`;
            bar.style.animationDelay = `${delay}s`;
            
            // Subtle color shift across the spectrum
            const hue = 0 + (i * 0.5); // Slight shift towards gold
            bar.style.filter = `hue-rotate(${hue}deg)`;
        });
        console.log("Tactical Visualizer Initialized: 60 Nodes Active.");
    }

    runBootSequence() {
        console.log("Initializing System Boot Sequence...");
        const bootOverlay = document.getElementById('system-boot');
        const bootProgress = bootOverlay.querySelector('.boot-progress');
        const bootStatus = bootOverlay.querySelector('.boot-status');
        const grid = document.querySelector('.grid-background');
        const wrapper = document.querySelector('.content-wrapper');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                bootStatus.textContent = "AUTHENTICATION_SUCCESSFUL";
                bootStatus.style.color = "var(--red-accent)";
                
                setTimeout(() => {
                    bootOverlay.classList.add('ready');
                    grid.classList.add('ready');
                    wrapper.classList.add('ready');
                    this.playPing('access');
                }, 500);
            }
            if (bootProgress) bootProgress.textContent = `${progress}%`;
        }, 150);
    }

    initAudio() {
        this.audioCtx = null;
        this.isAudioInitialized = false;
        
        // Resume AudioContext on first user interaction (browser policy)
        const initAudioOnInteraction = () => {
            if (!this.isAudioInitialized) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                this.isAudioInitialized = true;
                this.playPing('access'); // Initial system sound
                console.log("Audio Engine Synchronized.");
            }
        };
        
        document.addEventListener('mousedown', initAudioOnInteraction, { once: true });
        document.addEventListener('keydown', initAudioOnInteraction, { once: true });
    }

    playPing(type = 'blip') {
        if (!this.isAudioInitialized || !this.audioCtx) return;

        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        const now = this.audioCtx.currentTime;

        switch(type) {
            case 'blip': // High-frequency hover
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(1200, now);
                oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.05);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                oscillator.start(now);
                oscillator.stop(now + 0.05);
                break;
            case 'click': // Mechanical interaction
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.02);
                gainNode.gain.setValueAtTime(0.08, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                oscillator.start(now);
                oscillator.stop(now + 0.02);
                break;
            case 'access': // System authentication
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(440, now);
                oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.2);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
                oscillator.start(now);
                oscillator.stop(now + 0.2);
                break;
            case 'glitch': // Error or Red Mode
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(100, now);
                oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;
        }
    }

    cacheDOM() {
        this.vignette = document.querySelector('.vignette');
        this.scanlines = document.querySelector('.scanlines');
        this.heroSection = document.querySelector('.hero');
        this.geometric = document.querySelector('.geometric');
        this.ctaButton = document.querySelector('.cta-button');
        this.glitchElements = document.querySelectorAll('h1, h2, h3, p, a, button, .project-title, .skill-name');
        this.profileReveal = document.querySelector('.profile-reveal');
        this.modal = document.getElementById('skill-modal');
        this.modalBody = document.getElementById('modal-body');
        this.experienceSection = document.getElementById('experience');
        this.expDots = document.querySelectorAll('.exp-dot');
    }

    createCursorGlow() {
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'cursor-glow';
        document.body.appendChild(this.cursorGlow);
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('click', (e) => {
            this.handleMouseClick(e);
            this.playPing('click');
        });
        
        // Add hover sounds and decryption effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .movie-card, .profile-reveal');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.playPing('blip'));
        });

        // Global Decryption Engine (Event Delegation for dynamic content)
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            const scrambleSelectors = [
                '.section-title', '.nav-links a', '.logo', '.hero h1 span', 
                '.project-title', '.skill-name', '.timeline-date', '.exp-company', 
                '.detail-number', '.cta-button', '.submit-btn', '.social-link span',
                '.modal-skill-title', '.skill-tag'
            ];
            
            if (scrambleSelectors.some(selector => target.matches(selector))) {
                this.scrambleText(target);
            }
        });
        
        if (this.heroSection) {
            this.heroSection.addEventListener('mouseenter', () => this.cursorGlow.classList.add('active'));
            this.heroSection.addEventListener('mouseleave', () => {
                this.cursorGlow.classList.remove('active');
                if (this.isInRedMode) {
                    this.deactivateRedMode();
                    this.isInRedMode = false;
                }
            });
        }

        // NAV TOGGLE
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                this.playPing('click');
            });
        }

        // Close nav on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navToggle) navToggle.classList.remove('active');
                if (navLinks) navLinks.classList.remove('active');
            });
        });

        // CONTACT FORM
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.playPing('access');
                alert("MESSAGE_TRANSMITTED_TO_IAN_CORP_MAIN_TERMINAL");
                contactForm.reset();
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        if (this.profileReveal) {
            this.profileReveal.addEventListener('mouseenter', () => this.handleProfileUnlock(), { once: true });
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }
    }

    scrambleText(element) {
        if (element.dataset.scrambling === "true") return;
        
        const originalText = element.dataset.original || element.innerText;
        if (!element.dataset.original) element.dataset.original = originalText;
        
        element.dataset.scrambling = "true";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!<>{}[]";
        let iteration = 0;
        
        const interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((char, index) => {
                    if (index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
                element.dataset.scrambling = "false";
                element.innerText = originalText;
            }
            
            iteration += 1 / 3;
        }, 30);
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateFrame();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateFrame() {
        // Smooth cursor glow following
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;

        this.updateCursorGlowPosition();
        this.handleGridDisturbance();
        this.handleRedModeDetection();
        this.handleGeometricParallax();
        this.handleHeroParallax();
        this.handleExperienceParallax();
        this.handleMagneticButton();
        this.createTrail(this.mouseX, this.mouseY);
        this.updateOrbitParticles();
    }

    handleGridDisturbance() {
        const grid = document.querySelector('.grid-background');
        if (!grid) return;

        const xCenter = window.innerWidth / 2;
        const yCenter = window.innerHeight / 2;
        
        // Calculate tilt based on mouse position
        const tiltX = (this.mouseY - yCenter) * 0.005; // Vertical tilt
        const tiltY = (this.mouseX - xCenter) * -0.005; // Horizontal tilt
        
        // Subtle perspective shift to simulate "pull"
        const moveX = (this.mouseX - xCenter) * 0.02;
        const moveY = (this.mouseY - yCenter) * 0.02;

        grid.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${moveX}px, ${moveY}px) scale(1.05)`;
        
        // Update SVG filter scale for subtle "warping" effect
        const displacementMap = document.getElementById('displacement-map');
        if (displacementMap) {
            const warpIntensity = Math.min(20, Math.sqrt(moveX**2 + moveY**2) * 0.5);
            displacementMap.setAttribute('scale', warpIntensity.toString());
        }
    }

    updateCursorGlowPosition() {
        let currentGlowSize = 40;
        if (this.cursorGlow.style.width) {
            currentGlowSize = parseFloat(this.cursorGlow.style.width);
        }
        this.cursorGlow.style.left = (this.mouseX - currentGlowSize / 2) + 'px';
        this.cursorGlow.style.top = (this.mouseY - currentGlowSize / 2) + 'px';
    }

    handleRedModeDetection() {
        if (!this.geometric) return;

        const rect = this.geometric.getBoundingClientRect();
        const circleX = rect.left + rect.width / 2;
        const circleY = rect.top + rect.height / 2;

        const distX = this.mouseX - circleX;
        const distY = this.mouseY - circleY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const maxDist = 150;
        const newIntensity = Math.max(0, 1 - (distance / maxDist));

        if (newIntensity < 0.01 && this.redModeIntensity < 0.01) {
            if (this.isInRedMode) {
                this.deactivateRedMode();
                this.isInRedMode = false;
            }
            this.redModeIntensity = 0;
            this.resetGlow();
            return;
        }

        this.redModeIntensity += (newIntensity - this.redModeIntensity) * 0.15; // Faster decay

        if (this.redModeIntensity > 0.1) { // Increased threshold
            if (!this.isInRedMode && this.redModeIntensity > 0.5) {
                this.activateRedMode();
                this.isInRedMode = true;
            }
            this.applyRedGradient(this.redModeIntensity);
            this.applyGlitchIntensity(this.redModeIntensity);
            this.updateGlowIntensity(this.redModeIntensity);
        } else {
            if (this.isInRedMode || this.redModeIntensity > 0) {
                this.deactivateRedMode();
                this.isInRedMode = false;
                this.redModeIntensity = 0;
            }
            this.resetGlow();
        }
    }

    activateRedMode() {
        document.body.classList.add('red-mode');
        document.querySelectorAll('section').forEach(section => {
            section.style.filter = 'saturate(1.8)';
        });

        for (let i = 0; i < 4; i++) {
            setTimeout(() => this.createGlitchFlash(), i * 50);
        }
    }

    applyRedGradient(intensity) {
        const bgColor = this.interpolateColor('#001427', '#8d0801', intensity);
        const textColor = this.interpolateColor('#708d81', '#f4d58d', intensity);
        const filterAmount = intensity * 0.15;
        const hueRotate = intensity * 340;
        const saturate = 1 + intensity * 0.5;

        document.body.style.background = bgColor;
        document.body.style.color = textColor;
        document.body.style.filter = `invert(${filterAmount}) hue-rotate(${hueRotate}deg) saturate(${saturate})`;
    }

    applyGlitchIntensity(intensity) {
        this.glitchElements.forEach(element => {
            element.classList.add('glitch-active');
            const animationSpeed = 0.2 - (intensity * 0.1);
            element.style.animationDuration = animationSpeed + 's';
            element.style.setProperty('--glitch-intensity', intensity.toString());
        });
    }

    updateGlowIntensity(intensity) {
        const glowSize = 40 + intensity * 40;
        this.cursorGlow.style.width = glowSize + 'px';
        this.cursorGlow.style.height = glowSize + 'px';
        
        const glowAlpha = 0.3 + intensity * 0.3;
        this.cursorGlow.style.background = `radial-gradient(circle, rgba(244, 213, 141, ${0.4 - intensity * 0.3}) 0%, rgba(191, 6, 3, ${intensity * 0.5}) 50%, transparent 70%)`;
        this.cursorGlow.style.borderColor = `rgba(${191 + intensity * 30}, 6, 3, ${0.6 + intensity * 0.4})`;
    }

    deactivateRedMode() {
        document.body.classList.remove('red-mode');
        document.body.style.background = '';
        document.body.style.color = '';
        document.body.style.filter = '';
        
        document.querySelectorAll('section').forEach(section => {
            section.style.filter = '';
        });

        this.glitchElements.forEach(element => {
            element.classList.remove('glitch-active');
            element.style.animation = '';
            element.style.animationDuration = '';
            element.style.transform = '';
            element.style.setProperty('--glitch-intensity', '0');
        });
    }

    resetGlow() {
        this.cursorGlow.style.width = '40px';
        this.cursorGlow.style.height = '40px';
        this.cursorGlow.style.background = `radial-gradient(circle, rgba(244, 213, 141, 0.4) 0%, transparent 70%)`;
        this.cursorGlow.style.borderColor = `rgba(244, 213, 141, 0.6)`;
    }

    handleGeometricParallax() {
        if (!this.geometric) return;
        const xMove = (this.mouseX - window.innerWidth / 2) * 0.03;
        const yMove = (this.mouseY - window.innerHeight / 2) * 0.03;
        this.geometric.style.transform = `translate(${xMove}px, ${yMove}px)`;
    }

    handleHeroParallax() {
        if (this.heroSection && this.isElementInViewport(this.heroSection)) {
            const heroContent = document.querySelector('.hero-content');
            const h1 = document.querySelector('.hero h1');
            const p = document.querySelector('.hero p');

            // Parallax only if mouse is in the upper half of viewport or near hero
            const xCenter = window.innerWidth / 2;
            const yCenter = window.innerHeight / 2;
            
            const xOffset = (this.mouseX - xCenter) * 0.015;
            const yOffset = (this.mouseY - yCenter) * 0.015;

            // Apply slight deadzone to prevent jitter when cursor is near center
            const deadzone = 5;
            const finalX = Math.abs(xOffset) < deadzone ? 0 : xOffset;
            const finalY = Math.abs(yOffset) < deadzone ? 0 : yOffset;

            if (h1) h1.style.transform = `translate(${finalX * 0.4}px, ${finalY * 0.4}px)`;
            if (p) p.style.transform = `translate(${finalX * 0.2}px, ${finalY * 0.2}px)`;
            if (heroContent) heroContent.style.transform = `translate(${finalX * 0.1}px, ${finalY * 0.1}px)`;
        }
    }

    handleMagneticButton() {
        if (this.ctaButton && !this.isInRedMode) {
            const rect = this.ctaButton.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;

            const distX = this.mouseX - buttonCenterX;
            const distY = this.mouseY - buttonCenterY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 150) {
                const angle = Math.atan2(distY, distX);
                const force = (150 - distance) / 150;
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;

                this.ctaButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
                this.cursorGlow.classList.add('magnetic');
            } else {
                this.ctaButton.style.transform = 'translate(0, 0)';
                this.cursorGlow.classList.remove('magnetic');
            }
        }
    }

    createTrail(x, y) {
        const now = Date.now();
        if (now - this.lastTrailTime < this.trailTickRate) return;
        this.lastTrailTime = now;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        if (this.isInRedMode) {
            trail.style.background = 'var(--red-accent)';
            trail.style.boxShadow = '0 0 10px var(--red-accent)';
        } else {
            trail.style.background = 'var(--soft-gold)';
            trail.style.boxShadow = '0 0 10px var(--soft-gold)';
        }

        document.body.appendChild(trail);

        let opacity = 0.8;
        const fadeInterval = setInterval(() => {
            opacity -= 0.1;
            trail.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeInterval);
                trail.remove();
            }
        }, 30);
    }

    initOrbitParticles() {
        if (!this.geometric) return;

        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `orbit-particle ${i % 2 === 0 ? 'gold' : 'red'}`;
            this.geometric.appendChild(particle);

            this.orbitParticles.push({
                element: particle,
                angle: (Math.PI * 2 * i) / this.particleCount,
                speed: 0.005 + Math.random() * 0.003,
                radius: 80 + Math.random() * 30
            });
        }
    }

    updateOrbitParticles() {
        if (!this.geometric) return;

        const rect = this.geometric.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        this.orbitParticles.forEach((p, idx) => {
            p.angle += p.speed;
            const x = centerX + Math.cos(p.angle) * p.radius;
            const y = centerY + Math.sin(p.angle) * p.radius;

            p.element.style.left = x + 'px';
            p.element.style.top = y + 'px';

            const scale = 0.8 + Math.sin(Date.now() * 0.005 + idx) * 0.3;
            p.element.style.transform = `scale(${scale})`;
        });
    }

    handleMouseClick(e) {
        this.createParticles(e.clientX, e.clientY);
    }

    createParticles(x, y) {
        const particleContainer = document.querySelector('.particles') || this.createParticleContainer();
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 4 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = this.isInRedMode ? 
                (i % 2 === 0 ? 'var(--red-accent)' : '#f4d58d') :
                (i % 2 === 0 ? 'var(--soft-gold)' : 'var(--red-accent)');
            
            particleContainer.appendChild(particle);
            this.animateParticle(particle, vx, vy);
        }
    }

    animateParticle(particle, vx, vy) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let life = 1;
        
        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.15;
            life -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        requestAnimationFrame(animate);
    }

    createParticleContainer() {
        const container = document.createElement('div');
        container.className = 'particles';
        document.body.appendChild(container);
        return container;
    }

    setupObservers() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    if (progressFill) {
                        const width = progressFill.style.width;
                        progressFill.style.width = '0';
                        setTimeout(() => {
                            progressFill.style.width = width;
                        }, 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-item').forEach(item => observer.observe(item));
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const btn = e.target.querySelector('.submit-btn');
        if (!btn) return;
        
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent ✓';
        btn.disabled = true;
        
        setTimeout(() => {
            e.target.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    interpolateColor(color1, color2, factor) {
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);

        const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
        const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;

        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);

        return `rgb(${r}, ${g}, ${b})`;
    }

    createGlitchFlash() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'rgba(191, 6, 3, 0.2)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '8';
        flash.style.animation = 'glitchFlash 0.2s ease-out forwards';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
    }

    handleProfileUnlock() {
        if (this.isProfileUnlocked) return;
        
        this.profileReveal.classList.add('unlocking');
        
        setTimeout(() => {
            this.profileReveal.classList.remove('unlocking');
            this.profileReveal.classList.add('is-unlocked');
            this.isProfileUnlocked = true;
            console.log("System Authenticated: Access Granted.");
        }, 500); // Small delay before full unlock
    }

    showSkillDetail(skillName) {
        const skillData = {
            'Full-Stack Dev': {
                desc: 'Expertise in building complete, end-to-end applications. I specialize in MVC architecture, ensuring seamless data flow between the server and the client. My focus is on scalable backends and high-performance frontends.',
                tags: ['PHP', 'JavaScript', 'SQL', 'MVC', 'REST APIs']
            },
            'Frontend Design': {
                desc: 'Creating visually stunning, high-fidelity user interfaces. I am obsessed with micro-interactions, dark-mode aesthetics, and CSS precision. My goal is to make every interaction feel premium and intentional.',
                tags: ['Vanilla CSS', 'Animations', 'UI/UX', 'Responsive Design', 'Aesthetics']
            },
            'System Design': {
                desc: 'Architecting complex software systems with a focus on modularity and maintainability. I believe in the principle that complexity should be hidden behind powerful, intuitive abstractions.',
                tags: ['Architecture', 'Scaling', 'Modularity', 'Optimization', 'Efficiency']
            },
            'Problem Solving': {
                desc: 'Highly analytical approach to technical bottlenecks. I enjoy the process of debugging complex logic and optimizing performance-critical paths in the codebase.',
                tags: ['Logic', 'Debugging', 'Algorithms', 'Optimization', 'Critical Thinking']
            },
            'UI/UX Implementation': {
                desc: 'Bridging the gap between creative design and technical implementation. I ensure that the user experience is not just functional, but emotionally engaging and logically sound.',
                tags: ['Human-Centered', 'Flow', 'Interactivity', 'Precision', 'Experience']
            },
            'Adaptability': {
                desc: 'Continuously evolving with the rapidly changing tech landscape. My journey from a Grade 11 hobbyist to a 3rd-year CS student has been defined by a relentless drive to master new tools and methodologies.',
                tags: ['Continuous Learning', 'Flexibility', 'Growth Mindset', 'Evolving Tech']
            }
        };

        const data = skillData[skillName];
        if (!data) return;

        this.modalBody.innerHTML = `
            <h2 class="modal-skill-title">${skillName}</h2>
            <p class="modal-skill-desc">${data.desc}</p>
            <div class="modal-skill-tags">
                ${data.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
        `;

        this.openModal();
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleExperienceParallax() {
        if (!this.experienceSection || !this.isElementInViewport(this.experienceSection)) return;

        const rect = this.experienceSection.getBoundingClientRect();
        const relX = this.mouseX - rect.left;
        const relY = this.mouseY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (relX - centerX) * 0.01;
        const moveY = (relY - centerY) * 0.01;

        // Move background dots
        this.expDots.forEach((dot, index) => {
            const depth = (index + 1) * 0.5;
            dot.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
        });

        // Tilt timeline cards
        const timelineCards = this.experienceSection.querySelectorAll('.timeline-content');
        timelineCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const distToMouseX = this.mouseX - cardCenterX;
            const distToMouseY = this.mouseY - cardCenterY;
            
            const dist = Math.sqrt(distToMouseX**2 + distToMouseY**2);
            if (dist < 600) { // Increased range
                const tiltX = distToMouseY * -0.04; // Much more expressive
                const tiltY = distToMouseX * 0.04;
                
                card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
                
                // Internal Parallax for text
                const title = card.querySelector('h3');
                const date = card.parentElement.querySelector('.timeline-date');
                const p = card.querySelector('p');
                
                if (title) title.style.transform = `translateZ(40px)`;
                if (p) p.style.transform = `translateZ(30px)`;
            } else {
                card.style.transform = '';
                const elements = card.querySelectorAll('h3, p');
                elements.forEach(el => el.style.transform = '');
            }
        });
    }

    showProjectDetail(projectName) {
        const projectData = {
            'Cathedral CMS': {
                desc: 'A full-scale Management Information System engineered for the IFI Cathedral. This project involved migrating legacy manual records into a secure, centralized database. Features include real-time audit logging, automated financial reporting, and strict role-based access control for administrative staff.',
                tags: ['PHP', 'MySQL', 'JavaScript', 'MVC', 'Security']
            },
            'Network Topology': {
                desc: 'A sophisticated network infrastructure simulation designed for enterprise-level scalability. Implemented multi-subnet routing protocols (OSPF/EIGRP), VLAN segmentation for departmental isolation, and robust firewall rules to harden the network against unauthorized lateral movement.',
                tags: ['Cisco', 'Networking', 'Routing', 'Security', 'VLAN']
            },
            'Security Audit': {
                desc: 'A comprehensive framework developed to assess and enhance code quality across various repositories. This project involved creating automated vulnerability scanners, implementing secure coding standards (OWASP), and generating real-time compliance reports for engineering teams.',
                tags: ['Security', 'Quality Assurance', 'Automation', 'Compliance', 'Audit']
            },
            'Freelancing Ops': {
                desc: 'Tactical digital operations executed for private clients. These projects range from high-fidelity digital arts and interactive media to bespoke software solutions and precision-coded backend services. Every contract is executed with a focus on results, whether as a collaborator or an independent operative.',
                tags: ['Freelance', 'Digital Arts', 'Custom Code', 'Ops', 'Hitman-for-Hire']
            }
        };

        const data = projectData[projectName];
        if (!data) return;

        this.modalBody.innerHTML = `
            <h2 class="modal-skill-title">${projectName}</h2>
            <p class="modal-skill-desc">${data.desc}</p>
            <div class="modal-skill-tags">
                ${data.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
            ${projectName === 'Freelancing Ops' ? `<p class="project-quote" style="margin-top: 2rem;">"kakampi or kalaban kung anong gusto mo" - hev</p>` : ''}
        `;

        this.openModal();
    }

    showMovieDetail(movieName) {
        const data = this.movieData[movieName];
        if (!data) return;

        this.modalBody.innerHTML = `
            <div class="modal-movie-flex">
                <div class="modal-movie-poster">
                    <img src="${data.img}" alt="${movieName}">
                </div>
                <div class="modal-movie-info">
                    <h2 class="modal-skill-title">${movieName}</h2>
                    <div class="modal-skill-tags">
                        <span class="skill-tag">${data.tag}</span>
                    </div>
                    <p class="modal-skill-desc" style="margin-top: 1.5rem;">${data.plot}</p>
                    <div class="modal-status" style="margin-top: 2rem; opacity: 0.5; font-size: 0.7rem; font-family: 'Orbitron';">ARCHIVE STATUS: SECURED</div>
                </div>
            </div>
        `;

        this.openModal();
    }

    showProfileDetail() {
        if (!this.isProfileUnlocked) return; // Only show if system is authenticated

        this.modalBody.innerHTML = `
            <div class="modal-profile-view">
                <div class="modal-profile-img">
                    <img src="2.jpg" alt="Operative Profile">
                </div>
                <div class="modal-profile-metadata">
                    <h2 class="modal-skill-title">OPERATIVE: IAN</h2>
                    <div class="modal-skill-tags">
                        <span class="skill-tag">LEVEL 5 ACCESS</span>
                        <span class="skill-tag">IDENTITY: VERIFIED</span>
                    </div>
                    <p class="modal-skill-desc" style="margin-top: 1.5rem;">Subject has been fully authenticated within the IAN/CORP secure network. All professional data, project repositories, and tactical archives are now synchronized and available for review.</p>
                    <div class="modal-status" style="margin-top: 2rem; color: var(--soft-gold); font-family: 'Orbitron'; font-size: 0.8rem;">
                        [ ARCHIVE ENCRYPTION: ACTIVE ]<br>
                        [ CLEARANCE: OVERRIDE GRANTED ]
                    </div>
                </div>
            </div>
        `;

        this.openModal();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});
