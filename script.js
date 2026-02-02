// Valentine Website Script - Simplified
document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Valentine site loading...');
    
    // Elements
    const loader = document.getElementById('loader');
    const mainContainer = document.getElementById('main-container');
    const steps = document.querySelectorAll('.step');
    const dots = document.querySelectorAll('.dot');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const noMessage = document.getElementById('no-message');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    
    let currentStep = 1;
    let noClickCount = 0;
    let isMusicPlaying = false;
    
    // Initialize
    setTimeout(() => {
        loader.style.display = 'none';
        mainContainer.style.display = 'block';
        showStep(1);
        createHearts();
        console.log('✅ Site loaded!');
    }, 1500);
    
    // Step Navigation Functions (accessible globally)
    window.nextStep = function(targetStep) {
        if (targetStep) {
            showStep(targetStep);
        } else {
            if (currentStep < 5) {
                showStep(currentStep + 1);
            }
        }
    };
    
    window.prevStep = function() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    };
    
    window.goToStep = function(stepNum) {
        showStep(stepNum);
    };
    
    // Show specific step
    function showStep(stepNum) {
        // Validate
        if (stepNum < 1 || stepNum > 5) return;
        
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
            step.style.display = 'none';
        });
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[stepNum - 1]) {
            dots[stepNum - 1].classList.add('active');
        }
        
        // Show selected step
        const targetStep = document.getElementById(`step${stepNum}`);
        if (targetStep) {
            targetStep.classList.add('active');
            targetStep.style.display = 'block';
            
            // Add fade-in effect
            targetStep.style.opacity = '0';
            let opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.05;
                targetStep.style.opacity = opacity;
                if (opacity >= 1) {
                    clearInterval(fadeIn);
                }
            }, 20);
        }
        
        // Update current step
        currentStep = stepNum;
        
        // Step-specific actions
        if (stepNum === 2) {
            // Animate love meter
            animateLoveMeter();
        }
        if (stepNum === 5) {
            // Start countdown
            startCountdown();
        }
    }
    
    // Yes Button
    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            console.log('✅ Yes clicked!');
            
            // Create confetti
            createConfetti(100);
            
            // Button animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Move to step 2 after delay
            setTimeout(() => {
                showStep(2);
            }, 800);
        });
    }
    
    // No Button
    if (noBtn) {
        noBtn.addEventListener('click', function() {
            console.log('❌ No clicked:', noClickCount);
            noClickCount++;
            
            // Move button randomly
            const maxX = window.innerWidth - this.offsetWidth - 50;
            const maxY = window.innerHeight - this.offsetHeight - 100;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            this.style.position = 'absolute';
            this.style.left = `${randomX}px`;
            this.style.top = `${randomY}px`;
            
            // Show message
            if (noMessage) {
                noMessage.style.display = 'block';
                
                const messages = [
                    "Really, Bhallu? 😢 Try again...",
                    "Are you sure? 🥺",
                    "My heart! 💔 Just kidding...",
                    "Please? 🥰",
                    "Last chance! Say yes! 💖"
                ];
                
                const msgIndex = Math.min(noClickCount - 1, messages.length - 1);
                noMessage.innerHTML = `<p>${messages[msgIndex]}</p>`;
                
                // Shake animation
                noMessage.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 300,
                    iterations: 2
                });
            }
            
            // Make button smaller
            const scale = Math.max(0.7, 1 - (noClickCount * 0.1));
            this.style.transform = `scale(${scale})`;
        });
    }
    
    // Music Control
    window.toggleMusic = function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            isMusicPlaying = false;
        } else {
            // Try to play music
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isMusicPlaying = true;
            }).catch(error => {
                console.log('Music play failed:', error);
                alert('Click anywhere on the page first, then try the music button again.');
            });
        }
        
        // Button animation
        musicBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            musicBtn.style.transform = 'scale(1)';
        }, 300);
    };
    
    // Quiz Answer
    window.showAnswer = function(button, answer) {
        // Create answer popup
        const answerDiv = document.createElement('div');
        answerDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff2e63, #ff8ba0);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 1000;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        `;
        
        answerDiv.innerHTML = `
            <p style="font-size: 1.2rem; margin-bottom: 20px;">${answer}</p>
            <button onclick="this.parentElement.remove()" 
                    style="background: white; color: #ff2e63; border: none; padding: 10px 25px; border-radius: 20px; cursor: pointer; font-weight: bold;">
                Got it! 💖
            </button>
        `;
        
        document.body.appendChild(answerDiv);
        
        // Disable button
        button.disabled = true;
        button.textContent = "Answered! 💝";
        button.style.background = '#ff2e63';
        button.style.color = 'white';
    };
    
    // Unlock Message
    window.unlockMessage = function() {
        const password = document.getElementById('password').value.toLowerCase();
        console.log('Password attempt:', password);
        
        if (password === 'bhallu' || password === '0512' || password === 'bear' || password === 'aroush') {
            // Success!
            createConfetti(200);
            
            // Show final message
            const finalMsg = document.getElementById('final-message');
            finalMsg.style.display = 'block';
            
            // Hide lock section
            document.querySelector('.lock').style.display = 'none';
            
            // Start countdown
            startCountdown();
        } else {
            // Wrong password
            const input = document.getElementById('password');
            input.style.background = 'rgba(255, 46, 99, 0.2)';
            input.value = '';
            input.placeholder = 'Try again...';
            
            // Shake animation
            input.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 300,
                iterations: 2
            });
        }
    };
    
    // Share Site
    window.shareSite = function() {
        if (navigator.share) {
            navigator.share({
                title: 'For My Aroush 💖',
                text: 'A special Valentine\'s surprise!',
                url: window.location.href
            });
        } else {
            // Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copied to clipboard! Share it with your love 💖');
            });
        }
    };
    
    // Helper Functions
    function createHearts() {
        const container = document.querySelector('.floating-hearts');
        if (!container) return;
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${20 + Math.random() * 30}px;
                opacity: ${0.1 + Math.random() * 0.2};
                z-index: 1;
                pointer-events: none;
                animation: float ${15 + Math.random() * 20}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(heart);
        }
    }
    
    function createConfetti(count) {
        const colors = ['#FF2E63', '#F9ED69', '#AA96DA', '#FFFFFF'];
        const container = document.getElementById('confetti');
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: -20px;
                z-index: 1000;
                pointer-events: none;
            `;
            container.appendChild(confetti);
            
            // Animate
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    function animateLoveMeter() {
        const meter = document.querySelector('.meter-fill');
        if (meter) {
            meter.style.width = '0%';
            setTimeout(() => {
                meter.style.width = '100%';
                meter.style.transition = 'width 2s ease-out';
            }, 500);
        }
    }
    
    function startCountdown() {
        const now = new Date();
        let valentine = new Date(now.getFullYear(), 1, 14); // Feb 14
        
        if (now > valentine) {
            valentine.setFullYear(valentine.getFullYear() + 1);
        }
        
        function update() {
            const now = new Date();
            const diff = valentine - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update display
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        update();
        setInterval(update, 1000);
    }
    
    // Enable audio on first click
    document.body.addEventListener('click', function initAudio() {
        // Try to play/pause quickly to unlock audio
        bgMusic.volume = 0.001;
        bgMusic.play().then(() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            console.log('🔊 Audio unlocked');
        }).catch(e => {
            console.log('Audio still blocked');
        });
        
        // Remove listener
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextStep();
        } else if (e.key === 'ArrowLeft') {
            prevStep();
        } else if (e.key === '1') {
            showStep(1);
        } else if (e.key === '2') {
            showStep(2);
        } else if (e.key === '3') {
            showStep(3);
        } else if (e.key === '4') {
            showStep(4);
        } else if (e.key === '5') {
            showStep(5);
        }
    });
    
    // Console message
    console.log('%c💝 For Aroush - My Bhallu, My Everything 💝', 
        'color: #ff2e63; font-size: 16px; font-weight: bold;');
    console.log('%cMade with infinite love ❤️', 
        'color: #ff8ba0; font-size: 14px; font-style: italic;');
});
}
