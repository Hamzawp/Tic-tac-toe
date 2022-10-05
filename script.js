var origboard;
const huplayer='O';
const aiplayer='X';
const wincombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll('.cell');
startgame();

function startgame(){
    var d= document.querySelector(".endgame");
    d.style.display="none";
    origboard= Array.from(Array(9).keys());
    for(var i=0 ;i< cells.length;i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick,false);
    }
}

function turnclick(square){
    if(typeof origboard[square.target.id]=='number'){
        turn(square.target.id, huplayer);
        if(!checktie()) turn(bestspot(),aiplayer);
    }
}

function turn(squareid,player) {
    origboard[squareid]=player;
    document.getElementById(squareid).innerText=player;
    let gamewon = checkwin(origboard,player);
    if (gamewon){
        gameover(gamewon)
    }
}

function checkwin(board, player){
    let plays= board.reduce((a, e, i) =>
    (e == player) ? a.concat(i) : a, [] ) ;
    let gamewon = null;
    for(let [index,win] of wincombos.entries() ) {
        if(win.every(elem => plays.indexOf(elem) > -1)) {
            gamewon = {index: index,player: player};
            break;
        }
    }
    return gamewon;
}

function gameover(gamewon) {
	for (let index of wincombos[gamewon.index]) {
		document.getElementById(index).style.backgroundColor =
			gamewon.player == huplayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnclick, false);
	}
    declarewinner(gamewon.player==huplayer ? "You win!": "You lose!");
}

function declarewinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame").innerText = who;
}

function emptysquares(){
    return origboard.filter(s => typeof s == 'number');
}

function bestspot(){
    return emptysquares()[0];
}

function checktie(){
    if(emptysquares().length == 0){
        for(var i=0;i< cells.length;i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click',turnclick,false);
        }
        declarewinner("Tie Game!")
        return true;
    }
    return false;
}