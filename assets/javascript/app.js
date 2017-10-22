var questions = [{q: "What year was the National Basketball Association first established?", a :["1935", "1945","1958"],rightAnswer:"1946"},
				  {q: "Michael Jordan was drafted third overall in 1984. Which two players were selected ahead of him?", a :["Patrick Ewing & Hakeem Olajuwan","Charles Barkley & Hakeem Olajuwan", "Karl Malone & Sam Bowie"],rightAnswer:"Hakeem Olajuwan & Sam Bowie"},
				  {q: "What year did the NBA-ABA merger occur?", a:["1970","1973","1974"],rightAnswer:"1976"},
				  {q: "Which country has won the World Cup 5 times?", a:[ "Germany","Italy","England"], rightAnswer:"Brazil"},
				  {q: "Which nation has reached the World Cup final three times, but never won?", a:[ "Spain","Italy","France"], rightAnswer:"Netherlands"},
				  {q: "Which team eliminated the USA from the last two World Cups?", a:["Brazil","Cameroon","Argentina"], rightAnswer:"Ghana"}
];
var time = 0;
var intervalId;
var gameStatus = "new";
var questionTime = 7;
var qIndex = 0;
var answerNumber;	
var questionCount = 0 ;	 
var correctAnswerCount = 0;
var wrongAnswerCount = 0 ;
var unansweredCount = 0;
var maxQuestions =6; 
var clicked = false;
var audio = new Audio("https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90");

$(document).ready(function() {

$("#btnNewGame").on("click", function() {
  	  newGame();
});

$("#btnEndGame").on("click", function(e) {
  	e.preventDefault();
  	stop();
  	alert("Game is Ended");
  	//setTimeout(reset, 5000,1,2);
});

$(".rb").on("click", function(e) {
  
  if (!clicked){
  	audio.pause();
  	clicked = true;
	e.preventDefault();
	stop();
  	if ($(this).attr("data-value") === "true"){
  		correctAnswer();
  	}																							
  	else{
  		wrongAnswer($(this).attr("label-index"),answerNumber);  		
    }
   disableRadioBtn(true);
   setTimeout(reset, 5000,$(this).attr("label-index"),answerNumber);
   if (questionCount < maxQuestions) {
	    setTimeout(loadQuestion,5010);
	    setTimeout(run,5010);
  	}
  }
});

function newGame(){

   //if (gameStatus==="new"){
   	   audio.play();
   	   questionCount = 0 ;	 
       correctAnswerCount = 0;
       wrongAnswerCount = 0 ;
       unansweredCount = 0;
   		$("#timeLeft").text("Time Remaining : 00:00");
   		run();
		loadQuestion();
		//gameStatus = "inprogress";
//  	}

}


function loadQuestion(){
	var j = 0;
	$("#question").text(questions[qIndex].q);
	answerNumber = getRandomNumber();
	questionCount++;
	for (i=1; i <5 ; i++){

		$("#a"+ i).attr("checked",false);
		if (i === answerNumber){
			$("#labela"+ answerNumber).text(questions[qIndex].rightAnswer);
			$("#a"+answerNumber).removeClass("hidden");
			$("#a"+answerNumber).attr("data-value","true");
			$("#a"+answerNumber).attr("label-index",answerNumber);
			$("#a"+answerNumber).attr("data-answer",questions[qIndex].rightAnswer);
			//$("#a"+answerNumber).checked = true;
			
		}
		else{
			$("#labela"+ i).text(questions[qIndex].a[j]);
			$("#a" + i).removeClass("hidden");
			$("#a" + i).attr("data-value","false");
			$("#a"+ i).attr("label-index",i);
			$("#a"+ i).attr("data-answer",questions[qIndex].a[j]);
			//$("#a" + i).checked = true;
			j++;
		}
	}
	disableRadioBtn(false);
}

function wrongAnswer(keyWrong, keyRight){
	wrongAnswerCount++;
	$("#diva" + keyWrong).addClass("loose");
  	$("#diva" + keyRight).addClass("win");	
  	$("#labela"+ keyWrong).text( $("#a"+keyWrong).attr("data-answer") + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'Wrong');
  	$("#labela"+ keyRight).text($("#a"+keyRight).attr("data-answer") + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'Correct');

}

function correctAnswer(){
	correctAnswerCount++;
	$("#diva" + answerNumber).addClass("win");
  	$("#labela"+ answerNumber).text( $("#a"+ answerNumber).attr("data-answer") + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'Correct');
}

function timeIsUp(){
	//alert("Time is Up!, See the correct answer after clicking ok");
	//$("#diva" + answerNumber).prepend("<div>Time is Up!</div>");
	stop();
	disableRadioBtn(true);
	unansweredCount++;
	$("#diva" + answerNumber).addClass("win");
  	$("#labela"+ answerNumber).text( $("#a"+ answerNumber).attr("data-answer") + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'Time Is Up!'); // + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +'Thi is the correct answer');
	setTimeout(reset, 5000,0,answerNumber);
	if (questionCount < maxQuestions) {
	    setTimeout(loadQuestion,5010);
	    setTimeout(run,5010);
  	}
}


function displayGameStats(){

	for (i=1; i <5 ; i++){

		$("#a"+ i).empty();
		$("#labela" + i).empty();
		$("#a"+i).addClass("hidden");
	}
	$("#question").text("All Done! Here is how you did : ");
	$("#question").append("<div></div>");
	$("#question").append("<br>");
	$("#question").append("<div>" + "Total Questions : " + maxQuestions + "</div>");
	$("#question").append("<br>");
	$("#question").append("<div>" + "Correct Answers : " + correctAnswerCount + "</div>");
	$("#question").append("<br>");
	$("#question").append("<div>" + "Wrong Answers : " + wrongAnswerCount + "</div>");		
	$("#question").append("<br>");
	$("#question").append("<div>" + "Unanswered : " + unansweredCount + "</div>");
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
	    $("#timeLeft").text("Time Remaining : " + currentTime);
	}
	else{
		gameStatus = "timeisup" ;
		timeIsUp();
	}
 }

function  reset(looseIndx,winIndx) {

    
   	if (qIndex === questions.length-1) {
    	qIndex = 0;
    }
    else{
    	qIndex++;
    }
    clicked = false;
	time = 0;
	$("#diva" + looseIndx).removeClass("loose");
	$("#diva" + winIndx).removeClass("win");
    if (questionCount === maxQuestions) {
    	displayGameStats();
    	gameStatus = 'end';
    }
    else {
      $("#timeLeft").text("00:00");
    }
}

function getRandomNumber() {
   return (Math.floor(Math.random() * 3) + 1)
}


function disableRadioBtn(val){
	$("#a1").attr("disabled",val);
    $("#a2").attr("disabled",val);
    $("#a3").attr("disabled",val);
    $("#a4").attr("disabled",val);
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