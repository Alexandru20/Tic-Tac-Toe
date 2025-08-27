function Player(name, playerNumber) {
    let playerSquares = [];

    const updatePlayerSquares = (value) => {
        playerSquares.push(value);

    }
    const getPlayerSquares = () => playerSquares;
    const clearSquares = () => playerSquares = [];

    return { name, playerNumber, updatePlayerSquares, getPlayerSquares, clearSquares };
}

let player1;
let player2;
let currentPlayer = player1;
let winning_Player = 0;
let round = 0;
let gameStarted = false;
const display = document.querySelector(".winner-display");
const restartButton = document.querySelector(".restart");

const showButton = document.querySelector("#start-game");
const dialog = document.getElementById("dialog");
const closeButton = dialog.querySelector("#start-game-button");

const Gameboard = (function () {


    const gameboard = [];
    const squares = document.querySelectorAll(".square");
    const generateGameboard = () => {



        squares.forEach((square) => {
            gameboard.push(square);
            square.addEventListener("click", () => {

                if (square.hasChildNodes()) return;
                if (winning_Player != 0) {
                    return;
                }
                if (gameStarted === false) {
                    return;
                }
                const image = document.createElement("img");
                if (currentPlayer === player1) {
                    image.src = "./x.png";
                    player1.updatePlayerSquares(parseInt(square.id));
                    GameLogic.winningPlayer(player1);
                    currentPlayer = player2;
                }
                else if (currentPlayer === player2) {
                    image.src = "./o.png";
                    player2.updatePlayerSquares(parseInt(square.id));
                    GameLogic.winningPlayer(player2);
                    currentPlayer = player1;
                }
                square.appendChild(image);

                round += 1;




            });

        });
    }

    generateGameboard();

    const getGameboard = () => gameboard;

    const getCurrentPlayer = () => currentPlayer;
    const updateCurrentPlayer = (player) => currentPlayer = player.playerNumber;



    return { getGameboard, updateCurrentPlayer, getCurrentPlayer };
})();

const GameLogic = (function () {
    const winningRows = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


    const winningPlayer = (player) => {
      
        


        winningRows.forEach((row) => {
            counter = 0;

            row.forEach((rowValue) => {
                player.getPlayerSquares().forEach((value) => {
                    if (rowValue === value) {
                        counter += 1;
                        if (counter === 3 ) {
                            winning_Player = player;
                            display.textContent = `Winner: ${winning_Player.name}`;
                            return;
                        }
                        if(round === 8){
                            display.textContent = "Draw";
                        }

                    }
                });

            });
        });
    }

    const playGame = (currPlayer) => {
        winningPlayer(currPlayer);

    }

    return { winningPlayer, playGame };
})();

restartButton.addEventListener("click", restartGame);
function restartGame() {
    currentPlayer = player1;
    winning_Player = 0;
    round = 0;

    player1.clearSquares();
    player2.clearSquares();
    display.textContent = "Winner: ";


    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.innerHTML = "";
    });
}





showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    const player1Name = document.querySelector("#player1-name").value;
    const player2Name = document.querySelector("#player2-name").value;
    player1 = new Player(player1Name, 1);
    player2 = new Player(player2Name, 2);



    gameStarted = true;
    restartGame();


    dialog.close();
});