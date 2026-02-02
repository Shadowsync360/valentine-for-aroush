// ===========================================
// ULTIMATE VALENTINE WEBSITE - INTERACTIVITY
// For Aroush - Making Every Moment Magical
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Starting Aroush\'s Valentine Experience...');
    
    // ==================== GLOBAL VARIABLES ====================
    const steps = document.querySelectorAll('.step');
    const dots = document.querySelectorAll('.dot');
    const loader = document.getElementById('loader');
    const mainContainer = document.getElementById('main-container');
    const bgMusic = document.getElementById('bg-music');
    const playMusicBtn = document.getElementById('play-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    const fireworksContainer = document.getElementById('fireworks');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const secretNoMessage = document.getElementById('secret-no-message');
    const fireworksBtn = document.getElementById('fireworks-btn');
    const meterFill = document.getElementById('meter-fill');
    const lovePercent = document.getElementById('love-percent');
    const questRevealBtns = document.querySelectorAll('.quest-reveal');
    const passwordInput = document.getElementById('password');
    const unlockBtn = document.getElementById('unlock-btn');
    const finalMessage = document.getElementById('finalMessage');
    const shareBtn = document.getElementById('share-btn');
    const nextStepBtns = document.querySelectorAll('.next-step-btn');
    const toStep3Btn = document.getElementById('to-step3');
    const toStep4Btn = document.getElementById('to-step4');
    const toStep5Btn = document.getElementById('to-step5');
    
    let currentStep = 1;
    let noClickCount = 0;
    let isMusicPlaying = false;
    let loveMeterInterval;
    let catAnimationInterval;
    let fireworksInterval;
    
    // ==================== INITIALIZATION ====================
    function init() {
        // Hide loader after 2 seconds
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                mainContainer.style.opacity = '1';
                
                // Create floating hearts
                createFloatingHearts();
                
                // Start subtle animations
                startAmbientAnimations();
                
                // Show step 1
                showStep(1);
                
                // Initialize countdown
                updateCountdown();
                setInterval(updateCountdown, 1000);
                
                // Initialize love meter animation
                animateLoveMeter();
                
                // Initialize cat animations
                animateCats();
                
                // Personalize the site
                personalizeSite();
            }, 500);
        }, 2000);
        
        // Initialize event listeners
        setupEventListeners();
        
        // Initialize GSAP animations
        initGSAPAnimations();
    }
    
    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Navigation dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const stepNum = parseInt(this.getAttribute('data-step'));
                showStep(stepNum);
            });
        });
        
        // Music controls
        playMusicBtn.addEventListener('click', toggleMusic);
        musicToggleBtn.addEventListener('click', toggleMusic);
        
        // Step 1 - Yes/No buttons
        yesBtn.addEventListener('click', handleYesClick);
        noBtn.addEventListener('click', handleNoClick);
        
        // Step 2 - Fireworks button
        fireworksBtn.addEventListener('click', launchFireworks);
        
        // Step 4 - Quest reveal buttons
        questRevealBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const answer = this.getAttribute('data-answer');
                revealAnswer(this, answer);
            });
        });
        
        // Step 5 - Password unlock
        unlockBtn.addEventListener('click', unlockFinalMessage);
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') unlockFinalMessage();
        });
        
        // Share button
        shareBtn.addEventListener('click', shareSite);
        
        // Next step buttons
        nextStepBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const current = this.closest('.step').id;
                const nextStepNum = parseInt(current.replace('step', '')) + 1;
                showStep(nextStepNum);
            });
        });
        
        // Special navigation for specific buttons
        toStep3Btn?.addEventListener('click', () => showStep(3));
        toStep4Btn?.addEventListener('click', () => showStep(4));
        toStep5Btn?.addEventListener('click', () => showStep(5));
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Right arrow or space for next step
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                if (currentStep < 5) showStep(currentStep + 1);
            }
            // Left arrow for previous step
            else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentStep > 1) showStep(currentStep - 1);
            }
            // Escape to reset
            else if (e.key === 'Escape') {
                showStep(1);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', debounce(handleResize, 250));
        
        // Handle visibility change (for music)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isMusicPlaying) {
                bgMusic.pause();
            } else if (!document.hidden && isMusicPlaying) {
                bgMusic.play().catch(e => console.log('Audio play failed:', e));
            }
        });
    }
    
    // ==================== STEP MANAGEMENT ====================
    function showStep(stepNum) {
        // Validate step number
        if (stepNum < 1 || stepNum > 5) return;
        
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
        });
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[stepNum - 1].classList.add('active');
        
        // Show selected step
        const targetStep = document.getElementById(`step${stepNum}`);
        targetStep.classList.add('active');
        
        // Animate in
        setTimeout(() => {
            targetStep.style.opacity = '1';
            targetStep.style.transform = 'translateY(0)';
            
            // Trigger step-specific animations
            triggerStepAnimations(stepNum);
        }, 50);
        
        // Update current step
        currentStep = stepNum;
        
        // Log step change
        console.log(`📱 Switched to Step ${stepNum}`);
    }
    
    function triggerStepAnimations(stepNum) {
        switch(stepNum) {
            case 1:
                // Envelope opening animation
                animateEnvelope();
                break;
            case 2:
                // Timeline animations
                animateTimeline();
                break;
            case 3:
                // Love letter writing effect
                animateLetterWriting();
                break;
            case 4:
                // Memory gallery animations
                animateMemoryFrames();
                break;
            case 5:
                // Final surprise animations
                animateLock();
                break;
        }
    }
    
    // ==================== STEP 1: ENVELOPE & YES/NO ====================
    function animateEnvelope() {
        // Create envelope flap animation
        const envelopeFlap = document.querySelector('.envelope-flap');
        if (envelopeFlap) {
            envelopeFlap.style.animation = 'envelopeOpen 2s ease-out forwards';
            
            // Add sparkle effect
            setTimeout(() => {
                createSparkles(envelopeFlap, 10);
            }, 1500);
        }
        
        // Animate the question
        const questionBox = document.querySelector('.question-box');
        if (questionBox) {
            gsap.from(questionBox, {
                duration: 1,
                scale: 0.8,
                opacity: 0,
                rotation: -5,
                ease: "back.out(1.7)",
                delay: 1
            });
        }
    }
    
    function handleYesClick() {
        // Create celebration effect
        createConfetti(100);
        createSparkles(yesBtn, 20);
        
        // Animate button
        gsap.to(yesBtn, {
            duration: 0.5,
            scale: 1.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });
        
        // Show success message
        const originalText = yesBtn.querySelector('.btn-text').textContent;
        yesBtn.querySelector('.btn-text').textContent = "YAY! I knew it! 💖";
        
        // Move to step 2 after delay
        setTimeout(() => {
            showStep(2);
            
            // Reset button text
            setTimeout(() => {
                yesBtn.querySelector('.btn-text').textContent = originalText;
            }, 1000);
        }, 1500);
        
        // Play happy sound
        playSound('success');
    }
    
    function handleNoClick() {
        noClickCount++;
        
        // Move button randomly
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 100;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        gsap.to(noBtn, {
            duration: 0.5,
            x: randomX,
            y: randomY,
            rotation: Math.random() * 20 - 10,
            ease: "power2.out"
        });
        
        // Show/hide secret message
        secretNoMessage.style.display = 'block';
        gsap.from(secretNoMessage, {
            duration: 0.3,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        });
        
        // Change message based on click count
        const messages = [
            "Really, Bhallu? 😢 Try again, my love...",
            "Are you sure? 🥺 I'll keep asking!",
            "You're breaking my heart! 💔 Just kidding...",
            "Okay, I see how it is! 😤 (jk, try again)",
            "Final chance! Say yes please? 🥰"
        ];
        
        const messageIndex = Math.min(noClickCount - 1, messages.length - 1);
        secretNoMessage.innerHTML = `<p>${messages[messageIndex]}</p>`;
        
        // Shake animation
        gsap.to(secretNoMessage, {
            duration: 0.1,
            x: 10,
            yoyo: true,
            repeat: 5,
            ease: "power1.inOut"
        });
        
        // Make button smaller each time
        const scale = Math.max(0.7, 1 - (noClickCount * 0.1));
        gsap.to(noBtn, {
            duration: 0.3,
            scale: scale,
            ease: "power2.out"
        });
        
        // Play sad sound on first few clicks
        if (noClickCount <= 3) {
            playSound('sad');
        }
    }
    
    // ==================== STEP 2: TIMELINE ====================
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            // Reset for re-animation
            gsap.set(item, { opacity: 0, y: 50 });
            
            // Staggered animation
            gsap.to(item, {
                duration: 1,
                opacity: 1,
                y: 0,
                delay: index * 0.3,
                ease: "power2.out"
            });
            
            // Add hover effect
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    duration: 0.3,
                    scale: 1.02,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });
        
        // Animate clock hands
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        
        if (hourHand && minuteHand) {
            gsap.to(hourHand, {
                duration: 24,
                rotation: 360,
                repeat: -1,
                ease: "none"
            });
            
            gsap.to(minuteHand, {
                duration: 2,
                rotation: 360,
                repeat: -1,
                ease: "none"
            });
        }
        
        // Animate chat bubbles
        const chatBubbles = document.querySelectorAll('.chat-bubble');
        chatBubbles.forEach((bubble, index) => {
            gsap.from(bubble, {
                duration: 0.8,
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                delay: 1 + (index * 0.2),
                ease: "back.out(1.7)"
            });
        });
    }
    
    function animateLoveMeter() {
        if (!meterFill) return;
        
        let percent = 0;
        clearInterval(loveMeterInterval);
        
        loveMeterInterval = setInterval(() => {
            if (percent < 100) {
                percent += 1;
                meterFill.style.width = `${percent}%`;
                lovePercent.textContent = `${percent}%`;
                
                // Color change based on percentage
                if (percent < 33) {
                    meterFill.style.background = 'linear-gradient(135deg, #FF2E63, #FF8BA0)';
                } else if (percent < 66) {
                    meterFill.style.background = 'linear-gradient(135deg, #FF2E63, #FF1168)';
                } else {
                    meterFill.style.background = 'linear-gradient(135deg, #FF2E63, #AA96DA)';
                }
            } else {
                clearInterval(loveMeterInterval);
                
                // Pulse effect when full
                gsap.to(meterFill, {
                    duration: 0.5,
                    boxShadow: '0 0 20px rgba(255, 46, 99, 0.7)',
                    yoyo: true,
                    repeat: 3,
                    ease: "power1.inOut"
                });
            }
        }, 30);
    }
    
    function launchFireworks() {
        // Show fireworks container
        fireworksContainer.style.display = 'block';
        
        // Create multiple fireworks
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 200);
        }
        
        // Play fireworks sound
        playSound('firework');
        
        // Hide after animation
        setTimeout(() => {
            fireworksContainer.style.display = 'none';
            // Clear fireworks
            fireworksContainer.innerHTML = '';
        }, 4000);
    }
    
    // ==================== STEP 3: LOVE LETTER ====================
    function animateLetterWriting() {
        const handwrittenText = document.querySelector('.handwritten-text');
        if (!handwrittenText) return;
        
        // Reset opacity for animation
        const paragraphs = handwrittenText.querySelectorAll('p, li');
        paragraphs.forEach(p => {
            gsap.set(p, { opacity: 0 });
        });
        
        // Animate each paragraph sequentially
        let delay = 0;
        paragraphs.forEach((p, index) => {
            // Create typing effect for each paragraph
            const text = p.textContent;
            p.textContent = '';
            
            setTimeout(() => {
                // Typewriter effect
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        p.textContent += text.charAt(charIndex);
                        charIndex++;
                        
                        // Random typing sound occasionally
                        if (Math.random() > 0.7) {
                            playSound('type', 0.1);
                        }
                    } else {
                        clearInterval(typeInterval);
                        
                        // Fade in the paragraph
                        gsap.to(p, {
                            duration: 0.5,
                            opacity: 1,
                            ease: "power2.out"
                        });
                    }
                }, 30); // Typing speed
            }, delay);
            
            delay += text.length * 30 + 500; // Add delay between paragraphs
        });
        
        // Animate rose
        const rose = document.querySelector('.rose');
        if (rose) {
            gsap.from(rose, {
                duration: 2,
                scale: 0,
                rotation: 360,
                ease: "back.out(1.7)",
                delay: delay / 1000
            });
        }
    }
    
    // ==================== STEP 4: MEMORY GALLERY ====================
    function animateMemoryFrames() {
        const memoryFrames = document.querySelectorAll('.memory-frame');
        
        memoryFrames.forEach((frame, index) => {
            // Reset position
            gsap.set(frame, { opacity: 0, y: 50, rotationY: 90 });
            
            // Staggered 3D flip animation
            gsap.to(frame, {
                duration: 1,
                opacity: 1,
                y: 0,
                rotationY: 0,
                delay: index * 0.2,
                ease: "back.out(1.7)",
                onComplete: function() {
                    // Add continuous subtle float
                    gsap.to(frame, {
                        duration: 2 + Math.random(),
                        y: -5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            });
            
            // Add click interaction
            frame.addEventListener('click', function() {
                const memoryNum = this.getAttribute('data-memory');
                showMemoryDetail(memoryNum);
            });
        });
    }
    
    function showMemoryDetail(memoryNum) {
        const memories = {
            1: {
                title: "The First Text",
                description: "That simple 'Hey...' at 8:53 AM started it all. My heart has been racing ever since.",
                emoji: "📱",
                color: "#ffafcc"
            },
            2: {
                title: "First 'I Love You'",
                description: "When you first called me 'mera bacha', I knew I wanted to hear that forever.",
                emoji: "✨",
                color: "#a2d2ff"
            },
            3: {
                title: "Inside Jokes",
                description: "All those little moments and laughs that only we understand. Our secret world.",
                emoji: "😂",
                color: "#ffafbd"
            },
            4: {
                title: "Bhallu Moments",
                description: "Every time I call you Bhallu and you give me that adorable bear-like smile.",
                emoji: "🐻",
                color: "#cdb4db"
            }
        };
        
        const memory = memories[memoryNum];
        if (!memory) return;
        
        // Create memory detail popup
        const popup = document.createElement('div');
        popup.className = 'memory-popup';
        popup.style.background = `linear-gradient(135deg, ${memory.color}, ${memory.color}99)`;
        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-popup">&times;</button>
                <div class="popup-emoji">${memory.emoji}</div>
                <h3>${memory.title}</h3>
                <p>${memory.description}</p>
                <div class="popup-footer">💖 One of many precious moments with you</div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Animate in
        gsap.from(popup, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        });
        
        // Close button
        popup.querySelector('.close-popup').addEventListener('click', function() {
            gsap.to(popup, {
                duration: 0.3,
                scale: 0,
                opacity: 0,
                ease: "power2.in",
                onComplete: () => popup.remove()
            });
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                gsap.to(popup, {
                    duration: 0.3,
                    scale: 0,
                    opacity: 0,
                    ease: "power2.in",
                    onComplete: () => popup.remove()
                });
            }
        }, 5000);
    }
    
    function revealAnswer(button, answer) {
        // Create answer display
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-reveal';
        answerDiv.innerHTML = `
            <div class="answer-content">
                <p>${answer}</p>
                <button class="close-answer">Got it! 💖</button>
            </div>
        `;
        
        // Position near the button
        const rect = button.getBoundingClientRect();
        answerDiv.style.position = 'fixed';
        answerDiv.style.left = `${rect.left}px`;
        answerDiv.style.top = `${rect.bottom + 10}px`;
        answerDiv.style.zIndex = '1000';
        
        document.body.appendChild(answerDiv);
        
        // Animate in
        gsap.from(answerDiv, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        });
        
        // Close button
        answerDiv.querySelector('.close-answer').addEventListener('click', function() {
            gsap.to(answerDiv, {
                duration: 0.3,
                scale: 0,
                opacity: 0,
                ease: "power2.in",
                onComplete: () => answerDiv.remove()
            });
        });
        
        // Disable the reveal button
        button.disabled = true;
        button.textContent = "Revealed! 💖";
        button.style.background = 'var(--gradient-love)';
        button.style.color = 'white';
        
        // Play reveal sound
        playSound('reveal');
    }
    
    function animateCats() {
        const catItems = document.querySelectorAll('.cat-item');
        if (!catItems.length) return;
        
        clearInterval(catAnimationInterval);
        
        catAnimationInterval = setInterval(() => {
            // Randomly animate a cat
            const randomCat = catItems[Math.floor(Math.random() * catItems.length)];
            
            gsap.to(randomCat, {
                duration: 0.3,
                scale: 1.5,
                rotation: 15,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(randomCat, {
                        duration: 0.3,
                        scale: 1,
                        rotation: 0,
                        ease: "power2.out"
                    });
                }
            });
            
            // Occasionally play cat sound
            if (Math.random() > 0.8) {
                playSound('cat', 0.2);
            }
        }, 2000);
    }
    
    // ==================== STEP 5: FINAL SURPRISE ====================
    function animateLock() {
        const lockShackle = document.querySelector('.lock-shackle');
        if (!lockShackle) return;
        
        // Continuous float animation
        gsap.to(lockShackle, {
            duration: 2,
            y: -5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Glow effect
        gsap.to('.lock-body', {
            duration: 2,
            boxShadow: '0 0 20px rgba(255, 46, 99, 0.5)',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    function unlockFinalMessage() {
        const password = passwordInput.value.trim().toLowerCase();
        const validPasswords = ['bhallu', '0512', 'bear', 'aroush', 'mera bacha'];
        
        if (validPasswords.includes(password)) {
            // Success!
            createConfetti(200);
            createSparkles(unlockBtn, 30);
            
            // Animate lock opening
            const lockShackle = document.querySelector('.lock-shackle');
            gsap.to(lockShackle, {
                duration: 1,
                y: -30,
                rotation: 30,
                ease: "back.out(1.7)"
            });
            
            // Show final message
            gsap.to(finalMessage, {
                duration: 1,
                display: 'block',
                opacity: 1,
                y: 0,
                ease: "back.out(1.7)",
                delay: 0.5
            });
            
            // Hide password input
            gsap.to('.password-input, .hints', {
                duration: 0.5,
                opacity: 0,
                y: -20,
                ease: "power2.in",
                onComplete: function() {
                    document.querySelector('.password-input').style.display = 'none';
                    document.querySelector('.hints').style.display = 'none';
                }
            });
            
            // Start final countdown
            startFinalCountdown();
            
            // Play success sound
            playSound('unlock');
            
            // Log successful unlock
            console.log('🎉 Final message unlocked with password:', password);
        } else {
            // Wrong password - shake animation
            gsap.to(passwordInput, {
                duration: 0.1,
                x: 10,
                backgroundColor: 'rgba(255, 46, 99, 0.2)',
                yoyo: true,
                repeat: 5,
                ease: "power1.inOut",
                onComplete: function() {
                    gsap.to(passwordInput, {
                        duration: 0.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    });
                }
            });
            
            // Clear input
            passwordInput.value = '';
            passwordInput.placeholder = 'Try again, my love...';
            
            // Play error sound
            playSound('error');
        }
    }
    
    function startFinalCountdown() {
        // Set target date (next Valentine's Day)
        const now = new Date();
        let targetDate = new Date(now.getFullYear(), 1, 14); // February 14
        
        // If Valentine's has passed this year, set to next year
        if (now > targetDate) {
            targetDate.setFullYear(targetDate.getFullYear() + 1);
        }
        
        function update() {
            const now = new Date();
            const diff = targetDate - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update display
            const cdDays = document.getElementById('cd-days');
            const cdHours = document.getElementById('cd-hours');
            const cdMinutes = document.getElementById('cd-minutes');
            const cdSeconds = document.getElementById('cd-seconds');
            
            if (cdDays) cdDays.textContent = days.toString().padStart(3, '0');
            if (cdHours) cdHours.textContent = hours.toString().padStart(2, '0');
            if (cdMinutes) cdMinutes.textContent = minutes.toString().padStart(2, '0');
            if (cdSeconds) cdSeconds.textContent = seconds.toString().padStart(2, '0');
            
            // Animate number changes
            [cdDays, cdHours, cdMinutes, cdSeconds].forEach(el => {
                if (el) {
                    gsap.to(el, {
                        duration: 0.3,
                        scale: 1.2,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.out"
                    });
                }
            });
        }
        
        // Initial update
        update();
        
        // Update every second
        setInterval(update, 1000);
    }
    
    // ==================== MUSIC CONTROLS ====================
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            playMusicBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicToggleBtn.querySelector('span').textContent = 'Play Our Song';
            isMusicPlaying = false;
        } else {
            bgMusic.play().then(() => {
                playMusicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggleBtn.querySelector('span').textContent = 'Pause Music';
                isMusicPlaying = true;
                
                // Fade in volume
                gsap.to(bgMusic, {
                    duration: 2,
                    volume: 0.5,
                    ease: "power2.out"
                });
            }).catch(e => {
                console.log('Audio play failed:', e);
                // Show message to user
                alert('Please interact with the page first to play music, or enable autoplay in your browser settings.');
            });
        }
        
        // Animate button
        gsap.to(playMusicBtn, {
            duration: 0.3,
            scale: 1.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });
    }
    
    // ==================== VISUAL EFFECTS ====================
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        if (!container) return;
        
        // Clear existing hearts
        container.innerHTML = '';
        
        // Create 20 floating hearts
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = ['❤️', '💖', '💗', '💓', '💕', '💞'][Math.floor(Math.random() * 6)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.fontSize = `${15 + Math.random() * 20}px`;
            heart.style.opacity = `${0.1 + Math.random() * 0.2}`;
            heart.style.setProperty('--duration', `${15 + Math.random() * 20}s`);
            heart.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(heart);
        }
    }
    
    function createSparkles(element, count) {
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'absolute';
            sparkle.style.width = '5px';
            sparkle.style.height = '5px';
            sparkle.style.background = 'white';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            
            // Position randomly near the element
            const rect = element.getBoundingClientRect();
            sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
            sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            gsap.to(sparkle, {
                duration: 0.5 + Math.random() * 0.5,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
                scale: 0,
                ease: "power2.out",
                onComplete: () => sparkle.remove()
            });
        }
    }
    
    function createConfetti(count) {
        const colors = ['#FF2E63', '#F9ED69', '#AA96DA', '#FFFFFF'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-20px';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            gsap.to(confetti, {
                duration: 1 + Math.random() * 2,
                y: window.innerHeight + 20,
                x: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                opacity: 0,
                ease: "power1.in",
                onComplete: () => confetti.remove()
            });
        }
    }
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.position = 'absolute';
        firework.style.left = `${20 + Math.random() * 60}%`;
        firework.style.top = `${20 + Math.random() * 60}%`;
        firework.style.width = '5px';
        firework.style.height = '5px';
        firework.style.background = '#FF2E63';
        firework.style.borderRadius = '50%';
        firework.style.zIndex = '1000';
        
        fireworksContainer.appendChild(firework);
        
        // Launch firework
        gsap.to(firework, {
            duration: 0.5,
            y: -100,
            ease: "power2.out",
            onComplete: function() {
                // Explode
                const particles = 20;
                for (let i = 0; i < particles; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'firework-particle';
                    particle.style.position = 'absolute';
                    particle.style.left = firework.style.left;
                    particle.style.top = firework.style.top;
                    particle.style.width = '3px';
                    particle.style.height = '3px';
                    particle.style.background = ['#FF2E63', '#F9ED69', '#AA96DA', '#FFFFFF'][Math.floor(Math.random() * 4)];
                    particle.style.borderRadius = '50%';
                    
                    fireworksContainer.appendChild(particle);
                    
                    // Animate particle
                    const angle = (i / particles) * Math.PI * 2;
                    const distance = 50 + Math.random() * 50;
                    
                    gsap.to(particle, {
                        duration: 0.8 + Math.random() * 0.4,
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        opacity: 0,
                        scale: 0,
                        ease: "power2.out",
                        onComplete: () => particle.remove()
                    });
                }
                
                // Remove main firework
                firework.remove();
            }
        });
    }
    
    function startAmbientAnimations() {
        // Subtle background pulse
        gsap.to('body', {
            duration: 4,
            backgroundPosition: '100% 100%',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Random sparkles
        setInterval(() => {
            if (Math.random() > 0.7) {
                createSparkles(document.body, 3);
            }
        }, 3000);
    }
    
    // ==================== SOUND EFFECTS ====================
    function playSound(type, volume = 0.3) {
        // Create audio context on first interaction
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const audioCtx = window.audioContext;
        
        switch(type) {
            case 'success':
                // Happy chime
                playNote(523.25, 0.5, volume); // C5
                setTimeout(() => playNote(659.25, 0.5, volume), 100); // E5
                setTimeout(() => playNote(783.99, 0.8, volume), 200); // G5
                break;
                
            case 'sad':
                // Sad tone
                playNote(392.00, 0.5, volume); // G4
                setTimeout(() => playNote(349.23, 0.8, volume * 0.8), 150); // F4
                break;
                
            case 'firework':
                // Explosion sound
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        playNote(800 + Math.random() * 400, 0.2, volume * 0.5);
                    }, i * 50);
                }
                break;
                
            case 'type':
                // Typewriter sound
                playNote(100 + Math.random() * 100, 0.1, volume * 0.3);
                break;
                
            case 'reveal':
                // Magical reveal
                playNote(659.25, 0.3, volume); // E5
                setTimeout(() => playNote(830.61, 0.5, volume), 100); // G#5
                break;
                
            case 'unlock':
                // Unlock sound
                playNote(261.63, 0.2, volume); // C4
                setTimeout(() => playNote(329.63, 0.2, volume), 100); // E4
                setTimeout(() => playNote(392.00, 0.5, volume), 200); // G4
                break;
                
            case 'error':
                // Error buzz
                playNote(200, 0.1, volume);
                setTimeout(() => playNote(180, 0.1, volume), 50);
                setTimeout(() => playNote(160, 0.1, volume), 100);
                break;
                
            case 'cat':
                // Cat meow-like sound
                playNote(300 + Math.random() * 100, 0.3, volume * 0.5);
                break;
        }
    }
    
    function playNote(frequency, duration, volume) {
        const audioCtx = window.audioContext;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);
    }
    
    // ==================== UTILITY FUNCTIONS ====================
    function personalizeSite() {
        // Replace all instances of placeholder text
        document.body.innerHTML = document.body.innerHTML
            .replace(/\[Her Name\]/g, 'Aroush')
            .replace(/Bhallu/g, '<span class="bear-highlight">Bhallu</span>')
            .replace(/Mari Jan/g, '<span class="special-name">Mari Jan</span>');
        
        // Add special highlight styles
        const style = document.createElement('style');
        style.textContent = `
            .bear-highlight {
                color: var(--bear-brown);
                font-weight: bold;
                text-shadow: 0 0 10px rgba(198, 134, 66, 0.3);
                animation: bearGlow 2s infinite alternate;
            }
            @keyframes bearGlow {
                from { text-shadow: 0 0 10px rgba(198, 134, 66, 0.3); }
                to { text-shadow: 0 0 20px rgba(198, 134, 66, 0.6); }
            }
            .special-name {
                color: var(--gold);
                font-family: 'Dancing Script', cursive;
                font-size: 1.2em;
            }
        `;
        document.head.appendChild(style);
        
        console.log('💝 Site personalized for Aroush!');
    }
    
    function shareSite() {
        if (navigator.share) {
            navigator.share({
                title: 'For My Aroush 💖',
                text: 'A special Valentine\'s surprise made with love!',
                url: window.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Link copied to clipboard! Share it with your love 💖');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                prompt('Copy this link to share:', window.location.href);
            });
        }
        
        // Animate share button
        gsap.to(shareBtn, {
            duration: 0.3,
            scale: 1.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });
    }
    
    function updateCountdown() {
        // Update any countdown elements if they exist
        const countdownElements = document.querySelectorAll('.countdown-timer');
        // This function is called by the interval, implementation would go here
    }
    
    function handleResize() {
        // Recalculate any responsive elements
        createFloatingHearts();
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function initGSAPAnimations() {
        // Register GSAP plugins if needed
        if (typeof gsap !== 'undefined') {
            console.log('✨ GSAP loaded and ready for animation magic!');
        }
    }
    
    // ==================== INITIALIZE EVERYTHING ====================
    init();
    
    // Easter egg: Console message
    console.log('%c💖 For Aroush - The Most Amazing Person I Know 💖', 
        'color: #FF2E63; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cMade with infinite love by your Bacha ❤️', 
        'color: #AA96DA; font-size: 14px; font-style: italic;');
});

