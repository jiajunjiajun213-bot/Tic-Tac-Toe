
const container = document.querySelector(".container")
const winner = document.querySelector(".winner")
const restartButton = document.querySelector(".restartButton")
const start = document.querySelector(".start")
const startGame = document.querySelector(".startGame")
const modal = document.querySelector("[data-modal]")
const playerOneInput = document.getElementById("playerOneName")
const playerTwoInput = document.getElementById("playerTwoName")
function Gameboard() {
    const row = 3
    const column= 3
    const board = []
    let gameover = true;
    let player = "X"
     const winningCombinations = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
   ]
   start.addEventListener("click" , () => {
    modal.showModal()
   })
   startGame.addEventListener("click" , () =>{
    modal.close()
   })
   startGame.addEventListener('click' , ()=>{
    gameover = false;
    winner.textContent = `${playerOneInput.value}'s turn`
    start.remove()
   })
   
    for(let i = 0 ; i < row ; i++){
        board[i] = []
        const divRow = document.createElement("div")
        container.appendChild(divRow)
        divRow.classList.add("divRow")


        for(let j = 0 ; j < column ; j++){
            board[i].push(cell())
        const divColumn = document.createElement("div")
        divRow.appendChild(divColumn)
        divColumn.classList.add("divColumn")
        divColumn.dataset.row = i;
        divColumn.dataset.column = j;
            divColumn.addEventListener('click' , () =>{
        const r = Number(divColumn.dataset.row) ;
         const c = Number(divColumn.dataset.column);
         addToken(r , c)
         checkWinner()
         checkDraw()
         })

        }
    }
   function checkDraw() {
    const isFull =  board.every((row) => row.every((cell) => cell.getValue() !== 0 ))
    if (isFull && gameover === false) {
        gameover = true
        winner.textContent = "It is a draw"
        restartButton.addEventListener('click' , () =>{
         restart();

        })
    }
}
    function checkWinner(){
    for(let i = 0 ; i < 8 ; i++){
    const combo = winningCombinations[i]
    const pos1 = combo[0]
    const pos2 = combo[1]
    const pos3 = combo[2]
    const val1 = board[pos1[0]][pos1[1]].getValue()
    const val2 = board[pos2[0]][pos2[1]].getValue()
    const val3 = board[pos3[0]][pos3[1]].getValue()
    if (val1 === val2 && val2 === val3 && val1 !== 0 && val1 === "O"){
        winner.textContent = `${playerOneInput.value } is winner`
        gameover = true;
        restartButton.addEventListener('click' , () =>{
         restart();

        })
    }
    else if (val1 === val2 && val2 === val3 && val1 !== 0 && val1 === "X"){
         winner.textContent = `${playerTwoInput.value }is winner`
        gameover = true;
        restartButton.addEventListener('click' , () =>{
         restart();
    })}
   }
    }
    function restart(){
        gameover = true
        board.map((row) => row.map((cell) => cell.addToken(0)))
        document.querySelectorAll(".divColumn").forEach(div=>{
        div.textContent="";
        restartButton.after(start)
        })
    winner.textContent =""
    }
    function addToken (row , column ){
        if ((board[row][column].getValue()) === 0 && gameover === false){
        player = player === "X" ? "O" : "X"
        winner.textContent = player === "X" ? `${playerTwoInput.value}'s turn` : `${playerOneInput.value}'s turn`   // ADD THIS LINE
        board[row][column].addToken(player)
        const targetDiv = document.querySelector(`[data-row="${row}"][data-column="${column}"]`)
        targetDiv.textContent = player;
        }
    
    }
    function printBoard (){
       return board.map((row) => row.map((cell) => cell.getValue()))
    }
    return {
        addToken,
        printBoard,
    }
}
function cell () {
    let value = 0;
    const getValue = () =>{
       return value;
    }
    const addToken = (player) =>{
        value = player;
    } 
    return {
        getValue , 
        addToken,
    }
}

Gameboard();