var quiz = [
  {
    "question": "Where was I born?",
    "choices": [
      "New York, NY",
      "Pheonix, AZ",
      "Seoul, Korea",
      "Los Angeles, CA"
    ],
    "correct":  "New York, NY"
  },
  {
    "question": "What is my favorite movie?",
    "choices": [
      "The Godfather II",
      "Boyz In Da Hood",
      "The Shawshank Redemption",
      "Titanic"
    ],
    "correct":  "The Godfather II"
  },
  {
    "question": "Which language classes have I not taken?",
    "choices": [
      "Spanish",
      "Italian",
      "Hindi",
      "French"
    ],
    "correct": "French"
  },
  {
    "question": "What is my favorite drink?",
    "choices": [
      "Gin & Tonic",
      "Hot Cocoa",
      "Arnold Palmer",
      "Hot Toddy"
    ],
    "correct": "Arnold Palmer"
  }
];

var currentQuestion = 0,
    askingQuestion = true,
    $start = $("#start"),
    $section = $("section"),
    $choices = $('#choices'),
    $question = $("#question"),
    $submit = $("#submit"),
    score = 0;

$start.on('click', loadQuestions);
$submit.hide();
$submit.on('click', checkAnswer);

function loadQuestions() {
  $start.fadeOut();
  $section.fadeIn();
  $submit.show();

  var radioButton;

  $section.append($submit);

  $question.text(quiz[currentQuestion].question);

  // loop through choices and create radio buttons

  for (var i = 0; i < quiz[currentQuestion].choices.length; i++) {
    console.log(i + ") "+ quiz[currentQuestion].choices[i]);

    // create li tag to hold label and radio
    var li = document.createElement('li');
    $choices.append(li);

    radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'quiz';
    radioButton.id = 'choice' + (i+1);
    radioButton.value = quiz[currentQuestion].choices[i];

    // create label tag that holds the text of the choices
    var label = document.createElement('label');
    label.setAttribute('for', 'choice' + (i + 1));
    label.innerHTML = quiz[currentQuestion].choices[i];

    // insert radio button and label in li tag
    $(li).append(radioButton).append(label);

  }

}

function checkAnswer() {

  // are we asking a question, or moving on to the next?
  if(askingQuestion) {

    // change button to read next question
    $submit.text("Next Question");
    askingQuestion = false;

    // determine which radio button they clicked
    var userPick;
    var correctIndex;
    var $radios = $("input[type='radio']");
    for (var i = 0; i < $radios.length; i++) {
      if ($radios[i].checked) { // if this radio button is checked
        userPick = $radios[i].value;
      }  // get index of the correct answer
      if ($radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // Let user know if they got it right or wrong

    // When the answer is correct
    if (userPick == quiz[currentQuestion].correct) {
      $('li').eq(correctIndex).css({
        'font-weight': 'bold',
        'color': 'black'
      });
      $question.text('Correct!');
      score++;
    } else { // When the answer is wrong
      $('li').eq(correctIndex).css('color', 'red');
      $question.text("Womp womp. You don't know me");
    }
    console.log("score: "+score);
  } else { // reset form and move onto next question

    // setting up so user can ask next question
    askingQuestion = true;
    $submit.text("Submit Answer");

    // if we're not on the last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      $('#choices').empty();
      loadQuestions();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  $question.text('Final Score:');
        console.log(score);
  // Final Score:
  $('<p>'+score+' out of '+ quiz[currentQuestion].choices.length +'</p>').insertAfter('#question');

  $('#choices').hide();
  $submit.hide();
}