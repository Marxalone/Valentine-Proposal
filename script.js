document.addEventListener("DOMContentLoaded", () => {
    const noBtn = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");
    const proposalText = document.getElementById("proposal-text");
    const thankYouMsg = document.getElementById("thank-you-msg");
    const convinceMsg = document.getElementById("convince-message");
    const finalSection = document.getElementById("final-section");
    const langBtn = document.getElementById("lang-btn");
    const bgMusic = document.getElementById("bg-music");
    const countdownTimer = document.getElementById("countdown-timer");

    // Video elements
    const loveVideo = document.getElementById("love-video");
    const happyVideo = document.getElementById("happy-video");

    let noClicks = 0;
    let currentLang = "en";
    let swapped = false;
    let yesBtnScale = 1; // Initial size of the "Yes" button

    const messages = {
        en: ["Are you sure? 🥺", "Come on, don't break my heart! 💔", "Pleaseeeeee! 😭", "Okay, last chance! 💘"],
        pidgin: ["You sure? 😢", "Abeg no do me like this 💔", "No fall my hand o! 😭", "Last chance o! ❤️"],
        igbo: ["I kwesi? 🥺", "Biko, anya m! 💔", "Ewoo! Chere! 😭", "Chai, ikpeazụ! 💘"],
        french: ["Tu es sûr? 🥺", "Ne me brise pas le cœur! 💔", "S'il te plaît! 😭", "Dernière chance! 💘"]
    };

    const proposals = {
        en: "Will you be my Valentine? ❤️",
        pidgin: "You go be my Valentine? ❤️",
        igbo: "Ga-aba m Valentine? ❤️",
        french: "Veux-tu être mon Valentin(e)? ❤️"
    };

    const thankYouTexts = {
        en: "Thank you, my Valentine! 💖",
        pidgin: "I hail you, my Valentine! ❤️",
        igbo: "Daalu, m Valentine! 💖",
        french: "Merci, mon amour! 💖"
    };

    // **Feature #5: Countdown Timer to Valentine's Day**
    function updateCountdown() {
        const now = new Date();
        const valentine = new Date(now.getFullYear(), 1, 14); // February 14th
        const timeLeft = valentine - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        countdownTimer.innerText = `⏳ Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    setInterval(updateCountdown, 1000);

    // **Feature #6: Typing Animation for Proposal Text**
    function typeText() {
        const text = proposals[currentLang];
        let i = 0;
        proposalText.innerHTML = "";

        function type() {
            if (i < text.length) {
                proposalText.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }
    typeText(); // Start animation on page load

    noBtn.addEventListener("click", () => {
        convinceMsg.innerText = messages[currentLang][noClicks % messages[currentLang].length];
        noClicks++;

        // Increase "Yes" button size significantly
        yesBtnScale += 0.3; // Increase size by 30% each time "No" is clicked
        yesBtn.style.transform = `scale(${yesBtnScale})`;
        yesBtn.style.transition = "transform 0.1s ease-in-out"; // Smooth effect

        // Swap buttons every 5 clicks
        if (noClicks % 5 === 0) {
            swapButtons();
        }
    });

    yesBtn.addEventListener("click", () => {
        document.querySelector(".buttons").style.display = "none";
        proposalText.style.display = "none";
        convinceMsg.style.display = "none";

        // Hide love video and show happy video
        loveVideo.classList.add("hidden");
        happyVideo.classList.remove("hidden");

        finalSection.classList.remove("hidden");
        startHeartRain();
    });

    langBtn.addEventListener("click", () => {
        const langs = ["en", "pidgin", "igbo", "french"];
        currentLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
        typeText();
        thankYouMsg.innerText = thankYouTexts[currentLang];
    });

    function swapButtons() {
        const yesRect = yesBtn.getBoundingClientRect();
        const noRect = noBtn.getBoundingClientRect();

        // Swap positions by setting exact pixel values
        yesBtn.style.position = "absolute";
        noBtn.style.position = "absolute";

        yesBtn.style.left = `${noRect.left}px`;
        yesBtn.style.top = `${noRect.top}px`;
        noBtn.style.left = `${yesRect.left}px`;
        noBtn.style.top = `${yesRect.top}px`;

        swapped = !swapped;
    }

    function startHeartRain() {
        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * window.innerWidth + "px";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, 200);
    }

    // Fix background music autoplay issues & start from 21st second
    function playMusic() {
        if (bgMusic.paused) {
            bgMusic.currentTime = 20; // Skip first 20 seconds
            bgMusic.play().catch((error) => {
                console.log("Autoplay blocked, waiting for user interaction...");
            });
        }
    }

    // Try playing music after page loads
    playMusic();

    // Ensure music starts on first interaction
    document.body.addEventListener("click", playMusic, { once: true });
    document.body.addEventListener("touchstart", playMusic, { once: true });

    // Ensure music loops smoothly
    bgMusic.addEventListener("ended", () => {
        bgMusic.currentTime = 0;
        bgMusic.play();
    });

    bgMusic.volume = 0.5;
});