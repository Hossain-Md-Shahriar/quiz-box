const Quiz = require("../models/Quiz");

class QuizDecorator {
  constructor(quiz) {
    this.quiz = quiz;
  }

  getDetails() {
    return this.quiz.getDetails();
  }

  grade(answers, gradingStrategy) {
    return gradingStrategy.grade(this.getDetails(), answers);
  }
}

module.exports = QuizDecorator;