// ==================== ADDITIONAL CSS FOR DYNAMIC ELEMENTS ====================
// Inject styles for dynamically created elements
const dynamicStyles = `
    .memory-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 400px;
        padding: 30px;
        border-radius: 20px;
        color: white;
        z-index: 10000;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        backdrop-filter: blur(10px);
        border: 3px solid rgba(255,255,255,0.3);
    }
    
    .popup-content {
        position: relative;
        text-align: center;
    }
    
    .close-popup {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 30px;
        height: 30px;
        background: #FF2E63;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        line-height: 1;
    }
    
    .popup-emoji {
        font-size: 4rem;
        margin-bottom: 20px;
        animation: bounce 1s infinite alternate;
    }
    
    .popup-content h3 {
        font-size: 1.8rem;
        margin-bottom: 15px;
        color: white;
    }
    
    .popup-footer {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid rgba(255,255,255,0.3);
        font-style: italic;
        opacity: 0.8;
    }
    
    .answer-reveal {
        background: linear-gradient(135deg, #AA96DA, #C5B6F3);
        color: #1A1A2E;
        padding: 20px;
        border-radius: 15px;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.5);
    }
    
    .answer-content p {
        margin-bottom: 15px;
        font-size: 1.1rem;
        line-height: 1.4;
    }
    
    .close-answer {
        background: #FF2E63;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        width: 100%;
        transition: all 0.3s;
    }
    
    .close-answer:hover {
        background: #FF1168;
        transform: scale(1.05);
    }
    
    @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
    }
    
    /* Responsive adjustments for dynamic elements */
    @media (max-width: 768px) {
        .memory-popup {
            width: 95%;
            padding: 20px;
        }
        
        .answer-reveal {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 90%;
            max-width: none;
        }
    }
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ==================== SERVICE WORKER FOR OFFLINE ACCESS ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ==================== PWA FEATURES ====================
// Add to homescreen prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show custom install button (optional)
    setTimeout(() => {
        const installBtn = document.createElement('button');
        installBtn.textContent = '📱 Add to Home Screen';
        installBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gradient-love);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 10000;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        `;
        installBtn.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
                installBtn.remove();
            });
        });
        document.body.appendChild(installBtn);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (installBtn.parentNode) {
                installBtn.remove();
            }
        }, 10000);
    }, 5000);
});

