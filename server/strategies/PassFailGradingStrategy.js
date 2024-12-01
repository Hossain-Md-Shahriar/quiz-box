const GradingStrategy = require("./GradingStrategy");

class PassFailGradingStrategy extends GradingStrategy {
  grade(quiz, answers) {
    const correctAnswers = answers.filter(
      (answer, index) => answer === quiz.questions[index].answer
    ).length;
    const passThreshold = quiz.questions.length * 0.6; // Pass if 60% correct
    return correctAnswers >= passThreshold ? "Pass" : "Fail";
  }
}

module.exports = PassFailGradingStrategy;
