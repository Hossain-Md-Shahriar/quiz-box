const QuizDecorator = require("./QuizDecorator");

class DifficultyFilter extends QuizDecorator {
  constructor(quiz, difficulty) {
    super(quiz);
    this.difficulty = difficulty;
  }

  getDetails() {
    const quizDetails = super.getDetails();
    quizDetails.difficulty = this.difficulty;
    quizDetails.questions = quizDetails.questions.filter(
      (question) => question.difficulty === this.difficulty
    );
    return quizDetails;
  }

  grade(answers, gradingStrategy) {
    return gradingStrategy.grade(this.getDetails(), answers);
  }
}

module.exports = DifficultyFilter;
