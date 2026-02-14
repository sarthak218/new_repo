const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const loveMessage = document.getElementById("loveMessage");

noBtn.addEventListener("mouseover", () => {
    const i = Math.floor(Math.random() * 300) + 1;
    const j = Math.floor(Math.random() * 300) + 1;
    noBtn.style.left = i + "px";
    noBtn.style.top = j + "px";
});

yesBtn.addEventListener("click", () => {
    loveMessage.classList.remove("hidden");
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
});
