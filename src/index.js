//MAKING VARIABLE TO CALL THE FUNCTION BY CLASSNAME FOR RODS AND BALL
var rod1 = document.getElementsByClassName("rod1")[0];//FOR ROD1
var rod2 = document.getElementsByClassName("rod2")[0];//FOR ROD2
var ball = document.getElementsByClassName("ball")[0];//FOR BALL
var container = document.getElementsByClassName("container")[0];

//VARIBALE SIZE SHOWS THAT VARIABLE NAMES UNDER 10 CHARACTERS.
var size = 10;

//TO SET THE SCORING 0 INITIALLY
var score1 = 0 , score2 = 0;

//SET THE INITIAL POSITION OF A BALL
var currentRod = rod2;

//BOOLEAN VALUE
var gameStart = false;

//DIRECTION TO BALL FOR MOVING
var xDirec,yDirec;//FOR HORIZONTAL AND VERTICAL DIRECTION

//MAKING VARIABLE TO CALL THE FUNCTION BY CLASSNAME FOR LIVES
var l1 = document.getElementsByClassName("heart1");//LIVES FOR PLAYER1
var l2 = document.getElementsByClassName("heart2");//LIVES FOR PLAYER2

//MAKING THE VARIABLE FOR NO OF LIVES
var livesNo1 = 3,livesNo2 = 3;//MAX. NO OF CHANCES


//MAKING VARIABLE TO CALL THE FUNCTION BY ID FOR BUTTONS AND SCORE DISPLAY.
var notIntial = true , id;//BOOLEAN VALUE
var startB = document.getElementById("start-button");//START BUTTON ID
var newGameB = document.getElementById("new-game-button");//NEW GAME BUTTON ID
var scoreDisp1 = document.getElementById("score-display1");//SCORE-DISPLAY ID FOR PLAYER1
var scoreDisp2 = document.getElementById("score-display2");//SCORE-DISPLAY ID FOR PLAYER2


//POP-UP MESSAGE BEFORE THE GAME START.
alert("Hey player, happy to see you. \n Play it to enjoy!!!!")

//ADDING A EVENTLISTENER FOR USER INTERACTION
newGameB.addEventListener('click',newGame);//LEFT-MOUSE-CLICK TO START NEW-GAME
startB.addEventListener('click',visibleScreen);
document.addEventListener('keydown',moveRod);//DEFINING KEYS FOR MOVING ROD 
document.addEventListener('keypress',launchBall);//DEFINING KEY FOR BALL-LAUNCH
window.addEventListener('resize', setGame);

//USE TO SET GAME INITIALLY
setGame();      

/*MAKING A FUNCTION TO START A GAME*/
function newGame()
{
  clearInterval(id);//CANCELS A TIMED,REPEATING ACTION WHICH WAS PREVIOUSLY ESTABLISHED
  
  document.getElementById("body-container").classList.add("blurry");

  startB.classList.remove("hidden");//REMOVES AN ELEMENT FROM THE DOCUMENT
  currentRod = rod2;//ROD WHERE THE BALL IS ESTABLISHED WHILE GAME IS START
  for(var i=0;i<3;i++)
    {
      l1[i].style.visibility = "visible";//PROPERTY VALUE IS SET AS VISIBLE TO SHOW CONTENTS ON THE SCREEN 
      l2[i].style.visibility = "visible";
    }
  livesNo1 = 3;//TOTAL LIVES FOR PLAYER1
  livesNo2 = 3;//TOTAL LIVES FOR PLAYER2
  setGame();
  score1 = 0 ,score2 = 0;//INITIALLY THE SCORE SHOW ZERO
  scoreDisp1.innerText = 0 + "";//ADDING THE SCORE DURING MOVES FOR PLAYER1
  scoreDisp2.innerText = 0 + "";//ADDING THE SCORE DURING MOVES FOR PLAYER2


}

/*TO MAKE SCREEN VISIBLE WHEN START GAME CLICKED*/
function visibleScreen()
{
  
  document.getElementById("body-container").classList.remove("blurry");
  startB.classList.add("hidden");
}



//CREATING A FUNCTION TO CONFIGURE THE RODS
function moveRod(event)
{
  var r2Left = rod2.offsetLeft;
  var r1Left = rod1.offsetLeft;

  var key = event.keyCode;
  var elementW = rod2.offsetWidth;
  var containerW = container.clientWidth;
  var containerH = container.clientHeight;
  console.log(event.keyCode);


  //CREATING CONDITIONS FOR MOVING ROD 1

  if(key == 68) //D PRESSED FOR MOVING ROD1 RIGHT
  {
    if(r1Left+elementW+size<=containerW)//THE ROD MOVES WHEN THERE IS SPACE LEFT TO LEFT DIRECTION FROM THE ORIGINAL POSITION OF ROD
    {
      rod1.style.left = r1Left+size + "px";
      r1Left+=size;

    }
    else
    {
      rod1.style.left = containerW-elementW + "px";
      r1Left = containerW-elementW;

    }
    if(gameStart == false)
      resetBall();

  }
  else if(key == 65) //A PRESSED FOR MOVING ROD1 RIGHT
  {
    if(r1Left-size>=0)//THE ROD MOVES WHEN THERE IS SPACE LEFT TO RIGHT DIRECTION FROM THE ORIGINAL POSITION OF ROD
    {
      rod1.style.left = r1Left-size+"px";
      r1Left-=size;
    }
    else{
      rod1.style.left = "0px";
      r1Left = 0;
    }
    if(gameStart == false)
      resetBall();

  }

  //CREATING CONDITIONS FOR MOVING ROD 2
  if(key == 68 ) //D PRESSED FOR MOVING ROD2 RIGHT
    {
      if(r2Left+elementW+size<=containerW) 
      {
        rod2.style.left = r2Left + size + "px";
        r2Left+=size;
      }
      else {
        rod2.style.left = containerW-elementW + "px";
        r2Left = containerW-elementW;
      }
      if(gameStart == false)
        resetBall();

    }
  else if(key == 65) //A PRESSED FOR MOVING ROD2 RIGHT
    {
      if(r2Left-size>=0)
      {
        rod2.style.left = r2Left-size+"px";
        r2Left-=size;
      }
      else
      {
        rod2.style.left = "0px";
        r2Left = 0;
      }
      if(gameStart == false)
        resetBall();
    }

}

