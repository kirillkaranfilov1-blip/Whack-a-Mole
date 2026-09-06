const hole = document.querySelectorAll(".hole");

const start_btn = document.querySelector(".start-btn");

const scoreElement = document.querySelector("#score");
const time = document.querySelector("#time");
const bestScore = document.querySelector("#bestScore");
const message = document.querySelector("#message");

let score = 0;

let timer = 15;

let Gamertimer = null;

let mollTimer = null;

let Carandmoll = null;

let CarandSpeed = 1000;

let GameStarted = false;



const savedBestScore = localStorage.getItem("moleBestScore");

if (savedBestScore) {
    bestScore.textContent = savedBestScore;
}



function CreateMoll() {


    hole.forEach(Element => {
        Element.classList.remove("active");
        Element.innerHTML = "";
    });



    const Random = Math.floor(Math.random() * hole.length);

    const Selectholl = hole[Random];

    Carandmoll = Selectholl;



    const Mole = document.createElement("div");

    Mole.classList.add("mole");

    Mole.textContent = "🐹";



    Selectholl.append(Mole);

    Selectholl.classList.add("active");



    Mole.addEventListener("click", Hitmole);


 
    mollTimer = setTimeout(CreateMoll, CarandSpeed);
}



function Hitmole(event) {

    event.stopPropagation();



    if (!GameStarted) {
        return;
    }



    score++;

    scoreElement.textContent = score;



    if (CarandSpeed > 350) {
        CarandSpeed -= 50;
    }



    if (Carandmoll) {

        Carandmoll.classList.remove("active");

        Carandmoll.innerHTML = "";
    }


    
    clearTimeout(mollTimer);



    CreateMoll();
}



function startGame() {

   
    if (GameStarted) {
        return;
    }


    GameStarted = true;

    score = 0;
    timer = 15;
    CarandSpeed = 1000;
    scoreElement.textContent = score;

    time.textContent = timer;

    message.textContent = "Лови крота!";


    start_btn.disabled = true;

    start_btn.textContent = "Игра идет...";



    CreateMoll();



    Gamertimer = setInterval(() => {

        timer--;

        time.textContent = timer;


        if (timer <= 0) {
            overGame();
        }

    }, 1000);
}



function overGame() {

    GameStarted = false;


    
    clearInterval(Gamertimer);

    clearTimeout(mollTimer);



    hole.forEach(Element => {

        Element.classList.remove("active");

        Element.innerHTML = "";

    });


    const currentBest =
        Number(localStorage.getItem("moleBestScore")) || 0;



    if (score > currentBest) {

        localStorage.setItem("moleBestScore", score);

        bestScore.textContent = score;

        message.textContent = `🎉 Новый рекорд: ${score}!;`
    } else {

        message.textContent = `Игра окончена! Счёт: ${score};`
    }
    start_btn.disabled = false;
    start_btn.textContent = "Играть снова";
}
start_btn.addEventListener("click", startGame);