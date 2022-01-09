// 랜덤번호를 지정
// 유저가 번호를 입력한다. 그리고 Go라는 버튼을 누른다.
// 만약에 랜덤번호를 맞히면, 맞혔습니다!
// 랜덤번호 < 유저번호 -> Down!!
// 랜덤번호 > 유저번호 -> Up!!
// Reset버튼을 누르면 게임이 리셋
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, disable)
// 유저가 1~100의 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 입력하면 알려준다. 기회를 깎지 않는다.

let comNum = 0
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
    userInput.value = "";
});

function pickRandomNum() {
    comNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", comNum);
}

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력해 주세요.";
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
        return;
    }

    chances--;
    chanceArea.textContent = `남은기회 : ${chances}번`;

    if (userValue < comNum) {
        resultArea.textContent = "UP!!!";
    } else if (userValue > comNum) {
        resultArea.textContent = "DOWN!!!";
    } else {
        resultArea.textContent = "맞히셨습니다!!!";
        gameOver = true;
    }

    history.push(userValue);
    
    if (chances < 1) {
        gameOver = true;
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
}

function reset() {
    // user input창이 깨끗이 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    resultArea.textContent = "결과값이 여기 나옵니다!";
}

pickRandomNum();