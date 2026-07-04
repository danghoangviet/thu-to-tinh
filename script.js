document.addEventListener("DOMContentLoaded", () => {
    // ================= CONFIGURATION & LOCAL STORAGE =================
    const DEFAULTS = {
        recipient: "Người tớ thương",
        sender: "Tớ",
        musicUrl: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-acoustic-piano-and-strings-1002.mp3",
        confessionText: "Tớ đã gom góp hết sự can đảm của mình để làm trang web này. Suốt thời gian qua, cậu đã trở thành lý do để tớ mỉm cười mỗi ngày. Tớ không muốn bỏ lỡ cậu nữa...",
        successLetterText: "Cảm ơn cậu đã đồng ý! Đây là khoảnh khắc hạnh phúc nhất của tớ. Tớ hứa sẽ luôn chăm sóc, trân trọng và mang lại thật nhiều tiếng cười cho cậu. Chúng mình cùng viết tiếp những trang truyện thật đẹp nhé!",
        milestones: [
            { date: "01/01/2026", title: "Lần đầu gặp gỡ", desc: "Ngày đầu tiên tớ vô tình chạm ánh mắt cậu. Trái tim tớ đã lỡ mất một nhịp mà lúc đó tớ chưa hề nhận ra..." },
            { date: "14/02/2026", title: "Tin nhắn thâu đêm", desc: "Những cuộc trò chuyện không đầu không cuối, những câu chúc ngủ ngon mỗi tối làm tớ mong chờ từng hồi chuông điện thoại." },
            { date: "08/03/2026", title: "Buổi hẹn hò đầu tiên", desc: "Ly cà phê hôm ấy ngọt ngào lạ thường. Dưới ánh đèn đường ấm áp, nụ cười của cậu làm lu mờ mọi thứ xung quanh." }
        ]
    };

    let config = JSON.parse(localStorage.getItem("love_confession_config")) || DEFAULTS;

    // Save configurations
    function saveConfig(newConfig) {
        config = newConfig;
        localStorage.setItem("love_confession_config", JSON.stringify(config));
        applyConfig();
    }

    // Apply config to UI
    function applyConfig() {
        // Names
        document.getElementById("recipient-name-display").textContent = config.recipient;
        document.getElementById("sender-name-display").textContent = config.sender;
        document.getElementById("signature-display").textContent = `Yêu ${config.recipient} thật nhiều, từ ${config.sender}!`;
        
        // Texts
        document.getElementById("confession-letter-text").textContent = config.confessionText;
        document.getElementById("success-letter-body").textContent = config.successLetterText;
        
        // Music Source
        const bgMusic = document.getElementById("bg-music");
        const musicSource = bgMusic.querySelector("source");
        if (musicSource.src !== config.musicUrl) {
            musicSource.src = config.musicUrl;
            bgMusic.load();
            if (!bgMusic.paused) {
                bgMusic.play().catch(e => console.log("Audio autoplay prevented", e));
            }
        }

        // Timeline Milestones
        config.milestones.forEach((milestone, idx) => {
            const num = idx + 1;
            const dateEl = document.getElementById(`date-${num}`);
            const titleEl = document.getElementById(`title-${num}`);
            const descEl = document.getElementById(`desc-${num}`);
            if (dateEl) dateEl.textContent = milestone.date;
            if (titleEl) titleEl.textContent = milestone.title;
            if (descEl) descEl.textContent = milestone.desc;
        });

        // Pre-fill form inputs in settings modal
        document.getElementById("input-recipient").value = config.recipient;
        document.getElementById("input-sender").value = config.sender;
        document.getElementById("input-music").value = config.musicUrl;
        document.getElementById("input-confession").value = config.confessionText;
        document.getElementById("input-success-letter").value = config.successLetterText;

        config.milestones.forEach((milestone, idx) => {
            const num = idx + 1;
            const dateInput = document.getElementById(`input-date-${num}`);
            const titleInput = document.getElementById(`input-title-${num}`);
            const descInput = document.getElementById(`input-desc-${num}`);
            if (dateInput) dateInput.value = milestone.date;
            if (titleInput) titleInput.value = milestone.title;
            if (descInput) descInput.value = milestone.desc;
        });
    }

    // ================= AUDIO CONTROLLERS =================
    const bgMusic = document.getElementById("bg-music");
    const clickSound = document.getElementById("click-sound");
    const successSound = document.getElementById("success-sound");
    const musicToggle = document.getElementById("music-toggle");

    // Play click sound
    function playClick() {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }

    // Toggle Music
    musicToggle.addEventListener("click", () => {
        playClick();
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Audio play failed", e));
            musicToggle.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i>';
            musicToggle.classList.remove("muted");
            musicToggle.setAttribute("aria-pressed", "true");
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute" aria-hidden="true"></i>';
            musicToggle.classList.add("muted");
            musicToggle.setAttribute("aria-pressed", "false");
        }
    });

    // ================= SCREEN TRANSITIONS =================
    const screens = {
        welcome: document.getElementById("screen-welcome"),
        timeline: document.getElementById("screen-timeline"),
        game: document.getElementById("screen-game"),
        confession: document.getElementById("screen-confession"),
        success: document.getElementById("screen-success")
    };

    function transitionTo(screenKey) {
        // Play click sound
        playClick();

        // Find active screen
        const activeScreen = document.querySelector(".screen.active");
        if (activeScreen) {
            activeScreen.classList.remove("active");
            // Delay showing new screen for smooth fade out
            setTimeout(() => {
                showScreen(screenKey);
            }, 600);
        } else {
            showScreen(screenKey);
        }
    }

    function showScreen(screenKey) {
        Object.keys(screens).forEach(key => {
            if (key === screenKey) {
                screens[key].style.display = "flex";
                // Trigger reflow for transition
                screens[key].offsetHeight;
                screens[key].classList.add("active");
                
                // Specific screen entrance callbacks
                if (screenKey === "timeline") {
                    initScrollReveal();
                } else if (screenKey === "game") {
                    initMemoryGame();
                } else if (screenKey === "success") {
                    triggerSuccessCelebration();
                }
            } else {
                screens[key].classList.remove("active");
                screens[key].style.display = "none";
            }
        });
    }

    // Screen 1: Start (Wax seal envelope click)
    const startEnvelope = document.getElementById("start-envelope");
    if (startEnvelope) {
        startEnvelope.addEventListener("click", () => {
            if (startEnvelope.classList.contains("open")) return;

            // Start playing music
            bgMusic.play().catch(e => console.log("Audio play failed", e));
            musicToggle.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i>';
            musicToggle.classList.remove("muted");
            musicToggle.setAttribute("aria-pressed", "true");

            // Play success/win sound
            successSound.currentTime = 0;
            successSound.play().catch(() => {});

            // Add open class to trigger CSS 3D opening
            startEnvelope.classList.add("open");

            // Particle burst at the wax seal location
            const sealEl = document.getElementById("start-wax-seal");
            if (sealEl) {
                const rect = sealEl.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;

                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { x, y },
                    colors: ['#ffd166', '#ff477e', '#ff7597', '#ffffff']
                });
            }

            // Transition to timeline after opening animations
            setTimeout(() => {
                transitionTo("timeline");
            }, 1800);
        });
    }

    // Screen 2: To Game
    document.getElementById("to-game-btn").addEventListener("click", () => {
        transitionTo("game");
    });

    // Screen 3: To Confession (Triggered after matching cards)
    document.getElementById("to-confession-btn").addEventListener("click", () => {
        transitionTo("confession");
    });

    // ================= PARTICLE CANVAS SYSTEM =================
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse position tracking for canvas interaction
    let mouse = { x: null, y: null, radius: 120 };
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(type) {
            this.type = type || (Math.random() > 0.4 ? "sakura" : "heart");
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            
            if (this.type === "sakura") {
                this.y = -20;
                this.size = Math.random() * 8 + 6;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1 + 0.8;
                this.opacity = Math.random() * 0.5 + 0.4;
                this.angle = Math.random() * 360;
                this.spinSpeed = Math.random() * 1 - 0.5;
            } else { // Heart floats up
                this.y = canvas.height + 20;
                this.size = Math.random() * 10 + 6;
                this.speedX = Math.random() * 0.8 - 0.4;
                this.speedY = -(Math.random() * 1.2 + 0.6);
                this.opacity = Math.random() * 0.4 + 0.4;
                this.angle = 0;
                this.oscillationSpeed = Math.random() * 0.02 + 0.01;
                this.oscillationWidth = Math.random() * 20 + 10;
                this.oscillationStart = Math.random() * 100;
            }
        }

        update() {
            // Mouse interaction: particles get pushed away slightly from cursor
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius; // 0 to 1
                    let angle = Math.atan2(dy, dx);
                    // Push particles away
                    this.x += Math.cos(angle) * force * 4;
                    this.y += Math.sin(angle) * force * 4;
                }
            }

            if (this.type === "sakura") {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y / 30) * 0.5;
                this.angle += this.spinSpeed;
                
                // Out of screen bounds check
                if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                    this.reset();
                }
            } else { // Heart
                this.y += this.speedY;
                this.x += this.speedX + Math.sin((this.y + this.oscillationStart) * this.oscillationSpeed) * 0.15;
                
                if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
                    this.reset();
                }
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            
            if (this.type === "sakura") {
                ctx.translate(this.x, this.y);
                ctx.rotate((this.angle * Math.PI) / 180);
                
                // Draw a sakura petal shape
                ctx.fillStyle = "rgba(255, 183, 197, 0.9)";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size);
                ctx.quadraticCurveTo(0, -this.size * 1.2, this.size / 2, -this.size);
                ctx.quadraticCurveTo(this.size, -this.size / 2, 0, 0);
                ctx.fill();
            } else {
                // Draw a heart shape
                ctx.translate(this.x, this.y);
                ctx.fillStyle = "rgba(255, 117, 151, 0.8)";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                // Top left curve
                ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, 0, 0, this.size);
                // Top right curve
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Initialize Particles
    for (let i = 0; i < 75; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ================= TIMELINE SCROLL REVEAL =================
    function initScrollReveal() {
        const revealItems = document.querySelectorAll(".scroll-reveal");
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

        // Trigger immediate check for already-visible elements
        setTimeout(() => {
            revealItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    item.classList.add("revealed");
                }
            });
        }, 300);
    }

    // ================= MINI-GAME: LOVE MEMORY MATCH =================
    const GAME_ICONS = [
        "fa-heart", "fa-key", "fa-gift", "fa-envelope", "fa-star", "fa-mug-hot"
    ];
    let cards = [];
    let flippedCards = [];
    let isLockBoard = false;
    let flipCount = 0;
    let matchCount = 0;

    function initMemoryGame() {
        const grid = document.getElementById("memory-grid");
        grid.innerHTML = "";
        
        cards = [];
        flippedCards = [];
        isLockBoard = false;
        flipCount = 0;
        matchCount = 0;
        
        document.getElementById("flip-count").textContent = "0";
        document.getElementById("match-count").textContent = "0/6";
        document.getElementById("game-congratulations").classList.add("hidden");

        // Double the icons array to create pairs (total 12 cards)
        const doubleIcons = [...GAME_ICONS, ...GAME_ICONS];
        
        // Shuffle doubleIcons array
        doubleIcons.sort(() => Math.random() - 0.5);

        // Render card structure in DOM
        doubleIcons.forEach((icon, index) => {
            const card = document.createElement("div");
            card.classList.add("memory-card");
            card.dataset.icon = icon;
            card.dataset.index = index;

            card.innerHTML = `
                <div class="card-back"><i class="fas fa-heart"></i></div>
                <div class="card-front"><i class="fas ${icon}"></i></div>
            `;

            card.addEventListener("click", flipCard);
            grid.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (isLockBoard) return;
        if (this === flippedCards[0]) return; // Clicked same card twice

        playClick();
        this.classList.add("flipped");

        if (flippedCards.length === 0) {
            flippedCards.push(this);
            return;
        }

        flippedCards.push(this);
        flipCount++;
        document.getElementById("flip-count").textContent = flipCount;
        
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = flippedCards[0].dataset.icon === flippedCards[1].dataset.icon;
        
        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        flippedCards[0].classList.add("matched");
        flippedCards[1].classList.add("matched");
        
        flippedCards[0].removeEventListener("click", flipCard);
        flippedCards[1].removeEventListener("click", flipCard);
        
        matchCount++;
        document.getElementById("match-count").textContent = `${matchCount}/6`;
        
        resetBoard();

        if (matchCount === GAME_ICONS.length) {
            setTimeout(() => {
                successSound.currentTime = 0;
                successSound.play().catch(() => {});
                document.getElementById("game-congratulations").classList.remove("hidden");
                // Celebrate with simple confetti
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.8 }
                });
            }, 600);
        }
    }

    function unflipCards() {
        isLockBoard = true;
        
        setTimeout(() => {
            flippedCards[0].classList.remove("flipped");
            flippedCards[1].classList.remove("flipped");
            resetBoard();
        }, 900);
    }

    function resetBoard() {
        flippedCards = [];
        isLockBoard = false;
    }

    // Create single bubble element for dialogue
    const bubble = document.createElement("div");
    bubble.className = "no-btn-bubble";
    document.body.appendChild(bubble);

    const noBtn = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");

    const runawayQuotes = [
        "Hụt rồi nhé! 😜",
        "Còn lâu nha! 💖",
        "Hông chịu đâu! 💕",
        "Không nhấn được đâu! 😉",
        "Cậu mơ đi! 🌸",
        "Hihi hụt rồi! 🎉",
        "Trượt rồi nè! 🏃‍♂️",
        "Đố bắt được đấy! 🤪"
    ];

    function runaway() {
        // Calculate random position inside window boundaries
        const padding = 20;
        
        // Convert button style to absolute/fixed to move it
        noBtn.style.position = "fixed";
        noBtn.style.zIndex = "999";

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const limitX = window.innerWidth - btnWidth - padding;
        const limitY = window.innerHeight - btnHeight - padding;

        let newX = Math.random() * limitX;
        let newY = Math.random() * limitY;

        // Ensure new position is not overlapping the hover zone or original coordinates
        const yesRect = yesBtn.getBoundingClientRect();
        const overlapX = newX + btnWidth > yesRect.left - 50 && newX < yesRect.right + 50;
        const overlapY = newY + btnHeight > yesRect.top - 50 && newY < yesRect.bottom + 50;

        if (overlapX && overlapY) {
            newX = (newX + 200) % limitX;
            newY = (newY + 200) % limitY;
        }

        // Apply coordinates
        noBtn.style.left = `${Math.max(padding, newX)}px`;
        noBtn.style.top = `${Math.max(padding, newY)}px`;

        // Update and show dialog speech bubble above the button
        const randomQuote = runawayQuotes[Math.floor(Math.random() * runawayQuotes.length)];
        bubble.textContent = randomQuote;
        
        // Let it render first to get dimensions, then show
        setTimeout(() => {
            const noRect = noBtn.getBoundingClientRect();
            bubble.style.left = `${noRect.left + noRect.width / 2}px`;
            bubble.style.top = `${noRect.top}px`;
            bubble.classList.add("show");
        }, 50);

        // Hide bubble after 1.2s
        clearTimeout(noBtn.bubbleTimeout);
        noBtn.bubbleTimeout = setTimeout(() => {
            bubble.classList.remove("show");
        }, 1200);
    }

    // Mouse evasion (Desktop)
    noBtn.addEventListener("mouseenter", runaway);
    noBtn.addEventListener("mousemove", runaway);

    // Touch evasion (Mobile)
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent standard click trigger
        runaway();
        // Toast message showing humor
        const toast = document.createElement("div");
        toast.className = "glass-card toast-message";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.zIndex = "1000";
        toast.style.padding = "10px 20px";
        toast.style.background = "rgba(255, 71, 126, 0.9)";
        toast.innerHTML = `<span style="font-weight:600; color:white;">Hông cho chọn nút này đâu nha! 😜</span>`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.5s";
            setTimeout(() => toast.remove(), 500);
        }, 1500);
    });

    // Yes button action: Proceed to Success screen
    yesBtn.addEventListener("click", () => {
        // Change audio track to romantic victory track if desired
        successSound.currentTime = 0;
        successSound.play().catch(() => {});
        transitionTo("success");
    });

    // ================= ENVELOPE INTERACTION (SUCCESS SCREEN) =================
    const envelope = document.getElementById("envelope");
    envelope.addEventListener("click", function() {
        playClick();
        this.classList.toggle("open");
        
        // If opened, trigger confetti burst
        if (this.classList.contains("open")) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.65 }
                });
            }, 300);
        }
    });

    function triggerSuccessCelebration() {
        // Burst of hearts in Canvas particles
        particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle(Math.random() > 0.15 ? "heart" : "sakura"));
        }

        // Periodic confetti bursts
        const duration = 6 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          // since particles fall down, animate a bit higher than they would
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // ================= CAPTURE MEMORY SCREENSHOT =================
    const screenshotBtn = document.getElementById("screenshot-btn");
    screenshotBtn.addEventListener("click", () => {
        playClick();
        screenshotBtn.disabled = true;
        screenshotBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang chụp...';

        const element = document.getElementById("screen-success");
        // Hide screenshot button and envelope hints during snapshot
        const shareBox = document.querySelector(".social-share");
        const hintText = document.querySelector(".envelope-hint");
        shareBox.style.display = "none";
        hintText.style.display = "none";

        // Generate screenshot canvas
        html2canvas(element, {
            backgroundColor: "#0d0419",
            scale: 2, // higher resolution
            useCORS: true
        }).then(canvas => {
            // Restore hidden items
            shareBox.style.display = "block";
            hintText.style.display = "block";
            
            // Create download anchor
            const link = document.createElement("a");
            link.download = `DongY_LamNguoiYeu_${config.recipient}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();

            screenshotBtn.disabled = false;
            screenshotBtn.innerHTML = '<i class="fas fa-camera"></i> Chụp ảnh màn hình kỷ niệm';
        }).catch(err => {
            console.error("Screenshot error", err);
            shareBox.style.display = "block";
            hintText.style.display = "block";
            screenshotBtn.disabled = false;
            screenshotBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Thử lại';
        });
    });

    // ================= CUSTOMIZER / SETTINGS LOGIC =================
    const settingsToggle = document.getElementById("settings-toggle");
    const settingsClose = document.getElementById("settings-close");
    const settingsModal = document.getElementById("settings-modal");
    const settingsForm = document.getElementById("settings-form");
    const settingsReset = document.getElementById("settings-reset");

    // Open Modal
    settingsToggle.addEventListener("click", () => {
        playClick();
        settingsModal.style.display = "flex";
        setTimeout(() => {
            settingsModal.classList.add("active");
        }, 50);
    });

    // Close Modal
    function closeModal() {
        playClick();
        settingsModal.classList.remove("active");
        setTimeout(() => {
            settingsModal.style.display = "none";
        }, 300);
    }
    
    settingsClose.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === settingsModal) closeModal();
    });

    // Reset settings
    settingsReset.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn khôi phục lại cấu hình mặc định ban đầu không?")) {
            playClick();
            localStorage.removeItem("love_confession_config");
            config = DEFAULTS;
            applyConfig();
            closeModal();
        }
    });

    // Save configurations on Submit
    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        playClick();

        const updatedConfig = {
            recipient: document.getElementById("input-recipient").value || DEFAULTS.recipient,
            sender: document.getElementById("input-sender").value || DEFAULTS.sender,
            musicUrl: document.getElementById("input-music").value || DEFAULTS.musicUrl,
            confessionText: document.getElementById("input-confession").value || DEFAULTS.confessionText,
            successLetterText: document.getElementById("input-success-letter").value || DEFAULTS.successLetterText,
            milestones: [
                {
                    date: document.getElementById("input-date-1").value || DEFAULTS.milestones[0].date,
                    title: document.getElementById("input-title-1").value || DEFAULTS.milestones[0].title,
                    desc: document.getElementById("input-desc-1").value || DEFAULTS.milestones[0].desc
                },
                {
                    date: document.getElementById("input-date-2").value || DEFAULTS.milestones[1].date,
                    title: document.getElementById("input-title-2").value || DEFAULTS.milestones[1].title,
                    desc: document.getElementById("input-desc-2").value || DEFAULTS.milestones[1].desc
                },
                {
                    date: document.getElementById("input-date-3").value || DEFAULTS.milestones[2].date,
                    title: document.getElementById("input-title-3").value || DEFAULTS.milestones[2].title,
                    desc: document.getElementById("input-desc-3").value || DEFAULTS.milestones[2].desc
                }
            ]
        };

        saveConfig(updatedConfig);
        closeModal();
    });

    // ================= INITIAL RUN =================
    applyConfig();
});
