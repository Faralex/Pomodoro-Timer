const button = document.querySelector("#btn");
const input = document.querySelector("#input-hours");
const first = document.querySelector("#first");
const second = document.querySelector("#second");
const third = document.querySelector("#third");
const fourth = document.querySelector("#fourth");
const container = document.querySelector("#container");
const containerInner = document.querySelector("#container-inner");
const min = document.querySelector("#minutes");
const sec = document.querySelector("#seconds");
const text = document.querySelector("#text");
const playBtn = document.querySelector("#playBtn");
const area = document.querySelector("#area");

const audio = new Audio();
audio.src = "./audio/kolokolchik.mp3";
audio.volume = 0.5;

let amount;
let divide = "/";

button.addEventListener("click", () => {
  if (input.value.length === 0) {
    divide = "";
    if (first.checked || second.checked || third.checked || fourth.checked) {
      renderBtn();
    }
  }
  if (first.checked) {
    containerInner.innerHTML = "";
    timer(1500, 300);
    backgroundChanger();
    audio.play();
    if (input.value.length === 0) {
      amount = input.value;
      return;
    }
    amount = input.value * 2;
  }
  if (second.checked) {
    containerInner.innerHTML = "";
    timer(2700, 900);
    backgroundChanger();
    audio.play();
    amount = input.value;
  }
  if (third.checked) {
    containerInner.innerHTML = "";
    timer(3000, 600);
    backgroundChanger();
    audio.play();
    amount = input.value;
  }
  if (fourth.checked) {
    containerInner.innerHTML = "";
    timer(10, 5);
    backgroundChanger();
    audio.play();
    amount = input.value;
  }
});

let count = 0;

function timer(duration, breakDuration) {
  startTimer(duration, breakDuration);
  function startTimer() {
    let timer = duration;
    const interval = setInterval(function () {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      text.innerText = `You have done ${count}${divide}${amount} sessions`;
      min.textContent = minutes + " :";
      sec.textContent = seconds;
      document.title = minutes + ":" + seconds;
      min.style.color = "#fad052";
      sec.style.color = "#fad052";
      if (--timer < 0) {
        count++;
        clearInterval(interval);
        startBreak(breakDuration);
        text.innerText = `You have done ${count}${divide}${amount} sessions`;
        audio.play();
      }
      if (input.value.length === 0 && count === 1) {
        text.innerText = `You have done ${count}${divide}${amount} session`;
      }
    }, 1000);
  }

  function startBreak(breakDuration) {
    let timer = breakDuration;
    const breakInterval = setInterval(function () {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      min.textContent = minutes + " :";
      sec.textContent = seconds;
      document.title = minutes + ":" + seconds;

      min.style.color = "#fff";
      sec.style.color = "#fff";
      text.innerText = "Break time";
      if (--timer < 0) {
        clearInterval(breakInterval);
        startTimer(breakDuration);
        audio.play();
      }
      if (input.value.length > 0) {
        if (count >= amount) {
          text.innerText = `Congratulations, all work is done`;
          clearInterval(breakInterval);
          min.textContent = "";
          sec.textContent = "";
          renderBtn();
          audio.play();
          return;
        }
      }
    }, 1000);
  }
}

function backgroundChanger() {
  document.body.style.background = "#4e54c8";
  document.getElementById("area").style.display = "block";
}

function renderBtn() {
  const finishBtn = document.createElement("btn");
  finishBtn.classList.add("btn");
  finishBtn.innerText = "Finish the work";
  finishBtn.style.width = "200px";
  finishBtn.style.margin = "0 auto";
  finishBtn.style.display = "flex";
  container.appendChild(finishBtn);

  finishBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

function renderTurnBtn() {
  const turnBtn = document.createElement("btn");
  turnBtn.classList.add("turnBtn");
  turnBtn.innerText = "Bell is on";
  turnBtn.style.paddingTop = "25px";
  container.appendChild(turnBtn);

  turnBtn.addEventListener("click", () => {
    const initialText = "Bell is on";
    if (turnBtn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
      turnBtn.textContent = "Bell is off";
      audio.volume = 0;
    } else {
      turnBtn.textContent = initialText;
      audio.volume = 0.5;
    }
  });
}
renderTurnBtn();
