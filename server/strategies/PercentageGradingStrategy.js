const GradingStrategy = require("./GradingStrategy");

class PercentageGradingStrategy extends GradingStrategy {
  grade(quiz, answers) {
    const correctAnswers = answers.filter(
      (answer, index) => answer === quiz.questions[index].answer
    ).length;
    console.log(correctAnswers);
    console.log(quiz);
    const percentage = (correctAnswers / quiz.questions.length) * 100;
    return `${percentage}%`;
  }
}

module.exports = PercentageGradingStrategy;
