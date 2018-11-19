
/*========== Game with computer ==========*/

const cells = document.querySelectorAll(".cell");
const winComb = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];

let cellNumbers = [1,2,3,4,5,6,7,8,9];
let firstPlayer = [], computer = [];

function check(array) {
  let finalResult = false;
  for(let item of winComb){
    let res = item.every(val => array.indexOf(val) !== -1);
    if(res){
        finalResult = true;
      break;
    }
  }
  return finalResult;
}

function checkForBlock() {
  let finalResult = -1;
  for(let item of winComb) {
    let a = item[0] , b = item[1] , c = item[2];
    if(firstPlayer.includes(a) && firstPlayer.includes(b) && !computer.includes(c)){
      finalResult = c;
      break;
    } else if(firstPlayer.includes(b) && firstPlayer.includes(c) && !computer.includes(a)){
      finalResult = a;
      break;
    } else if(firstPlayer.includes(a) && firstPlayer.includes(c) && !computer.includes(b)){
      finalResult = b;
      break;
    }
  }
  return finalResult;
}

function gameOverStatus(p) {
  const modalbox = document.createElement("div");
  const player = document.createTextNode(p);
  const replay = document.createElement("button");
  modalbox.classList.add("gameOver");
  modalbox.appendChild(player);
  replay.appendChild(document.createTextNode("Replay"));
  replay.setAttribute("onclick","rep()");
  modalbox.appendChild(replay);
  document.getElementById("board1").appendChild(modalbox);
}

function draw(){
  if(this.classList == "cell"){
    this.classList.add("x");
    let cellIndx = Number(this.dataset.index);
    let arrayIndx = cellNumbers.indexOf(cellIndx);
    cellNumbers.splice(arrayIndx,1);
    firstPlayer.push(cellIndx);
    if(check(firstPlayer)){
      gameOverStatus("Congrats, you win!!");
      return;
    }
    if(cellNumbers.length == 0){
      gameOverStatus("Tie");
      return;
    }
    cellIndx = checkForBlock();
    if(cellIndx !== -1){
      arrayIndx = cellNumbers.indexOf(cellIndx);
      cellNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${cellIndx}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index));
    } else{
      let cellNumbersLength = cellNumbers.length;
      let random = Math.floor(Math.random() * cellNumbersLength);
      cellIndx = cellNumbers[random];
      arrayIndx = cellNumbers.indexOf(cellIndx);
      cellNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${cellIndx}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index)); 
    }
    if(check(computer)) {
      gameOverStatus("Sorry, you lose. :(");
      return;
    }
  }
}

function rep() {
  const go = document.querySelector(".gameOver");
  cells.forEach(cell => cell.classList = "cell");
  cellNumbers = [1,2,3,4,5,6,7,8,9]
  firstPlayer = [];
  computer = [];
  go.remove();
}

cells.forEach(cell => cell.addEventListener("click", draw));


//===========================================
//========== Game with 2 players ============
//===========================================

const cells2 = document.querySelectorAll(".cell2");

const wins = [
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
  [11, 15, 19],
  [13, 15, 17],
  [11, 14, 17],
  [12, 15, 18],
  [13, 16, 19]
];

let playerX = [], playerO = [], count = 0;

function check2(array) {
  let finalResult2 = false;
  for(let item2 of wins){
    let res2 = item2.every(val => array.indexOf(val) !== -1);
    if(res2){
      finalResult2 = true;
      break;
    }
  }
  return finalResult2;
}

function gameOverStatus2(p) {
  const modalbox2 = document.createElement("div");
  const player2 = document.createTextNode(p);
  const replay2 = document.createElement("button");
  modalbox2.classList.add("gameOver2");
  modalbox2.appendChild(player2);
  replay2.appendChild(document.createTextNode("Replay"));
  replay2.setAttribute("onclick","rep2()");
  modalbox2.appendChild(replay2);
  document.getElementById("board2").appendChild(modalbox2);
}

function draw2() {
  if(this.classList == "cell2") {
    count++;
    if(count%2 !== 0){
      this.classList.add("x");
      playerX.push(Number(this.dataset.index));
      if(check2(playerX)) {        
        gameOverStatus2("Congrats player 'X', you win!!");
      }
    } else{
      this.classList.add("o");
      playerO.push(Number(this.dataset.index));
      if(check2(playerO)){
        gameOverStatus2("Congrats player 'O', you win!!");
      }
    }
    if(count === 9){
      gameOverStatus2("Tie");
    }
  }
}

function rep2() {
  const go2 = document.querySelector(".gameOver2");
  cells2.forEach(cell2 => cell2.classList = "cell2");
  playerX = [];
  playerO = [];
  count = 0;
  go2.remove();
}

cells2.forEach(cell2 => cell2.addEventListener("click", draw2));
