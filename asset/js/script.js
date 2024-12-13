let startButton = document.getElementById("start-button");
let replayButton = document.getElementById("replay-button");
let playerNameInput = document.getElementById("player-name");
let playerInfo = document.getElementById("player-info");
let playerScoreElem = document.getElementById("player-score");
let computerScoreElem = document.getElementById("computer-score");
let remainingRoundsElem = document.getElementById("remaining-rounds");
let resultElem = document.getElementById("result");
let finalResultElem = document.getElementById("final-result");
let selectedAvatarContainer = document.getElementById("selected-avatar-container");
let selectedAvatar = document.getElementById("selected-avatar");
let avatarElements = document.querySelectorAll(".avatar");
let rulesPopup = document.getElementById("rules-popup");
let rulesButton = document.getElementById("rules-button");
let closeRulesButton = document.getElementById("close-rules");
let rulesSection = document.getElementById("rules-section");
let backToGameButton = document.getElementById("back-to-game");


let playerScore = 0;
let computerScore = 0;
let remainingRounds = 10;

startButton.addEventListener("click", () => {
    let playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert("Veuillez entrer un pseudo !");
        return;
    }
    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");
    playerInfo.textContent = playerName;
});

avatarElements.forEach((avatar) => {
    avatar.addEventListener("click", () => {
        avatarElements.forEach((a) => a.classList.remove("selected"));
        avatar.classList.add("selected");
        selectedAvatar.src = avatar.src;
        selectedAvatarContainer.style.display = "block";
    });
});

document.querySelectorAll(".choice").forEach((choiceButton) => {
    choiceButton.addEventListener("click", () => {
        if (remainingRounds === 0) return;

        let playerChoice = choiceButton.dataset.choice;
        let computerChoice = getRandomChoice();
        let result = determineWinner(playerChoice, computerChoice);

        document.getElementById("player-choice").textContent = playerChoice;
        document.getElementById("computer-choice").textContent = computerChoice;
        resultElem.textContent = `${playerChoice} vs ${computerChoice}: ${result}`;

        if (result === "Vous avez gagné !") playerScore++;
        if (result === "L'ordinateur a gagné !") computerScore++;

        updateScores();
        remainingRounds--;

        if (remainingRounds === 0) showFinalResult();
    });
});
// regles
rulesButton.addEventListener("click", () => {
    document.getElementById("game-screen").classList.remove("active");
    rulesSection.classList.add("active");
});

backToGameButton.addEventListener("click", () => {
    rulesSection.classList.remove("active");
    document.getElementById("game-screen").classList.add("active");
});
function showFinalResult() {
    document.getElementById("game-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");
    if (playerScore > computerScore) {
        finalResultElem.textContent = "Félicitations, vous avez gagné !";
    } else if (playerScore < computerScore) {
        finalResultElem.textContent = "Dommage, l'ordinateur a gagné !";
    } else {
        finalResultElem.textContent = "C'est une égalité !";
    }
}

replayButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    remainingRounds = 10;
    updateScores();
    resultElem.textContent = "Faites votre choix !";
    document.getElementById("end-screen").classList.remove("active");
    document.getElementById("start-screen").classList.add("active");
});

rulesButton.addEventListener("click", () => {
    rulesPopup.classList.add("active");
});
closeRulesButton.addEventListener("click", () => {
    rulesPopup.classList.remove("active");
});

function updateScores() {
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
    remainingRoundsElem.textContent = remainingRounds;
}

function getRandomChoice() {
    let choices = ["Sloop", "Brigantin", "Galion"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
    if (player === computer) return "Égalité !";
    if (
        (player === "Sloop" && computer === "Galion") ||
        (player === "Brigantin" && computer === "Sloop") ||
        (player === "Galion" && computer === "Brigantin")
    ) {
        return "Vous avez gagné !";
    }
    return "L'ordinateur a gagné !";
}