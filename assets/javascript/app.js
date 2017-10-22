var questions = [{q: "What year was the National Basketball Association first established?", a :["1935", "1945","1958"],rightAnswer:"1946"},
				  {q: "Michael Jordan was drafted third overall in 1984. Which two players were selected ahead of him?", a :["Patrick Ewing & Hakeem Olajuwan","Charles Barkley & Hakeem Olajuwan", "Karl Malone & Sam Bowie"],rightAnswer:"Hakeem Olajuwan & Sam Bowie"},
				  {q: "What year did the NBA-ABA merger occur?", a:["1970","1973","1974"],rightAnswer:"1976"},
				  {q: "Which country has won the World Cup 5 times?", a:[ "Germany","Italy","England"], rightAnswer:"Brazil"},
				  {q: "Which country has won the World Cup 5 times?", a:[ "Spain","Italy","France"], rightAnswer:"Netherlands"},
				  {q: "Which country has won the World Cup 5 times?", a:["Brazil","Cameroon","Argentina"], rightAnswer:"Ghana"}
];
var time = 0;
var intervalId;
var gameStatus = "new";
var questionTime = 45;
var qIndex = 0;
				  

$(document).ready(function() {

  $("#btnNewGame").on("click", function() {
  	if (gameStatus==="new"){
  			$("#timeLeft").text("Time Remaining: 00:00");
  			run();
  			newQuestion();
  			gameStatus = "inprogress";
  	}
});

$("#btnEndGame").on("click", function() {
  	stop();
});

$(".rb").on("click", function() {
  	if ($(this).attr("data-value") === "true"){
  		alert("boom");
  	}
  	else{
  		alert("downnn");
  	}
});


function newQuestion(){
	var j = 0;
	$("#question").text(questions[qIndex].q);
	var answerNumber = getRandomNumber();
	for (i=1; i <5 ; i++){
		console.log(answerNumber);
		if (i === answerNumber){
			$("#labela"+ answerNumber).text(questions[qIndex].rightAnswer);
			$("#a"+answerNumber).removeClass("hidden");
			$("#a"+answerNumber).attr("data-value","true");
		}
		else{
			$("#labela"+ i).text(questions[qIndex].a[j]);
			$("#a" + i).removeClass("hidden");
			$("#a" + i).attr("data-value","false");
			j++;
		}
	}
}

function run() {
      intervalId = setInterval(count, 1000);
 }

function stop() {
      clearInterval(intervalId);
 }

function count() {
   if (time < questionTime){
	    time++;
	    var currentTime = timeConverter(time);
	    $("#timeLeft").text("Time Remaining: " + currentTime);
	}
	else{
		gameStatus = "timeisup" ;
		//alert(the correct answer is )
	}
 }

function  reset() {
    time = 0;
    $("#timeLeft").text("00:00");
}

function getRandomNumber() {
   return (Math.floor(Math.random() * 3) + 1)
}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }


});