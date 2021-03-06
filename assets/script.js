var questions = [
    {
      question: "Where is Hogwarts located?",
      choices: ["Alaska", "Italy", "Scotland", "Ireland"],
      answer: "Scotland",
    },
    {
      question:
        "Which Hogwarts house has a badger for a mascot?",
      choices: ["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"],
      answer: "Hufflepuff",
    },
    {
      question: "How many stair cases does Hogwarts have?",
      choices: ["115", "142", "24", "95"],
      answer: "142",
    },
    {
      question: "Platform 9 and 3/4 is located ____.",
      choices: ["King's Cross Station", "Penn Station", "Diagon Alley", "Hogwarts"],
      answer: "King's Cross Station",
    },
    {
      question: "Which is not one of the 3 Unforgivable Curses?", 
      choices: ["Avada Kedavra", "Vetiti Mortem", "Imperio", "Crucio"],
      answer: "Vetiti Mortem",
    }
  ];
  
  var startButton = document.querySelector("#start-button");
  var questionEl = document.querySelector("#question");
  var optionListEl = document.querySelector("#option-list");
  var questionResultEl = document.querySelector("#question-result");
  var questionSection = document.querySelector("#question-section");
  var timerEl = document.querySelector("#timer");
  var quizOverSection = document.querySelector("#quiz-over");
  
  //which question we are looking at
  var questionIndex = 0;
  //track which questions are correct
  var correctCount = 0;
  
  var time = 45;
  var intervalId;
  
function startQuiz() {
  welcome.classList.add("hide");
  // var questionSection = document.querySelector("#question-section");
  questionSection.classList.remove("hide");

  renderQuestion();
}
// Adds elements after quiz ends
  function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.classList.add("end-game");
    body.innerHTML = "Quiz over, You scored " + correctCount;

    var initialsEl = document.createElement("form");
    initialsEl.textContent = "Insert Initials";
    initialsEl.className = "player-initials";
    initialsEl.innerHTML = "<input>"; 
    body.appendChild(initialsEl);

    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "Submit Score";
    submitButtonEl.className = "submit-btn";
    submitButtonEl.innerHTML = "<button>";
    body.appendChild(submitButtonEl);

    gameScores();
  }
  
  function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }
  
  function renderQuestion() {
    
    if (time == 0) {
      updateTime();
      return;
    }
  
    intervalId = setInterval(updateTime, 1000);
    
    questionEl.textContent = questions[questionIndex].question;
  //As move from question to question clears out the previous choices. Set to empty string
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";
  
    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;
  
    for (var i = 0; i < choicesLenth; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.textContent = choices[i];
      optionListEl.append(questionListItem);
    }
  }
  
  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      time = 0;
    }
    renderQuestion();
  }
  
  function checkAnswer(event) {
    clearInterval(intervalId);
    //check to see if the answer is correct
    if (event.target.matches("li")) {
      var answer = event.target.textContent;
      if (answer === questions[questionIndex].answer) {
        questionResultEl.textContent = "Correct";
        correctCount++;
      } else {
        questionResultEl.textContent = "Incorrect";
        time = time - 2;
        timerEl.textContent = time;
      }
    }
    setTimeout(nextQuestion, 1500);
  }
  var gameScores = function() {
    localStorage.setItem('allScores', JSON.stringify(correctCount));
    JSON.parse(localStorage.getItem('allScores'));
    console.log(gameScores);
  
    var initials = ""
    var score = 5
  
    var allScores =[];
  
    var newScore = {
      'initials': initials,
      'score': score
    }
  
    allScores.push(newScore)
  }
  
  //renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
startButton.addEventListener("click", startQuiz);
submitButtonEl.addEventListener("click",gameScores);