// ==================== PAGE VISIBILITY TRACKING ====================
// Track how long user spends on site
let startTime = Date.now();
let totalTime = 0;
let isVisible = true;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        totalTime += Date.now() - startTime;
        isVisible = false;
    } else {
        startTime = Date.now();
        isVisible = true;
    }
});

// Log time on unload
window.addEventListener('beforeunload', () => {
    if (isVisible) {
        totalTime += Date.now() - startTime;
    }
    
    console.log(`💕 Total time spent on Aroush's Valentine site: ${Math.round(totalTime/1000)} seconds`);
    
    // Could send this to analytics
    if (totalTime > 30000) { // 30 seconds
        console.log('🎯 User spent significant time on the site! Mission accomplished!');
    }
});

// ==================== VALENTINE'S DAY SPECIAL ====================
// Check if it's Valentine's Day
const today = new Date();
const isValentinesDay = today.getMonth() === 1 && today.getDate() === 14; // February 14

if (isValentinesDay) {
    // Add special Valentine's Day effects
    document.body.classList.add('valentines-day');
    
    // Create falling rose petals
    setInterval(() => {
        if (Math.random() > 0.7) {
            const petal = document.createElement('div');
            petal.innerHTML = '🌸';
            petal.style.position = 'fixed';
            petal.style.top = '-50px';
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.fontSize = `${20 + Math.random() * 20}px`;
            petal.style.opacity = '0.7';
            petal.style.zIndex = '1';
            petal.style.pointerEvents = 'none';
            
            document.body.appendChild(petal);
            
            // Animate falling
            gsap.to(petal, {
                duration: 5 + Math.random() * 5,
                y: window.innerHeight + 100,
                x: (Math.random() - 0.5) * 200,
                rotation: 360,
                ease: "none",
                onComplete: () => petal.remove()
            });
        }
    }, 500);
    
    console.log('🎉 Happy Valentine\'s Day, Aroush! ❤️');
}