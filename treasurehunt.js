
// var boardSize = 7
var boardWidth = 12
var boardHeight = 7

var treasureRow
var treasureCell
var bombRow
var bombCell

var clickCounter
var triesAvailable = 30

var minutesPassed
var secondsPassed

var gameOver

var spacing = ""


reset()
function reset(){
    treasureRow = Math.ceil(Math.random() * boardHeight)
    treasureCell = Math.ceil(Math.random() * boardWidth)
    bombRow = Math.ceil(Math.random() * boardHeight)
    bombCell = Math.ceil(Math.random() * boardWidth)

    if (treasureRow === bombRow && treasureCell === bombCell)
    {reset()}
    else{
        clickCounter = -1
        gameOver = false

        minutesPassed = 0
        secondsPassed = -1

        updateTries()
        updateTimeElapsed()

        console.log("Treasure: " + treasureRow + " " + treasureCell)
        console.log("Bomb: " + bombRow + " " + bombCell)

        startTimer()
    }
}


function clicked(row , cell){
    var selection = document.getElementById(row).cells.namedItem(cell)

    if( (clickCounter !== triesAvailable) && !gameOver){
        if  (row === ("row" + treasureRow) && cell === ("cell" + treasureCell)){
            selection.innerHTML = "🍆"
            setTimeout(gameOverEvent,50,0)
        }else if  (row === ("row" + bombRow) && cell === ("cell" + bombCell) ){
            selection.innerHTML = "💣"
            setTimeout(gameOverEvent,50,1)
        }else {
            if (selection.innerHTML === "🌴") { clickCounter-- }
            else { selection.innerHTML = "🌴" }
        }
        updateTries()
    }else
    { alert("The Game is Over, Silly!") }
}


function updateTries(){
    var newTriesLeft = "Tries Left: " + (triesAvailable - ++clickCounter)
    document.getElementById("triesLeft").innerHTML = newTriesLeft
    if (clickCounter === triesAvailable)
    { setTimeout(gameOverEvent,50,2) }
}


function updateTimeElapsed(){
    var newTimePassed = `Time: ${ minutesPassed }:${ secondsPassed }`
    document.getElementById("elapsedTime").innerHTML = newTimePassed
    if (++secondsPassed === 60){
        minutesPassed++
        secondsPassed = 0
    }
}



function startTimer(){
    updateTimeElapsed()
    if(!gameOver)
    {setTimeout(startTimer,1000)}
}


function gameOverEvent(endState){
    gameOver = true
    if (endState === 0)
    { alert("You found DA BOOTY!") }
    else if( endState == 1)
    { alert("You got the bomb, loser. 🤡") }
    else{ alert("Ran out of attempts.  Try again!") }
}







// end of file
