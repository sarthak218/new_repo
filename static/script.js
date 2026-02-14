document.addEventListener("DOMContentLoaded", function () {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const loveMessage = document.getElementById("loveMessage");
    const gameBtn = document.getElementById("gameBtn");
    const gameArea = document.getElementById("gameArea");
    const pianoGame = document.getElementById("pianoGame");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const bgMusic = document.getElementById("bgMusic");
    const slides = document.querySelectorAll(".slide");

    let score = 0;
    let timeLeft = 30;
    let combo = 0;
    let tileSpeed = 4;
    let gameInterval;
    let countdownInterval;
    let rowInterval;
    let currentSlide = 0;

    /* 🎵 Music plays on first click */
    document.body.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
        }
    });

    /* 📸 Slideshow */
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 3000);

    showSlide(currentSlide);

    /* NO button moves */
    function moveNoButton() {

    const container = document.querySelector(".buttons");

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = containerWidth - btnWidth;
    const maxY = containerHeight - btnHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

/* Desktop Hover */
noBtn.addEventListener("mouseover", moveNoButton);

/* Mobile Touch */
noBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();   // prevent accidental click
    moveNoButton();
});



    /* YES click */
    yesBtn.addEventListener("click", () => {

        loveMessage.classList.remove("hidden");
        yesBtn.style.display = "none";
        noBtn.style.display = "none";

        confetti({
            particleCount: 200,
            spread: 150
        });
    });

    /* Start Game */
    gameBtn.addEventListener("click", () => {
        gameArea.classList.remove("hidden");
        startGame();
    });

    function startGame() {

        score = 0;
        combo = 0;
        timeLeft = 30;
        tileSpeed = 4;

        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        pianoGame.innerHTML = "";

        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        clearInterval(rowInterval);

        gameInterval = setInterval(moveTiles, 20);
        countdownInterval = setInterval(countdown, 1000);
        rowInterval = setInterval(createRow, 800);
    }

    function countdown() {

        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft % 5 === 0) {
                tileSpeed += 0.5;
            }

        } else {
            endGame("💖 Time's Up!");
        }
    }

    function createRow() {

        const row = document.createElement("div");
        row.classList.add("row");
        row.style.top = "-100px";

        const randomTile = Math.floor(Math.random() * 4);
        const heartChance = Math.random();

        for (let i = 0; i < 4; i++) {

            const tile = document.createElement("div");
            tile.style.left = (i * 25) + "%";

            if (i === randomTile) {

                if (heartChance < 0.2) {

                    tile.classList.add("tile", "heart-tile");
                    tile.innerHTML = "💖";

                    tile.addEventListener("click", function () {
                        score += 5;
                        timeLeft += 2;
                        combo++;
                        updateUI();
                        row.remove();
                    });

                } else {

                    tile.classList.add("tile");

                    tile.addEventListener("click", function () {

                        combo++;
                        let multiplier = Math.floor(combo / 5) + 1;
                        score += multiplier;

                        updateUI();
                        row.remove();
                    });
                }
            }

            row.appendChild(tile);
        }

        pianoGame.appendChild(row);
    }

    function moveTiles() {

        const rows = document.querySelectorAll(".row");

        rows.forEach(row => {

            let top = parseInt(row.style.top);
            row.style.top = (top + tileSpeed) + "px";

            if (top > 500) {
                endGame("💔 You missed a tile!");
            }
        });
    }

    function updateUI() {
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
    }

    function endGame(message) {
        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        clearInterval(rowInterval);

        alert(message + "\nFinal Score: " + score);

        if (score >= 40) {
            confetti({
                particleCount: 400,
                spread: 200
            });
        }
    }

});
