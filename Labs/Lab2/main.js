//our players
var playerX = 'X';
var playerO = 'O';

var xWins = 0;
var oWins = 0;

var whoseTurn = playerX;
var gameOver = false;

var gameBoard = [1,2,3,4,5,6,7,8,9];
var moves = 1;

//must display these at load time
document.getElementsByClassName("display_score")[0].innerHTML = "X="+xWins+"\tO="+oWins;
document.getElementsByClassName("display_player")[0].innerHTML = whoseTurn;

// when a cell is clicked 
function handleCellClick(clickedCellEvent) {
    alert("clicked cell = "+clickedCellEvent);
    // alert(document.getElementById(clickedCellEvent).innerHTML)
    if(checkValid(clickedCellEvent)){
        markCell(clickedCellEvent);
        document.getElementById(clickedCellEvent).getElementsByClassName("xo")[0].innerHTML = whoseTurn;
        nextTurn();
    }
}

function checkValid(clickedCellEvent){
    return document.getElementById(clickedCellEvent).getElementsByClassName("xo")[0].innerHTML.length == 0;
}

//handle the next move and elements that have to change
function nextTurn(){
    alert(gameBoard);
    moves = moves +1;
    let player = whoseTurn;
    if(player == playerO){
        whoseTurn = playerX;
    }else{
        whoseTurn = playerO;
    }
    document.getElementsByClassName("display_player")[0].innerHTML = whoseTurn;

    if(moves > 9){
        gameOver=true;
        alert("Game over!");
    }
}

function markCell(number){
    gameBoard[number-1] = whoseTurn;
}

function resetGame(){
    location.reload();
}