(function() {
  const myQuestions = [
    {
      question: "か",
      answers: {
        a: "So",
        b: "To",
        c: "Ka",
        d: "Wa"
      },
      correctAnswer: "c"
    },
    {
      question: "う",
      answers: {
        a: "U",
        b: "Ru",
        c: "Ko",
        d: "Ku"
      },
      correctAnswer: "a"
    },
    {
      question: "ふ",
      answers: {
        a: "Ku",
        b: "U",
        c: "He",
        d: "(fu)"
      },
      correctAnswer: "d"
    },
    {
      question: "ね",
      answers: {
        a: "Sa",
        b: "E",
        c: "Se",
        d: "Ne"
      },
      correctAnswer: "d"
    },
    {
      question: " え",
      answers: {
        a: "I",
        b: "E",
        c: "Ne",
        d: "Me"
      },
      correctAnswer: "b"
    },
    {
      question: " Ke",
      answers: {
        a: "け",
        b: "こ",
        c: "け",
        d: "く"
      },
      correctAnswer: "c"
    },
    {
      question: " A",
      answers: {
        a: "あ",
        b: "お",
        c: "え",
        d: "う"
      },
      correctAnswer: "a"
    },
    {
      question: "Wa",
      answers: {
        a: "ラ",
        b: "わ",
        c: "き",
        d: "う"
      },
      correctAnswer: "b"
    },
    {
      question: "Ya",
      answers: {
        a: "や",
        b: "ま",
        c: "つ",
        d: "ほ"
      },
      correctAnswer: "a"
    },
    {
      question: "So",
      answers: {
        a: "き",
        b: "も",
        c: "ぬ",
        d: "そ"
      },
      correctAnswer: "d"
    }
  ];

  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();