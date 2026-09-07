document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. CONFIGURATION & LOCAL STORAGE MANAGER (ANNIVERSARY THEME)
    // ==========================================================================
    const DEFAULTS = {
        recipient: "Bảo Thương",
        sender: "Hoàng Việt",
        musicUrl: "https://www.youtube.com/watch?v=-3wx4t4liIo",
        confessionText: "Chúng mình đã cùng nhau đi qua biết bao ngày mưa ngày nắng. Được yêu và được em yêu là điều may mắn nhất trong cuộc đời anh. Cảm ơn em đã luôn ở đây, làm bến đỗ bình yên cho anh sau mỗi ngày mệt mỏi. Chặng đường phía trước, hãy tiếp tục cùng anh viết tiếp những trang truyện đẹp nhất nhé!",
        milestones: [
            {
                date: "25/05/2024",
                title: "Ngày định mệnh gặp gỡ",
                desc: "Giữa biển người bao la, giây phút chạm ánh mắt em là khoảnh khắc kỳ diệu nhất thay đổi toàn bộ thế giới của anh."
            },
            {
                date: "11/06/2024",
                title: "Ngày hai ta chung một nhịp",
                desc: "Cái gật đầu của em ngày hôm ấy là điều tuyệt vời nhất. Từ đó, hai mảnh ghép cô đơn đã chính thức thuộc về nhau."
            },
            {
                date: "Hiện tại & Mai sau",
                title: "Cùng nhau vượt qua sóng gió",
                desc: "Đã có những lúc giận hờn, hiểu lầm, nhưng sau tất cả chúng mình vẫn chọn bao dung và nắm chặt tay nhau hơn."
            }
        ]
    };

    let config = JSON.parse(localStorage.getItem("love_anniversary_config_v7")) || DEFAULTS;

    function saveConfig(newConfig) {
        config = newConfig;
        localStorage.setItem("love_anniversary_config_v7", JSON.stringify(config));
        applyConfig();
    }

    function applyConfig() {
        document.getElementById("welcome-recipient").textContent = config.recipient;
        document.getElementById("recipient-name-display").textContent = config.recipient;
        document.getElementById("success-crush-name").textContent = config.recipient;
        document.getElementById("success-my-name").textContent = config.sender;

        document.getElementById("cert-sender-name").textContent = config.sender;
        document.getElementById("cert-recipient-name").textContent = config.recipient;
        document.getElementById("cert-sign-hand").textContent = `Yêu ${config.recipient} trọn đời, từ ${config.sender}!`;

        document.getElementById("confession-letter-text").textContent = config.confessionText;
        loadBackgroundMusic(config.musicUrl);

        config.milestones.forEach((m, idx) => {
            const num = idx + 1;
            const dateEl = document.getElementById(`date-${num}`);
            const titleEl = document.getElementById(`title-${num}`);
            const descEl = document.getElementById(`desc-${num}`);
            if (dateEl) dateEl.textContent = m.date;
            if (titleEl) titleEl.textContent = m.title;
            if (descEl) descEl.textContent = m.desc;
        });

        document.getElementById("input-recipient").value = config.recipient;
        document.getElementById("input-sender").value = config.sender;
        document.getElementById("input-music").value = config.musicUrl;
        document.getElementById("input-confession").value = config.confessionText;

        config.milestones.forEach((m, idx) => {
            const num = idx + 1;
            const dateIn = document.getElementById(`input-date-${num}`);
            const titleIn = document.getElementById(`input-title-${num}`);
            const descIn = document.getElementById(`input-desc-${num}`);
            if (dateIn) dateIn.value = m.date;
            if (titleIn) titleIn.value = m.title;
            if (descIn) descIn.value = m.desc;
        });

        const today = new Date();
        const dateStr = `Ngày ${today.getDate().toString().padStart(2, '0')} tháng ${(today.getMonth() + 1).toString().padStart(2, '0')} năm ${today.getFullYear()}`;
        const certDateEl = document.getElementById("cert-date-val");
        if (certDateEl) certDateEl.textContent = dateStr;

        const codeVal = `FOREVER-LOVE-${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2,'0')}${today.getDate().toString().padStart(2,'0')}-UNLIMITED`;
        const certCodeEl = document.getElementById("cert-code-val");
        if (certCodeEl) certCodeEl.textContent = codeVal;
    }

    // ==========================================================================
    // 2. AUDIO MANAGEMENT (DUAL ENGINE: HTML5 MP3 + YOUTUBE BACKGROUND AUDIO)
    // ==========================================================================
    const bgMusic = document.getElementById("bg-music");
    const magicSound = document.getElementById("magic-sound");
    const sparkleSound = document.getElementById("sparkle-sound");
    const clickSound = document.getElementById("click-sound");
    const musicToggle = document.getElementById("music-toggle");

    let isMusicPlaying = false;
    let currentMusicType = "html5"; // "html5" | "youtube"
    let currentYoutubeId = "";
    let ytPlayer = null;
    let ytPlayerReady = false;

    // Helper: Extract YouTube video ID from various URL formats
    function extractYoutubeId(url) {
        if (!url || typeof url !== "string") return null;
        const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    // Initialize or reconfigure YouTube Player
    function initOrUpdateYoutubePlayer(videoId) {
        if (!videoId) return;
        currentYoutubeId = videoId;

        if (ytPlayer && ytPlayerReady) {
            try {
                ytPlayer.loadVideoById({ videoId: videoId });
                if (isMusicPlaying) ytPlayer.playVideo();
                else ytPlayer.pauseVideo();
            } catch (e) {
                console.log("YT loadVideoById error", e);
            }
            return;
        }

        const onReady = () => {
            ytPlayer = new YT.Player("youtube-player", {
                height: "200",
                width: "200",
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    loop: 1,
                    playlist: videoId,
                    playsinline: 1,
                    rel: 0,
                    origin: window.location.origin
                },
                events: {
                    onReady: (event) => {
                        ytPlayerReady = true;
                        try {
                            ytPlayer.setVolume(100);
                            ytPlayer.unMute();
                        } catch (e) {}
                        if (isMusicPlaying) {
                            try { event.target.playVideo(); } catch (e) {}
                        }
                    },
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.PLAYING) {
                            isMusicPlaying = true;
                            musicToggle.classList.remove("muted");
                        } else if (event.data === YT.PlayerState.PAUSED) {
                            if (!isMusicPlaying) {
                                musicToggle.classList.add("muted");
                            }
                        } else if (event.data === YT.PlayerState.ENDED) {
                            event.target.playVideo();
                        }
                    }
                }
            });
        };

        if (window.YT && window.YT.Player) {
            onReady();
        } else {
            const oldApiReady = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (typeof oldApiReady === "function") oldApiReady();
                onReady();
            };
        }
    }

    function loadBackgroundMusic(url) {
        const ytId = extractYoutubeId(url);
        if (ytId) {
            currentMusicType = "youtube";
            // Stop HTML5 audio if playing
            if (bgMusic) bgMusic.pause();
            initOrUpdateYoutubePlayer(ytId);
        } else {
            currentMusicType = "html5";
            // Stop YouTube player if playing
            if (ytPlayer && ytPlayerReady) {
                try { ytPlayer.pauseVideo(); } catch (e) {}
            }
            if (bgMusic) {
                const musicSource = bgMusic.querySelector("source");
                if (musicSource && musicSource.src !== url) {
                    musicSource.src = url || DEFAULTS.musicUrl;
                    bgMusic.load();
                }
            }
        }
    }

    function playBackgroundMusic() {
        isMusicPlaying = true;
        musicToggle.classList.remove("muted");

        if (currentMusicType === "youtube") {
            if (ytPlayer && ytPlayerReady) {
                try { ytPlayer.playVideo(); } catch (e) { console.log("YT play error", e); }
            }
        } else {
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("HTML5 audio play blocked", e));
            }
        }
    }

    function pauseBackgroundMusic() {
        isMusicPlaying = false;
        musicToggle.classList.add("muted");

        if (currentMusicType === "youtube") {
            if (ytPlayer && ytPlayerReady) {
                try { ytPlayer.pauseVideo(); } catch (e) {}
            }
        } else {
            if (bgMusic) {
                bgMusic.pause();
            }
        }
    }

    function toggleBackgroundMusic() {
        playSound(clickSound);
        if (isMusicPlaying) {
            pauseBackgroundMusic();
        } else {
            playBackgroundMusic();
        }
    }

    function playSound(audioEl) {
        if (!audioEl) return;
        audioEl.currentTime = 0;
        audioEl.play().catch(() => {});
    }

    musicToggle.addEventListener("click", toggleBackgroundMusic);

    // Auto-start music on very first user interaction (bypasses browser autoplay policy)
    function onFirstUserInteraction() {
        if (!isMusicPlaying) {
            playBackgroundMusic();
        }
        window.removeEventListener("click", onFirstUserInteraction);
        window.removeEventListener("touchstart", onFirstUserInteraction);
    }
    window.addEventListener("click", onFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", onFirstUserInteraction, { once: true });

    // ==========================================================================
    // 3. THREE.JS 3D SCENE: LATHE LANTERNS & 3D INTERACTIVE ENVELOPE MESH
    // ==========================================================================
    let scene, camera, renderer;
    let starMesh, lanterns = [];
    let heartParticles;

    let mouseX = 0, mouseY = 0;
    let targetCameraX = 0, targetCameraY = 0;
    const webglContainer = document.getElementById("webgl-container");

    function initThreeScene() {
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x070c18, 0.0016);

        camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 0, 85);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 600 ? 1.5 : 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.28;
        webglContainer.appendChild(renderer.domElement);

        // Soft ambient twilight lighting
        const ambientLight = new THREE.AmbientLight(0xffeedd, 0.75);
        scene.add(ambientLight);

        const warmLight = new THREE.DirectionalLight(0xffa834, 1.4);
        warmLight.position.set(25, 65, 45);
        scene.add(warmLight);

        // 1. Starfield
        createStarfield();

        // 2. Realistic 3D Sky Lanterns (Adaptive count for mobile smoothness)
        const lanternCount = window.innerWidth < 768 ? 22 : 36;
        createSkyLanterns(lanternCount);

        // 3. 3D Heart particle swarm
        create3DHeartSwarm();

        // Event listeners
        window.addEventListener("resize", onWindowResize);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("click", onRaycastClick);

        animateThree();
    }

    // Starfield Generator
    function createStarfield() {
        const starCount = 1800;
        const starGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        const colorPalette = [
            new THREE.Color(0xffffff),
            new THREE.Color(0xfde68a),
            new THREE.Color(0xfbcfe8),
            new THREE.Color(0x93c5fd)
        ];

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const radius = 350 + Math.random() * 550;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 2.2 + 0.8;
        }

        starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.35, "rgba(253, 230, 138, 0.8)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        const starTexture = new THREE.CanvasTexture(canvas);

        const starMaterial = new THREE.PointsMaterial({
            size: 2.2,
            vertexColors: true,
            map: starTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        starMesh = new THREE.Points(starGeometry, starMaterial);
        scene.add(starMesh);
    }

    // Sky Lantern Glowing Texture
    let lanternTextureCache = null;
    function getLanternTexture() {
        if (lanternTextureCache) return lanternTextureCache;
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");

        const grad = ctx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, "#ff7733");
        grad.addColorStop(0.3, "#ffaa33");
        grad.addColorStop(0.6, "#ffea77");
        grad.addColorStop(0.9, "#ff9922");
        grad.addColorStop(1.0, "#d95511");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 256);

        // Bamboo vertical ribs
        ctx.strokeStyle = "rgba(180, 70, 10, 0.25)";
        ctx.lineWidth = 1.5;
        for (let x = 16; x < 128; x += 21) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 256);
            ctx.stroke();
        }

        // Horizontal fold lines
        ctx.strokeStyle = "rgba(255, 255, 200, 0.18)";
        ctx.lineWidth = 1;
        for (let y = 30; y < 256; y += 45) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(128, y);
            ctx.stroke();
        }

        lanternTextureCache = new THREE.CanvasTexture(canvas);
        return lanternTextureCache;
    }

    // Sky Lantern Generator (Using Three.js LatheGeometry for authentic aerodynamic curves)
    function createLanternMesh(x, y, z, scale = 1, customColor = null) {
        const lanternGroup = new THREE.Group();
        const lTexture = getLanternTexture();

        // Authentic aerodynamic traditional balloon profile points
        const points = [];
        points.push(new THREE.Vector2(1.15 * scale, -1.8 * scale));
        points.push(new THREE.Vector2(1.22 * scale, -1.4 * scale));
        points.push(new THREE.Vector2(1.48 * scale, -0.6 * scale));
        points.push(new THREE.Vector2(1.72 * scale, 0.4 * scale));
        points.push(new THREE.Vector2(1.68 * scale, 1.1 * scale));
        points.push(new THREE.Vector2(1.42 * scale, 1.65 * scale));
        points.push(new THREE.Vector2(0.95 * scale, 1.9 * scale));
        points.push(new THREE.Vector2(0.01 * scale, 1.96 * scale));

        const latheGeo = new THREE.LatheGeometry(points, 24);
        const meshColor = customColor ? new THREE.Color(customColor) : new THREE.Color(0xffd27d);
        const emissiveColor = customColor ? new THREE.Color(customColor).multiplyScalar(0.7) : new THREE.Color(0xff8811);

        const bodyMat = new THREE.MeshStandardMaterial({
            map: lTexture,
            color: meshColor,
            emissive: emissiveColor,
            emissiveIntensity: 0.95,
            roughness: 0.35,
            metalness: 0.05,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.94
        });
        const bodyMesh = new THREE.Mesh(latheGeo, bodyMat);
        lanternGroup.add(bodyMesh);

        // Bamboo base collar rim
        const rimGeo = new THREE.TorusGeometry(1.16 * scale, 0.06 * scale, 8, 24);
        const rimMat = new THREE.MeshStandardMaterial({ color: 0x8c4210, roughness: 0.8 });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.rotation.x = Math.PI / 2;
        rimMesh.position.y = -1.8 * scale;
        lanternGroup.add(rimMesh);

        // Inner glowing flame
        const coreGeo = new THREE.SphereGeometry(0.55 * scale, 12, 12);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreMesh.position.y = -0.7 * scale;
        lanternGroup.add(coreMesh);

        // Warm flickering point light
        const baseIntensity = 1.35 * scale;
        const lanternLight = new THREE.PointLight(0xffb732, baseIntensity, 32 * scale);
        lanternLight.position.set(0, -0.5 * scale, 0);
        lanternGroup.add(lanternLight);

        lanternGroup.position.set(x, y, z);
        lanternGroup.userData = {
            speedY: 0.035 + Math.random() * 0.045,
            swaySpeed: 0.007 + Math.random() * 0.01,
            swayWidth: 0.35 + Math.random() * 0.45,
            rotationSpeed: (Math.random() - 0.5) * 0.006,
            initialX: x,
            phase: Math.random() * Math.PI * 2,
            flickerPhase: Math.random() * 100,
            baseIntensity: baseIntensity,
            bodyMat: bodyMat,
            light: lanternLight,
            isWishLantern: false
        };

        return lanternGroup;
    }

    function createSkyLanterns(count) {
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 180;
            const y = -70 + Math.random() * 150;
            const z = -40 + Math.random() * 95;
            const scale = 0.6 + Math.random() * 0.75;

            const lantern = createLanternMesh(x, y, z, scale);
            scene.add(lantern);
            lanterns.push(lantern);
        }
    }

    // 3D Heart Particle Swarm
    function create3DHeartSwarm() {
        const heartCount = 350;
        const heartGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(heartCount * 3);
        const colors = new Float32Array(heartCount * 3);

        for (let i = 0; i < heartCount; i++) {
            const t = Math.random() * Math.PI * 2;
            const scale = 1.3 + Math.random() * 0.4;
            const jitterZ = (Math.random() - 0.5) * 12;

            const hx = 16 * Math.pow(Math.sin(t), 3) * scale;
            const hy = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;

            positions[i * 3] = hx;
            positions[i * 3 + 1] = hy + 8;
            positions[i * 3 + 2] = -45 + jitterZ;

            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 0.55 + Math.random() * 0.3;
            colors[i * 3 + 2] = 0.4 + Math.random() * 0.3;
        }

        heartGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        heartGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const heartMat = new THREE.PointsMaterial({
            size: 2.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        heartParticles = new THREE.Points(heartGeo, heartMat);
        scene.add(heartParticles);
    }

    // ==========================================================================
    // HERO COUPLE PORTRAIT 3D PARALLAX & START JOURNEY ACTION
    // ==========================================================================
    const heroCoupleFrame = document.getElementById("hero-couple-frame");
    if (heroCoupleFrame) {
        const borderEl = heroCoupleFrame.querySelector(".hero-couple-border");
        const glareEl = heroCoupleFrame.querySelector(".hero-glare-effect");

        function handlePointerMove(clientX, clientY) {
            const rect = heroCoupleFrame.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) return;
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = -Math.max(-18, Math.min(18, (clientY - centerY) * 0.08));
            const rotateY = Math.max(-18, Math.min(18, (clientX - centerX) * 0.08));

            if (borderEl) {
                gsap.to(borderEl, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.45,
                    ease: "power2.out",
                    transformPerspective: 1000
                });
            }

            if (glareEl) {
                const glareX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                const glareY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
                glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 70%)`;
            }
        }

        window.addEventListener("mousemove", (e) => {
            handlePointerMove(e.clientX, e.clientY);
        });

        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        heroCoupleFrame.addEventListener("mouseleave", () => {
            if (borderEl) {
                gsap.to(borderEl, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.85,
                    ease: "elastic.out(1, 0.55)"
                });
            }
            if (glareEl) {
                glareEl.style.background = "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)";
            }
        });
    }

    const startJourneyBtn = document.getElementById("start-journey-btn");
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener("click", () => {
            playBackgroundMusic();
            playSound(magicSound);

            confetti({
                particleCount: 130,
                spread: 85,
                origin: { x: 0.5, y: 0.72 },
                colors: ['#ffd700', '#fbbf24', '#f43f5e', '#ffffff']
            });

            gsap.to(startJourneyBtn, {
                scale: 0.95,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    transitionTo("timeline");
                }
            });
        });
    }

    // Launch Custom Wish Lantern (Supports custom color and wish)
    function launchCustomWishLantern(wishText, playEffects = true, customColor = null) {
        const spawnX = (Math.random() - 0.5) * 16;
        const spawnY = -40;
        const spawnZ = 28 + Math.random() * 15;
        const wishLantern = createLanternMesh(spawnX, spawnY, spawnZ, 1.5, customColor);
        
        wishLantern.userData.isWishLantern = true;
        wishLantern.userData.speedY = 0.12;
        wishLantern.userData.swayWidth = 0.6;
        wishLantern.userData.wishText = wishText;
        scene.add(wishLantern);
        lanterns.push(wishLantern);

        if (playEffects) {
            playSound(sparkleSound);
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.8 },
                colors: customColor ? [customColor, '#fbbf24', '#ffffff'] : ['#fbbf24', '#f59e0b', '#ffffff']
            });
        }
        return wishLantern;
    }

    // Parallax mouse movements
    function onMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        targetCameraX = mouseX * 12;
        targetCameraY = -mouseY * 8;
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            mouseX = (touch.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (touch.clientY / window.innerHeight - 0.5) * 2;
            targetCameraX = mouseX * 10;
            targetCameraY = -mouseY * 6;
        }
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 600 ? 1.5 : 2));
    }

    // Raycast Click Handler (Handles both 3D Envelope click and 3D Lantern clicks)
    const raycaster = new THREE.Raycaster();
    const clickCoords = new THREE.Vector2();

    function onRaycastClick(e) {
        if (e.target.closest(".btn") || e.target.closest("input") || e.target.closest("textarea") || e.target.closest(".cute-react-btn") || e.target.closest(".modal")) {
            return;
        }

        clickCoords.x = (e.clientX / window.innerWidth) * 2 - 1;
        clickCoords.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(clickCoords, camera);

        
        // Check if clicked 3D sky lanterns
        const meshesToCheck = [];
        lanterns.forEach(l => {
            l.traverse(child => {
                if (child.isMesh) meshesToCheck.push(child);
            });
        });

        const intersects = raycaster.intersectObjects(meshesToCheck);
        if (intersects.length > 0) {
            playSound(sparkleSound);
            const hitLanternGroup = intersects[0].object.parent;
            if (hitLanternGroup) {
                hitLanternGroup.userData.speedY += 0.08;
                confetti({
                    particleCount: 25,
                    spread: 45,
                    origin: {
                        x: e.clientX / window.innerWidth,
                        y: e.clientY / window.innerHeight
                    },
                    colors: ['#fbbf24', '#f472b6', '#ffffff']
                });
            }
        }
    }

    let clock = new THREE.Clock();

    function animateThree() {
        requestAnimationFrame(animateThree);
        const elapsedTime = clock.getElapsedTime();

        // Smooth camera parallax
        camera.position.x += (targetCameraX - camera.position.x) * 0.04;
        camera.position.y += (targetCameraY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        // Ambient cosmic stars rotation
        if (starMesh) {
            starMesh.rotation.y = elapsedTime * 0.012;
            starMesh.rotation.x = elapsedTime * 0.006;
        }

        // 3D Heart particle pulse
        if (heartParticles) {
            const beatScale = 1 + Math.sin(elapsedTime * 3) * 0.04 + Math.sin(elapsedTime * 6) * 0.02;
            heartParticles.scale.set(beatScale, beatScale, beatScale);
            heartParticles.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;
        }


        // Enhanced Lathe Lanterns Animation (Multi-axis sway, wind drift & candle flicker)
        lanterns.forEach(lantern => {
            const data = lantern.userData;

            lantern.position.y += data.speedY;
            lantern.position.x = data.initialX + Math.sin(elapsedTime * 0.8 + data.phase) * data.swayWidth + Math.sin(elapsedTime * 0.3) * 1.5;

            lantern.rotation.z = Math.sin(elapsedTime * 1.2 + data.phase) * 0.07 + Math.sin(elapsedTime * 2.3 + data.phase) * 0.025;
            lantern.rotation.x = Math.cos(elapsedTime * 0.85 + data.phase) * 0.055;
            lantern.rotation.y += data.rotationSpeed;

            if (data.light && data.bodyMat) {
                const flicker = Math.sin(elapsedTime * 11 + data.flickerPhase) * 0.12 + Math.cos(elapsedTime * 19 + data.flickerPhase) * 0.06;
                data.light.intensity = data.baseIntensity * (1 + flicker);
                data.bodyMat.emissiveIntensity = 0.95 + flicker * 0.8;
            }

            if (lantern.position.y > 80) {
                lantern.position.y = -70;
                lantern.userData.initialX = (Math.random() - 0.5) * 180;
                lantern.position.x = lantern.userData.initialX;
            }
        });

        renderer.render(scene, camera);
    }

    initThreeScene();

    // ==========================================================================
    // 4. SCREEN TRANSITIONS & STORYLINE MANAGEMENT (POWERED BY GSAP)
    // ==========================================================================
    const screens = {
        welcome: document.getElementById("screen-welcome"),
        timeline: document.getElementById("screen-timeline"),
        game: document.getElementById("screen-game"),
        confession: document.getElementById("screen-confession"),
        success: document.getElementById("screen-success")
    };

    function transitionTo(screenKey) {
        if (typeof stopCelebration === "function") {
            stopCelebration();
        }
        playSound(clickSound);

        const currentActive = document.querySelector(".screen.active");
        if (currentActive) {
            gsap.to(currentActive, {
                opacity: 0,
                y: -20,
                duration: 0.45,
                ease: "power2.in",
                onComplete: () => {
                    currentActive.classList.remove("active");
                    currentActive.style.display = "none";
                    showScreen(screenKey);
                }
            });
        } else {
            showScreen(screenKey);
        }
    }

    function showScreen(screenKey) {
        const target = screens[screenKey];
        if (!target) return;


        target.style.display = "flex";
        target.classList.add("active");

        // GSAP entrance transition
        gsap.fromTo(target, 
            { opacity: 0, y: 30, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
        );

        if (screenKey === "game") {
            initGratitudeGame();
        } else if (screenKey === "confession") {
            initConfessionScreen();
        } else if (screenKey === "success") {
            triggerGrandCelebration();
        }
    }

    // Guide click listener fallback for Welcome screen
    const envelopeGuide = document.getElementById("envelope-guide");
    if (envelopeGuide) {
        envelopeGuide.addEventListener("click", () => {
            open3DEnvelope();
        });
    }

    // ==========================================================================
    // 5. CHƯƠNG 2: TIMELINE & LOVE CONNECTION METER
    // ==========================================================================
    let loveMeterValue = 65;
    const loveMeterValEl = document.getElementById("love-meter-val");
    const loveMeterFillEl = document.getElementById("love-meter-fill");

    function updateLoveMeter(increment) {
        loveMeterValue = Math.min(100, loveMeterValue + increment);
        if (loveMeterValEl) loveMeterValEl.textContent = `${loveMeterValue}%`;
        
        // GSAP animate the fill bar
        gsap.to(loveMeterFillEl, {
            width: `${loveMeterValue}%`,
            duration: 0.6,
            ease: "back.out(1.5)"
        });

        playSound(sparkleSound);
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.4 },
            colors: ['#f43f5e', '#fbbf24']
        });
    }

    const reactButtons = document.querySelectorAll(".cute-react-btn");
    reactButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            if (this.classList.contains("reacted")) return;
            this.classList.add("reacted");
            this.innerHTML = '<i class="fas fa-check-circle"></i> Mãi khắc sâu trong tim ❤️';
            const added = parseInt(this.getAttribute("data-added") || "12", 10);
            updateLoveMeter(added);
            
            gsap.fromTo(this, { scale: 1.15 }, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" });
        });
    });

    document.getElementById("to-game-btn").addEventListener("click", () => {
        transitionTo("game");
    });

    // ==========================================================================
    // 6. CHƯƠNG 3: NHỮNG ĐIỀU ANH BIẾT ƠN & TRÂN QUÝ NHẤT
    // ==========================================================================
    const GRATITUDE_TRIBUTES = [
        {
            title: "Cảm ơn vì luôn kiên nhẫn",
            icon: "fa-heart",
            text: "Cảm ơn em vì đã luôn kiên nhẫn lắng nghe mọi tâm sự, vui buồn và cả những lúc anh khó tính nhất."
        },
        {
            title: "Cảm ơn những cái ôm ấm áp",
            icon: "fa-hands",
            text: "Những cái ôm ấm áp của em luôn là liều thuốc chữa lành kỳ diệu nhất sau một ngày dài mệt mỏi ngoài kia."
        },
        {
            title: "Cảm ơn vì luôn tin tưởng",
            icon: "fa-star",
            text: "Cảm ơn vì em luôn tin tưởng, ủng hộ và tiếp thêm động lực cho anh trong mọi ước mơ và dự định cuộc sống."
        },
        {
            title: "Cảm ơn nụ cười rạng rỡ",
            icon: "fa-sun",
            text: "Nụ cười của em chính là tia nắng rực rỡ nhất sưởi ấm tâm hồn anh, xua tan mọi âu lo trong những ngày mưa gió."
        },
        {
            title: "Cảm ơn vì sự bao dung",
            icon: "fa-shield-heart",
            text: "Cảm ơn em đã luôn bao dung cho những tật xấu của anh, để chúng mình ngày càng thấu hiểu và gắn bó bền chặt."
        },
        {
            title: "Cảm ơn vì đã ở lại bên anh",
            icon: "fa-infinity",
            text: "Và điều quan trọng nhất: Cảm ơn em vì đã luôn chọn ở lại, nắm chặt tay anh đi qua từng ngày cho tới tận hôm nay!"
        }
    ];

    let revealedStarsCount = 0;

    function initGratitudeGame() {
        const grid = document.getElementById("star-grid");
        if (!grid) return;
        grid.innerHTML = "";
        revealedStarsCount = 0;

        GRATITUDE_TRIBUTES.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "star-card";
            card.dataset.index = index;

            card.innerHTML = `
                <div class="star-icon-bubble">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="star-label">Lời Cảm Ơn ${index + 1}</div>
            `;

            card.addEventListener("click", () => {
                if (card.classList.contains("revealed")) return;
                card.classList.add("revealed");
                playSound(sparkleSound);

                gsap.fromTo(card, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });

                document.getElementById("praise-title").textContent = item.title;
                document.getElementById("praise-text").textContent = item.text;

                const praiseBox = document.getElementById("praise-card");
                gsap.fromTo(praiseBox, { scale: 1.05 }, { scale: 1, duration: 0.35, ease: "power2.out" });

                revealedStarsCount++;
                updateLoveMeter(10);

                if (revealedStarsCount >= 4) {
                    setTimeout(() => {
                        const panel = document.getElementById("game-success-panel");
                        if (panel) {
                            panel.classList.remove("hidden");
                            gsap.fromTo(panel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
                        }
                        playSound(magicSound);
                        confetti({
                            particleCount: 80,
                            spread: 70,
                            origin: { y: 0.7 }
                        });
                    }, 400);
                }
            });

            grid.appendChild(card);
        });

        // GSAP stagger in cards safely without freezing intermediate opacity
        gsap.fromTo(".star-card",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power2.out",
                clearProps: "opacity,transform"
            }
        );
    }

    document.getElementById("to-confession-btn").addEventListener("click", () => {
        transitionTo("confession");
    });

    // ==========================================================================
    // 7. CHƯƠNG 4: LỜI TÂM SỰ & 8 MÀN TƯƠNG TÁC ĐIỀU KHIỂN BỞI GSAP
    // ==========================================================================
    function initConfessionScreen() {
        const frame = document.getElementById("art-frame");
        if (frame) {
            window.addEventListener("mousemove", (e) => {
                const rect = frame.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const rotateX = (e.clientY - centerY) * 0.05;
                const rotateY = -(e.clientX - centerX) * 0.05;
                frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        }
    }

    const noBtn = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");
    const dramaticSpotlight = document.getElementById("dramatic-spotlight");
    const voucherDropZone = document.getElementById("voucher-drop-zone");
    const funnyAlertModal = document.getElementById("funny-alert-modal");
    const alertConfirmBtn = document.getElementById("alert-confirm-btn");

    const runawayBubble = document.createElement("div");
    runawayBubble.className = "runaway-dialog-bubble";
    document.body.appendChild(runawayBubble);

    let noClickCount = 0;

    function showBubbleAboveButton(btnElement, text, duration = 1800) {
        runawayBubble.textContent = text;
        const rect = btnElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const clampedX = Math.max(30, Math.min(window.innerWidth - 30, centerX));
        runawayBubble.style.left = `${clampedX}px`;
        runawayBubble.style.top = `${Math.max(65, rect.top)}px`;
        runawayBubble.classList.add("show");

        clearTimeout(btnElement.bubbleTimer);
        btnElement.bubbleTimer = setTimeout(() => {
            runawayBubble.classList.remove("show");
        }, duration);
    }

    // 8-STAGE INTERACTIVE MASTERPIECE FOR "HÔNG THÈM NHA" BUTTON (POWERED BY GSAP)
    function handleNoButtonClick() {
        noClickCount++;
        playSound(clickSound);

        switch (noClickCount) {
            // Stage 1: Rung lắc ngạc nhiên
            case 1:
                gsap.to(noBtn, {
                    x: "+=12",
                    yoyo: true,
                    repeat: 5,
                    duration: 0.07,
                    onComplete: () => gsap.set(noBtn, { x: 0 })
                });
                showBubbleAboveButton(noBtn, "Ơ kìa! Đã là người yêu rồi mà còn tính từ chối à? 🥺");
                break;

            // Stage 2: Nhảy lùi đàn hồi & nhắc quyền lợi
            case 2:
                const isMobile = window.innerWidth < 480;
                gsap.to(noBtn, {
                    x: isMobile ? (noClickCount % 2 === 0 ? 25 : -25) : 45,
                    y: isMobile ? 0 : -15,
                    duration: 0.45,
                    ease: "back.out(2)"
                });
                showBubbleAboveButton(noBtn, "Từ chối là mất suất được anh cưng chiều, dắt đi ăn ngon mỗi tuần đấy nhé! 🧋🍰");
                break;

            // Stage 3: Nút Đồng ý phình to đàn hồi bằng GSAP
            case 3:
                const isMobile3 = window.innerWidth < 480;
                gsap.to(yesBtn, {
                    scale: isMobile3 ? 1.15 : 1.38,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.45)"
                });
                yesBtn.classList.add("btn-glow");
                gsap.to(noBtn, {
                    x: isMobile3 ? 0 : -55,
                    y: isMobile3 ? 5 : 15,
                    scale: 0.88,
                    duration: 0.4,
                    ease: "power2.out"
                });
                showBubbleAboveButton(yesBtn, "Nút 'Bên Nhau Trọn Đời' đang mời gọi rực rỡ kìa, bấm nút đó đi mà! ✨");
                break;

            // Stage 4: Modal cảnh báo hài hước
            case 4:
                playSound(magicSound);
                funnyAlertModal.style.display = "flex";
                gsap.fromTo(funnyAlertModal, { opacity: 0 }, { opacity: 1, duration: 0.35 });
                gsap.fromTo(".alert-modal-content", 
                    { scale: 0.8, y: 20 }, 
                    { scale: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }
                );
                break;

            // Stage 5: Rơi mưa Voucher đặc quyền bằng GSAP
            case 5:
                voucherDropZone.classList.remove("hidden");
                voucherDropZone.innerHTML = `
                    <div class="voucher-card"><i class="fas fa-ticket-alt"></i> Voucher: Đấm lưng & massage mỗi tối</div>
                    <div class="voucher-card"><i class="fas fa-ticket-alt"></i> Voucher: Luôn nhận lỗi khi người yêu dỗi</div>
                    <div class="voucher-card"><i class="fas fa-ticket-alt"></i> Voucher: Cưng chiều vô điều kiện trọn đời</div>
                `;
                playSound(sparkleSound);
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#fbbf24', '#f59e0b']
                });
                gsap.from(".voucher-card", {
                    y: -50,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: "bounce.out"
                });
                showBubbleAboveButton(noBtn, "Tung hết bí kíp voucher đặc quyền rồi đó, siêu ưu đãi luôn nha! 🎁");
                break;

            // Stage 6: Spotlight kịch tính
            case 6:
                dramaticSpotlight.classList.add("show");
                document.getElementById("big-question-text").textContent = "Anh thương em nhiều như thế này mà... không chịu cùng anh đi tiếp sao? 🥺";
                showBubbleAboveButton(noBtn, "Cho anh nắm tay em đi tiếp nha... 🥺");
                break;

            // Stage 7: Phân thân trốn tìm + Nút Có bao trọn trung tâm
            case 7:
                dramaticSpotlight.classList.remove("show");
                const isMobile7 = window.innerWidth < 480;
                gsap.to(yesBtn, {
                    scale: isMobile7 ? 1.2 : 1.55,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)"
                });
                yesBtn.innerHTML = '<i class="fas fa-heart"></i> BÊN NHAU TRỌN ĐỜI! 🥰 (NÚT NÀY CHIẾM HẾT MÀN HÌNH RỒI)';
                spawnFakeNoButtons();
                showBubbleAboveButton(yesBtn, "Nút Có to như vậy rồi, hết trốn đi đâu được nữa nha! 😂");
                break;

            // Stage 8: Sáp nhập nút trôi thẳng vào nút Có
            case 8:
            default:
                document.querySelectorAll(".fake-no-btn").forEach(el => el.remove());
                
                // GSAP slide noBtn directly towards yesBtn center
                const noRect = noBtn.getBoundingClientRect();
                const yesRect = yesBtn.getBoundingClientRect();
                const deltaX = yesRect.left + yesRect.width / 2 - (noRect.left + noRect.width / 2);
                const deltaY = yesRect.top + yesRect.height / 2 - (noRect.top + noRect.height / 2);

                gsap.to(noBtn, {
                    x: `+=${deltaX}`,
                    y: `+=${deltaY}`,
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        showBubbleAboveButton(yesBtn, "Đã lên chung một thuyền thì trọn đời không cho xuống đâu nhé! 🥰");
                        setTimeout(() => onYesClicked(), 800);
                    }
                });
                break;
        }
    }

    function spawnFakeNoButtons() {
        document.querySelectorAll(".fake-no-btn").forEach(el => el.remove());
        const quotes = [
            "Bắt nhầm nút rồi! 😜",
            "Nút này cũng yêu anh nè! 💕",
            "Đã bảo bấm nút Có mà! 🥰"
        ];

        const isMobile = window.innerWidth < 480;
        for (let i = 0; i < 3; i++) {
            const fake = document.createElement("button");
            fake.className = "fake-no-btn";
            fake.textContent = `Hông thèm ${i + 1} 😜`;
            if (isMobile) {
                fake.style.left = `${10 + i * 27}%`;
                fake.style.top = `${58 + (i % 2) * 16}%`;
                fake.style.padding = "10px 14px";
                fake.style.fontSize = "0.82rem";
            } else {
                fake.style.left = `${20 + i * 28}%`;
                fake.style.top = `${65 + (i % 2) * 15}%`;
            }

            fake.addEventListener("click", () => {
                playSound(clickSound);
                showBubbleAboveButton(fake, quotes[i]);
            });

            document.body.appendChild(fake);
            gsap.from(fake, { scale: 0, duration: 0.4, ease: "back.out(2)", delay: i * 0.1 });
        }
    }

    noBtn.addEventListener("click", handleNoButtonClick);

    // Funny Alert Modal confirm
    alertConfirmBtn.addEventListener("click", () => {
        playSound(sparkleSound);
        gsap.to(funnyAlertModal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                funnyAlertModal.style.display = "none";
                funnyAlertModal.classList.remove("active");
                showBubbleAboveButton(yesBtn, "Ngoan lắm! Bấm nút Có đi nào! ❤️");
            }
        });
    });

    // Yes Button Click Action
    function onYesClicked() {
        playSound(magicSound);
        runawayBubble.classList.remove("show");
        dramaticSpotlight.classList.remove("show");
        document.querySelectorAll(".fake-no-btn").forEach(el => el.remove());
        transitionTo("success");
    }

    yesBtn.addEventListener("click", onYesClicked);

    // ==========================================================================
    // 8. CHƯƠNG 5: HỢP ĐỒNG GIA HẠN VĨNH CỬU & THẢ ĐÈN TRỜI TƯƠNG LAI
    // ==========================================================================
    let celebrationTimer = null;
    let celebrationLanternTimeouts = [];

    function stopCelebration() {
        if (celebrationTimer) {
            clearInterval(celebrationTimer);
            celebrationTimer = null;
        }
        celebrationLanternTimeouts.forEach(t => clearTimeout(t));
        celebrationLanternTimeouts = [];
    }

    function triggerGrandCelebration() {
        stopCelebration();

        // 1. Certificate Majestic Reveal with GSAP
        const cert = document.getElementById("certificate-node");
        const seal = document.querySelector(".seal-stamp");

        if (cert) {
            gsap.fromTo(cert,
                { opacity: 0, scale: 0.94, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out", clearProps: "transform" }
            );
        }

        if (seal) {
            gsap.fromTo(seal,
                { scale: 2.2, opacity: 0, rotate: -35 },
                { scale: 1, opacity: 1, rotate: -15, duration: 0.65, delay: 0.35, ease: "back.out(2)" }
            );
        }

        // 2. Grand Opening Firework Salvo (Khai màn rực rỡ với âm thanh chúc mừng)
        playSound(magicSound);

        // Flank salvo left
        confetti({
            particleCount: 45,
            angle: 60,
            spread: 60,
            origin: { x: 0.12, y: 0.82 },
            startVelocity: 50,
            colors: ['#fbbf24', '#f59e0b', '#f43f5e', '#ffffff'],
            shapes: ['circle'],
            ticks: 140,
            gravity: 0.8,
            scalar: 1.15
        });

        // Flank salvo right
        confetti({
            particleCount: 45,
            angle: 120,
            spread: 60,
            origin: { x: 0.88, y: 0.82 },
            startVelocity: 50,
            colors: ['#fbbf24', '#f59e0b', '#f43f5e', '#ffffff'],
            shapes: ['circle'],
            ticks: 140,
            gravity: 0.8,
            scalar: 1.15
        });

        // Center high sky burst (Pháo hoa đại hoa nở tròn 360 độ trên đỉnh trời)
        const burstTimeout = setTimeout(() => {
            confetti({
                particleCount: 70,
                spread: 360,
                origin: { x: 0.5, y: 0.26 },
                startVelocity: 42,
                colors: ['#fbbf24', '#ffffff', '#ffd700', '#f43f5e'],
                shapes: ['circle'],
                ticks: 160,
                gravity: 0.72,
                decay: 0.92,
                scalar: 1.25
            });
        }, 180);
        celebrationLanternTimeouts.push(burstTimeout);

        // 3. Sustained, 60fps-smooth Sky Fireworks (Chuỗi pháo hoa bầu trời đêm mượt mà, rực rỡ)
        const palettes = [
            ['#fbbf24', '#f59e0b', '#ffd700', '#ffffff'], // Gold & Amber
            ['#f43f5e', '#fb7185', '#fda4af', '#fff1f2'], // Romantic Ruby & Rose
            ['#c084fc', '#e879f9', '#38bdf8', '#ffffff'], // Cosmic Galaxy
            ['#10b981', '#6ee7b7', '#fbbf24', '#ffffff']  // Emerald & Stardust
        ];

        let fireworkCount = 0;
        const maxBursts = 14; // ~4.5s of rhythmic, smooth bursts

        celebrationTimer = setInterval(() => {
            fireworkCount++;
            if (fireworkCount > maxBursts) {
                stopCelebration();
                return;
            }

            const currentPalette = palettes[fireworkCount % palettes.length];
            const randX = 0.16 + Math.random() * 0.68; // Sky horizontal range (16% - 84%)
            const randY = 0.14 + Math.random() * 0.26; // Sky vertical range (14% - 40%)
            const particleCount = 35 + Math.floor(Math.random() * 15);
            const startVel = 32 + Math.random() * 12;

            confetti({
                particleCount: particleCount,
                spread: 360,
                origin: { x: randX, y: randY },
                startVelocity: startVel,
                colors: currentPalette,
                shapes: ['circle'],
                ticks: 130,
                gravity: 0.75,
                decay: 0.93,
                scalar: 1.15
            });
        }, 320);

        // 4. Floating 3D Wish Lanterns in the background (êm ái, tối ưu 60fps không giật Three.js)
        const wishes = [
            "Bên nhau trọn đời ❤️",
            "Hạnh phúc mãi mãi ✨",
            "Bảo Thương & Anh 💑"
        ];

        wishes.forEach((w, idx) => {
            const t = setTimeout(() => {
                launchCustomWishLantern(w, false); // false = không spam âm thanh/confetti nền
            }, 900 + idx * 1400);
            celebrationLanternTimeouts.push(t);
        });
    }

    // Interactive Wish Launcher
    const wishInput = document.getElementById("wish-input");
    const sendWishBtn = document.getElementById("send-wish-btn");

    // ==========================================================================
    // MINI GAME: THẢ ĐÈN TRỜI TƯƠNG LAI INTERACTIVE WORKSHOP
    // ==========================================================================
    const lanternModal = document.getElementById("lantern-game-modal");
    const lanternModalClose = document.getElementById("lantern-game-close");
    const lightCandleBtn = document.getElementById("light-candle-btn");
    const releaseSkyBtn = document.getElementById("release-sky-btn");
    const lanternDomeColor = document.getElementById("lantern-dome-color");
    const lanternFlameCore = document.getElementById("lantern-flame-core");
    const previewTagText = document.getElementById("preview-tag-text");
    const gameInstruction = document.getElementById("game-stage-instruction");
    const colorDots = document.querySelectorAll(".color-dot");
    const wishChips = document.querySelectorAll(".chip-btn");

    let selectedLanternColor = "#ff7733";
    let isLanternLit = false;

    // Open Mini Game when clicking Thả Đèn Trời button
    sendWishBtn.addEventListener("click", () => {
        const text = wishInput.value.trim();
        if (text) {
            previewTagText.textContent = text;
        } else {
            previewTagText.textContent = "Bên nhau trọn đời ❤️";
        }
        openLanternMiniGame();
    });

    function openLanternMiniGame() {
        playSound(clickSound);
        isLanternLit = false;
        if (lanternDomeColor) lanternDomeColor.classList.remove("lit");
        if (lanternFlameCore) lanternFlameCore.classList.remove("active");
        if (lightCandleBtn) lightCandleBtn.classList.remove("hidden");
        if (releaseSkyBtn) releaseSkyBtn.classList.add("hidden");
        if (gameInstruction) {
            gameInstruction.textContent = "Bước 1: Chọn màu đèn lồng & lời ước, sau đó chạm 'Thắp Sáng Ngọn Lửa'!";
            gameInstruction.style.color = "var(--amber-honey)";
        }

        if (lanternModal) {
            lanternModal.style.display = "flex";
            gsap.fromTo(lanternModal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(".lantern-3d-model", { scale: 0.8, y: 30 }, { scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
        }
    }

    function closeLanternMiniGame() {
        playSound(clickSound);
        if (lanternModal) {
            gsap.to(lanternModal, {
                opacity: 0,
                duration: 0.25,
                onComplete: () => {
                    lanternModal.style.display = "none";
                }
            });
        }
    }

    if (lanternModalClose) lanternModalClose.addEventListener("click", closeLanternMiniGame);
    window.addEventListener("click", (e) => {
        if (e.target === lanternModal) closeLanternMiniGame();
    });

    // Color picker
    colorDots.forEach(dot => {
        dot.addEventListener("click", () => {
            playSound(clickSound);
            colorDots.forEach(d => d.classList.remove("active"));
            dot.classList.add("active");
            selectedLanternColor = dot.dataset.color || "#ff7733";
            if (lanternDomeColor) {
                lanternDomeColor.style.background = `radial-gradient(circle at 50% 30%, #fff 0%, ${selectedLanternColor} 55%, #7a1e00 100%)`;
                lanternDomeColor.style.boxShadow = `0 0 35px ${selectedLanternColor}`;
            }
        });
    });

    // Preset wish chips
    wishChips.forEach(chip => {
        chip.addEventListener("click", () => {
            playSound(clickSound);
            wishChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            previewTagText.textContent = chip.textContent;
            wishInput.value = chip.textContent;
        });
    });

    // Step 1: Light candle
    if (lightCandleBtn) {
        lightCandleBtn.addEventListener("click", () => {
            playSound(sparkleSound);
            isLanternLit = true;

            if (lanternDomeColor) lanternDomeColor.classList.add("lit");
            if (lanternFlameCore) lanternFlameCore.classList.add("active");

            // Confetti sparkle around the lantern dome
            confetti({
                particleCount: 40,
                spread: 60,
                origin: { y: 0.5 },
                colors: [selectedLanternColor, '#ffd700', '#ffffff']
            });

            gsap.fromTo(".lantern-3d-model", { scale: 0.95 }, { scale: 1.08, duration: 0.4, yoyo: true, repeat: 1 });

            if (gameInstruction) {
                gameInstruction.textContent = "🔥 Ngọn lửa đã bừng sáng! Hãy ước nguyện trong lòng và bấm 'Thả Bay Lên Trời'!";
                gameInstruction.style.color = "#fbbf24";
            }

            lightCandleBtn.classList.add("hidden");
            if (releaseSkyBtn) {
                releaseSkyBtn.classList.remove("hidden");
                gsap.fromTo(releaseSkyBtn, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" });
            }
        });
    }

    // Step 2: Release to sky
    if (releaseSkyBtn) {
        releaseSkyBtn.addEventListener("click", () => {
            playSound(magicSound);

            // Animate lantern flying upwards out of modal
            gsap.to(".lantern-3d-model", {
                y: -300,
                scale: 0.3,
                opacity: 0,
                duration: 0.85,
                ease: "power2.in",
                onComplete: () => {
                    closeLanternMiniGame();

                    // Launch in 3D scene with chosen color & wish
                    const finalWish = previewTagText.textContent || wishInput.value || "Bên nhau trọn đời ❤️";
                    launchCustomWishLantern(finalWish, true, selectedLanternColor);
                    wishInput.value = "";

                    // Celebrate with grand burst
                    confetti({
                        particleCount: 80,
                        spread: 90,
                        origin: { y: 0.75 },
                        colors: [selectedLanternColor, '#fbbf24', '#f43f5e', '#ffffff']
                    });

                    // Toast message
                    const toast = document.createElement("div");
                    toast.className = "glass-card";
                    toast.style.position = "fixed";
                    toast.style.bottom = "30px";
                    toast.style.left = "50%";
                    toast.style.transform = "translateX(-50%)";
                    toast.style.zIndex = "1000";
                    toast.style.padding = "14px 28px";
                    toast.style.maxWidth = "90vw";
                    toast.style.textAlign = "center";
                    toast.style.borderRadius = "30px";
                    toast.style.boxShadow = "0 8px 30px rgba(251, 191, 36, 0.5)";
                    toast.style.background = "linear-gradient(135deg, #f59e0b, #e11d48)";
                    toast.style.color = "#ffffff";
                    toast.style.fontWeight = "700";
                    toast.innerHTML = `<i class="fas fa-fire-alt"></i> Đèn lồng mang lời ước: <em>"${finalWish}"</em> đã bay vút vào dải ngân hà cùng ngàn vì sao! ✨`;
                    document.body.appendChild(toast);

                    gsap.fromTo(toast, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.45 });

                    setTimeout(() => {
                        gsap.to(toast, {
                            opacity: 0,
                            y: -15,
                            duration: 0.5,
                            onComplete: () => toast.remove()
                        });
                    }, 4000);
                }
            });
        });
    }

    // Helper: Normalize Vietnamese names to safe ASCII filenames
    function sanitizeFilename(str) {
        if (!str) return "Ky_Niem";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D')
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .replace(/_+/g, "_");
    }

    // Direct 2D Canvas Fallback Renderer (Guarantees 100% success on any protocol/device)
    function renderContractCanvasDirectly(recipient, sender) {
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1380;
        const ctx = canvas.getContext("2d");

        // Background parchment
        ctx.fillStyle = "#fffefb";
        ctx.fillRect(0, 0, 1000, 1380);

        // Outer gold border
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 6;
        ctx.strokeRect(30, 30, 940, 1320);

        // Inner dashed gold border
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(45, 45, 910, 1290);
        ctx.setLineDash([]);

        // Watermark
        ctx.save();
        ctx.translate(500, 690);
        ctx.rotate(-25 * Math.PI / 180);
        ctx.font = "900 130px sans-serif";
        ctx.fillStyle = "rgba(217, 119, 6, 0.05)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("FOREVER", 0, 0);
        ctx.restore();

        // 4 corner decorative brackets
        const cornerSize = 40;
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#d97706";
        ctx.beginPath(); ctx.moveTo(45, 45 + cornerSize); ctx.lineTo(45, 45); ctx.lineTo(45 + cornerSize, 45); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(955 - cornerSize, 45); ctx.lineTo(955, 45); ctx.lineTo(955, 45 + cornerSize); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(45, 1335 - cornerSize); ctx.lineTo(45, 1335); ctx.lineTo(45 + cornerSize, 1335); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(955 - cornerSize, 1335); ctx.lineTo(955, 1335); ctx.lineTo(955, 1335 - cornerSize); ctx.stroke();

        // Header
        ctx.textAlign = "center";
        ctx.fillStyle = "#92400e";
        ctx.font = "bold 18px 'Montserrat', sans-serif";
        ctx.fillText("CỘNG HÒA HẠNH PHÚC & YÊU THƯƠNG ĐÔI TA", 500, 110);

        ctx.fillStyle = "#9f1239";
        ctx.font = "bold 40px 'Playfair Display', serif";
        ctx.fillText("BẢN GIA HẠN HỢP ĐỒNG TÌNH YÊU", 500, 175);

        ctx.fillStyle = "#b45309";
        ctx.font = "600 16px 'Montserrat', sans-serif";
        ctx.fillText("MÃ HIỆU: FOREVER-LOVE-UNLIMITED", 500, 215);

        ctx.fillStyle = "#4b5563";
        ctx.font = "italic 20px 'Montserrat', sans-serif";
        ctx.fillText("Chứng nhận giao ước tình cảm giữa hai trái tim luôn hướng về nhau:", 500, 275);

        // Couple Boxes
        // Partner A Box
        ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
        ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(110, 315, 330, 130, 16); else ctx.rect(110, 315, 330, 130);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#92400e";
        ctx.font = "bold 15px 'Montserrat', sans-serif";
        ctx.fillText("BÊN A (YÊU EM NHẤT)", 275, 350);

        ctx.fillStyle = "#9f1239";
        ctx.font = "bold 44px 'Dancing Script', cursive, sans-serif";
        ctx.fillText("Hoàng Việt", 275, 410);

        // Infinity connector
        ctx.fillStyle = "#e11d48";
        ctx.font = "bold 46px sans-serif";
        ctx.fillText("∞", 500, 390);

        // Partner B Box
        ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(560, 315, 330, 130, 16); else ctx.rect(560, 315, 330, 130);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#92400e";
        ctx.font = "bold 15px 'Montserrat', sans-serif";
        ctx.fillText("BÊN B (ĐƯỢC CƯNG CHIỀU)", 725, 350);

        ctx.fillStyle = "#9f1239";
        ctx.font = "bold 44px 'Dancing Script', cursive, sans-serif";
        ctx.fillText(recipient || "Bảo Thương", 725, 410);

        // Contract Terms
        ctx.textAlign = "left";
        const terms = [
            "✔ Thời hạn hợp đồng: VĨNH CỬU (Tự động gia hạn không thể hủy)",
            "✔ Cam kết bên A: Luôn lắng nghe, bao dung, đưa đi ăn ngon và không để bên B khóc.",
            "✔ Cam kết bên B: Cho phép bên A được yêu thương, chăm sóc và cùng nhau già đi.",
            "✔ Tương lai: Cùng nhau xây đắp ước mơ, giữ trọn bình yên trong mái ấm nhỏ."
        ];

        let termY = 515;
        terms.forEach(t => {
            ctx.fillStyle = "#1e1b4b";
            ctx.font = "500 18px 'Montserrat', sans-serif";
            ctx.fillText(t, 120, termY);
            termY += 58;
        });

        // Divider line
        ctx.strokeStyle = "rgba(217, 119, 6, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(100, 790); ctx.lineTo(900, 790); ctx.stroke();

        // Seal Stamp
        ctx.save();
        ctx.translate(280, 955);
        ctx.rotate(-15 * Math.PI / 180);
        ctx.strokeStyle = "#e11d48";
        ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(0, 0, 72, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI * 2); ctx.stroke();

        ctx.fillStyle = "#e11d48";
        ctx.textAlign = "center";
        ctx.font = "bold 15px 'Montserrat', sans-serif";
        ctx.fillText("ĐÃ KÝ KẾT", 0, -30);

        ctx.font = "36px sans-serif";
        ctx.fillText("❤️", 0, 6);

        ctx.font = "bold 15px 'Montserrat', sans-serif";
        ctx.fillText("TRỌN ĐỜI", 0, 42);
        ctx.restore();

        // Signature & Date
        ctx.textAlign = "right";
        const now = new Date();
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const y = now.getFullYear();

        ctx.fillStyle = "#6b7280";
        ctx.font = "16px 'Montserrat', sans-serif";
        ctx.fillText(`Ngày ${d} tháng ${m} năm ${y}`, 880, 895);

        ctx.fillStyle = "#9f1239";
        ctx.font = "bold 38px 'Dancing Script', cursive, sans-serif";
        ctx.fillText("Bên Nhau Mãi Mãi Nhé!", 880, 955);

        ctx.fillStyle = "#9ca3af";
        ctx.font = "italic 15px 'Montserrat', sans-serif";
        ctx.fillText("Chữ ký đồng lòng gắn kết", 880, 1000);

        return canvas;
    }

    // Capture Love Contract Engine (html2canvas with direct canvas fallback)
    async function captureLoveContract() {
        const certElement = document.getElementById("certificate-node");
        let canvas = null;

        if (typeof html2canvas === "function" && certElement) {
            try {
                canvas = await html2canvas(certElement, {
                    backgroundColor: "#fffefb",
                    scale: window.devicePixelRatio > 1.5 ? 2.2 : 2,
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                    scrollX: 0,
                    scrollY: -window.scrollY,
                    windowWidth: document.documentElement.offsetWidth,
                    windowHeight: document.documentElement.offsetHeight,
                    onclone: (clonedDoc) => {
                        const clonedCert = clonedDoc.getElementById("certificate-node");
                        if (clonedCert) {
                            clonedCert.style.transform = "none";
                            clonedCert.style.webkitTransform = "none";
                            clonedCert.style.boxShadow = "none";
                            clonedCert.style.margin = "0";
                        }
                    }
                });
            } catch (e) {
                console.warn("html2canvas error, using direct vector renderer fallback", e);
                canvas = null;
            }
        }

        // Fallback to direct canvas if html2canvas failed or returned empty
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            canvas = renderContractCanvasDirectly(config.recipient, config.sender);
        }

        return canvas;
    }

    // Save & Download Love Contract Certificate HD
    const downloadCertBtn = document.getElementById("download-cert-btn");
    const certModal = document.getElementById("cert-preview-modal");
    const certPreviewImg = document.getElementById("cert-preview-img");
    const certModalDownloadLink = document.getElementById("cert-modal-download-link");
    const certModalClose = document.getElementById("cert-modal-close");

    if (certModalClose) {
        certModalClose.addEventListener("click", () => {
            playSound(clickSound);
            certModal.classList.remove("active");
            certModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === certModal) {
            certModal.classList.remove("active");
            certModal.style.display = "none";
        }
    });

    downloadCertBtn.addEventListener("click", async () => {
        playSound(clickSound);
        downloadCertBtn.disabled = true;
        downloadCertBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xuất bản hợp đồng...';

        try {
            const canvas = await captureLoveContract();
            const recipientSafe = sanitizeFilename(config.recipient || "Bao_Thuong");
            const senderSafe = sanitizeFilename(config.sender || "Anh");
            const filename = `Hop_Dong_Tinh_Yeu_${recipientSafe}_${senderSafe}.png`;

            // Convert to dataUrl for preview image & download link
            const dataUrl = canvas.toDataURL("image/png");

            // Update Preview Modal
            if (certPreviewImg) {
                certPreviewImg.src = dataUrl;
            }
            if (certModalDownloadLink) {
                certModalDownloadLink.href = dataUrl;
                certModalDownloadLink.download = filename;
            }

            // Trigger Automatic Download via Blob & attached <a> tag
            if (canvas.toBlob) {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const blobUrl = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.style.display = "none";
                        link.href = blobUrl;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        setTimeout(() => {
                            document.body.removeChild(link);
                            URL.revokeObjectURL(blobUrl);
                        }, 2000);
                    }
                }, "image/png");
            } else {
                const link = document.createElement("a");
                link.style.display = "none";
                link.href = dataUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                setTimeout(() => document.body.removeChild(link), 2000);
            }

            // Show preview modal with celebration
            if (certModal) {
                certModal.style.display = "flex";
                setTimeout(() => certModal.classList.add("active"), 30);
            }

            playSound(magicSound);
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.6 }
            });

            downloadCertBtn.disabled = false;
            downloadCertBtn.innerHTML = '<i class="fas fa-check-circle"></i> Đã tải về thành công! 🎉';
            setTimeout(() => {
                downloadCertBtn.innerHTML = '<i class="fas fa-camera"></i> Lưu Hợp Đồng Tình Yêu (Ảnh Kỷ Niệm)';
            }, 3500);

        } catch (err) {
            console.error("Certificate export error", err);
            downloadCertBtn.disabled = false;
            downloadCertBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Thử lại';
        }
    });

    // Replay Button
    document.getElementById("replay-btn").addEventListener("click", () => {
        stopCelebration();
        noClickCount = 0;
        gsap.set(noBtn, { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(yesBtn, { scale: 1, x: 0, y: 0 });
        yesBtn.classList.remove("btn-glow");
        yesBtn.innerHTML = '<i class="fas fa-heart"></i> Chắc chắn rồi, bên nhau trọn đời! 🥰';
        voucherDropZone.classList.add("hidden");
        voucherDropZone.innerHTML = "";
        dramaticSpotlight.classList.remove("show");
        document.querySelectorAll(".fake-no-btn").forEach(el => el.remove());

        transitionTo("welcome");
    });

    // ==========================================================================
    // 9. SETTINGS & CUSTOMIZER MODAL
    // ==========================================================================
    const settingsToggle = document.getElementById("settings-toggle");
    const settingsClose = document.getElementById("settings-close");
    const settingsModal = document.getElementById("settings-modal");
    const settingsForm = document.getElementById("settings-form");
    const settingsReset = document.getElementById("settings-reset");

    function openModal() {
        playSound(clickSound);
        document.getElementById("input-recipient").value = config.recipient || "";
        document.getElementById("input-sender").value = config.sender || "";
        document.getElementById("input-music").value = config.musicUrl || "";
        document.getElementById("input-confession").value = config.confessionText || "";
        if (config.milestones) {
            config.milestones.forEach((m, idx) => {
                const i = idx + 1;
                const dateInp = document.getElementById(`input-date-${i}`);
                const titleInp = document.getElementById(`input-title-${i}`);
                const descInp = document.getElementById(`input-desc-${i}`);
                if (dateInp) dateInp.value = m.date || "";
                if (titleInp) titleInp.value = m.title || "";
                if (descInp) descInp.value = m.desc || "";
            });
        }
        settingsModal.style.display = "flex";
        gsap.fromTo(settingsModal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }

    function closeModal() {
        playSound(clickSound);
        gsap.to(settingsModal, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                settingsModal.style.display = "none";
            }
        });
    }

    settingsToggle.addEventListener("click", openModal);
    settingsClose.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === settingsModal) closeModal();
    });

    settingsReset.addEventListener("click", () => {
        if (confirm("Bạn có muốn khôi phục toàn bộ kỷ niệm về mặc định ban đầu không?")) {
            localStorage.removeItem("love_anniversary_config_v6");
            localStorage.removeItem("love_anniversary_config_v5");
            localStorage.removeItem("love_anniversary_config_v4");
            config = DEFAULTS;
            applyConfig();
            closeModal();
        }
    });

    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        playSound(clickSound);

        const newConfig = {
            recipient: document.getElementById("input-recipient").value || DEFAULTS.recipient,
            sender: document.getElementById("input-sender").value || DEFAULTS.sender,
            musicUrl: document.getElementById("input-music").value || DEFAULTS.musicUrl,
            confessionText: document.getElementById("input-confession").value || DEFAULTS.confessionText,
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

        saveConfig(newConfig);
        closeModal();
    });

    // Initial load
    applyConfig();
});