//CREATING A FUNCTION FOR BALL INITIATION
function launchBall(event){
  if(event.keyCode == 13)//PRESS THE ENTER KEY FOR LAUNCHING A BALL
{
    notIntial = false;

    //RESET BALL(currentRod);
    if(currentRod == rod2)
      {
        xDirec = +1;//BALL COVERS THE HORIZONTAL DIRECTION
        yDirec = -1;
      }
    else{
        xDirec = +1;
        yDirec = +1;
    }
    gameStart = true;
    
    startGame();

  }
}

//FUNCTION TO SET THE GAME SETUP BEFORE STARTING
function setGame()
{
  console.log("game being set");
  gameStart = false;
  resetRods();
  resetBall();
}

//FUNCTION TO RESET THE BALL AFTER LOSING CHANCE BY ROD 1 OR ROD 2
function resetBall()
{
  console.log("ball being set");
  if(currentRod == rod2)
  {
    ball.style.top = container.clientHeight - currentRod.offsetHeight - ball.offsetHeight + "px";
    ball.style.left = currentRod.offsetLeft + (currentRod.offsetWidth)/2 - (ball.offsetWidth)/2 + "px";
  }
  else{
    ball.style.top = currentRod.offsetHeight + "px";
    ball.style.left = currentRod.offsetLeft + (currentRod.offsetWidth)/2 - (ball.offsetWidth)/2 + "px";
  }
}



//CREATE A FUNCTION TO RESET A ROD FOR EVERY NEW GAME.
function resetRods()
{
  console.log("rods being set");
  rod1.style.left = "45%";
  rod2.style.left = "45%";
}



//FUNCTION TO SET THE BALL POSITION BEFORE LAUNCHING. i.e ROD2

function startGame()
{
  gameStart = true;
  id = setInterval(setBallPosition,10);//EXECUTION OF FUNCTION AFTER A SPECIFIED TIME INTERVAL
}


//CREATE FUNCTION TO MOVE A BALL INSIDE THE CONTAINER ONLY.
function setBallPosition()
{
  var ballTop = ball.offsetTop;
  var ballLeft = ball.offsetLeft;
  var ballW = ball.offsetWidth;

  if(ballLeft + ballW== container.clientWidth) //BALL TOUCHES RIGHT BOUNDARY OF CONTAINER
    xDirec*=(-1); //REVERSING THE X CORDINATES
  else if(ball.offsetLeft == 0)
    xDirec*=(-1);

  else if(notIntial && ballTop == rod1.offsetHeight) //BALL LIES AT THE TOP OF ROD1 TO CHECK WHETHER IT STRIKES TO ROD1 OR NOT
  {
    var rl = rod1.offsetLeft - ball.offsetWidth ;
    var rr = rod1.offsetLeft + rod1.offsetWidth;

    if(ballLeft<= rr && ballLeft>=rl)
      {
        yDirec*=(-1);
        score1++;
        scoreDisp1.innerText = score1 + "";
      }
    else
      {
        alert("OOPS! You Missed it! Try Again.");//ALERT MESSAGE WHEN BALL IS MISSED.
        l1[livesNo1-1].style.visibility = "hidden";
        livesNo1--;

        clearInterval(id);
        if(!(livesNo1 == 0))
          currentRod = rod1;
        notIntial = false;
        setGame();
        if(livesNo1 == 0)
          {
            if(score1 > score2)
              alert("Winner is player 1");//SHOWS THE POP-UP PLAYER1 IS WIN
            else if(score2 > score1)
              alert("Winner is player 2");//SHOWS THE POP-UP PLAYER1 IS WIN
            else
              alert("It's a Tie");//SHOWS THE POP-UP FOR TIE

            newGame();//RESET THE GAME AFTER EVERY GAME OVER
          }
        return;
      }

  }
  else if(notIntial && ballTop + ballW == container.clientHeight - rod2.offsetHeight)//BALL LIES AT THE TOP OF ROD1 TO CHECK WHETHER IT STRIKES TO ROD-2 OR NOT
  {
    var rl = rod2.offsetLeft - ball.offsetWidth;
    var rr = rod2.offsetLeft + rod2.offsetWidth;

    if(ballLeft<=rr && ballLeft>=rl)
      {
        yDirec*=(-1);//REVERSING THE Y DIRECTION
        score2++;
        scoreDisp2.innerText = score2 + "";
      }
    else
      {
        alert("You Missed it!!");//SHOWS IN POP-UP FOR MISSING THE BALL
        l2[livesNo2-1].style.visibility = "hidden";
        livesNo2--;

        clearInterval(id);
        if(!(livesNo2 == 0))
          currentRod = rod2;
        notIntial = false;
        setGame();
        if(livesNo2 == 0)
          {
            if(score1 > score2)
              alert("Winner is player 1");
            else if(score2 > score1)
              alert("Winner is player 2 ");
            else
              alert("It's a Tie");
            newGame();
          }
        return;
      }
  }


  ballTop += yDirec;
  ballLeft += xDirec;
  ball.style.top = ballTop + "px";
  ball.style.left = ballLeft + "px";
  notIntial = true;
  console.log(ball.offsetTop,ball.offsetLeft);
}