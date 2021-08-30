const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const rulesButton = document.querySelector('#rules-button');
let numberOfDinners = 0;
let tails = [];
const snakeCoords = {
    x: 0,
    y: 20,
}

const snakeSpeed = {
    x: 20,
    y: 0,
}

const foodLocation = {
    x: 0,
    y: 0,
}

const snakePoints = () => {
    foodLocation.x = (Math.floor(Math.random() * 24) + 1) * 20;
    foodLocation.y = (Math.floor(Math.random() * 24) + 1) * 20;
}

const getSnakePoints = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodLocation.x, foodLocation.y, 20, 20);
}
const checkCoords = () => {
    if(snakeCoords.x === foodLocation.x && snakeCoords.y === foodLocation.y){
        numberOfDinners++;
        snakePoints();
    }
}



const snakeGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';

    for(let i = 0; i < tails.length - 1; i++){
        tails[i] = tails[i + 1];
    }

    tails[numberOfDinners - 1] = {
        x: snakeCoords.x,
        y: snakeCoords.y
    }

    snakeCoords.x += snakeSpeed.x;
    snakeCoords.y += snakeSpeed.y;

    if(snakeCoords.x < 0){
        snakeCoords.x = 500;
    }
    else if(snakeCoords.x > 500){
        snakeCoords.x = 0;
    }
    else if(snakeCoords.y < 20){
        snakeCoords.y = 500;
    }
    else if(snakeCoords.y > 500){
        snakeCoords.y = 20;
    }

    for(let i = 0; i < tails.length; i++){
        ctx.fillRect(tails[i].x, tails[i].y, 20, 20);
    }

    ctx.fillRect(snakeCoords.x, snakeCoords.y, 20, 20);
    ctx.font = 'italic normal 20px Arial'
    ctx.fillText(`Zjedzone jedzenie: ${numberOfDinners}`, 150, 20)
}

const snakeMoves = e => {
    if(e.key === 'ArrowRight' && snakeSpeed.x === 0){
        snakeSpeed.x = 20;
        snakeSpeed.y = 0;
    }
    else if(e.key === 'ArrowLeft' && snakeSpeed.x === 0){
        snakeSpeed.x = -20;
        snakeSpeed.y = 0;
    }
    else if(e.key === 'ArrowUp' && snakeSpeed.y === 0){
        snakeSpeed.x = 0;
        snakeSpeed.y = -20;
    }
    else if(e.key === 'ArrowDown' && snakeSpeed.y === 0){
        snakeSpeed.x = 0;
        snakeSpeed.y = 20;
    }
}

const accident = () => {
    for(let i = 0; i < tails.length; i++){
        if(tails[i].x === snakeCoords.x && tails[i].y === snakeCoords.y){
            alert(`Przegrałeś! Liczba zdobytego jedzenia: ${numberOfDinners}`);
            tails = [];
            numberOfDinners = 0;
        }
    }
}

const rulesAlert = () => {
    alert('Poruszanie się strzałkami. Miłej gry :D')
}

document.addEventListener('keyup', snakeMoves);
rulesButton.addEventListener('click', rulesAlert);

snakePoints();

setInterval(() => {
    snakeGame();
    getSnakePoints();
    checkCoords();
    accident();
},250)
