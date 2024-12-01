const QuizDecorator = require("./QuizDecorator");

class SujectFilter extends QuizDecorator {
  constructor(quiz, subject) {
    super(quiz);
    this.subject = subject;
  }

  getDetails() {
    const quizDetails = super.getDetails();
    quizDetails.subject = this.subject;
    quizDetails.questions = quizDetails.questions.filter(
      (question) => question.subject === this.subject
    );
    return quizDetails;
  }

  grade(answers, gradingStrategy) {
    return gradingStrategy.grade(this.getDetails(), answers);
  }
}

module.exports = SujectFilter;
