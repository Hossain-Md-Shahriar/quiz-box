class TrueFalseQuestion {
  constructor({ subject, difficulty, question, answer, options }) {
    this.type = "true-false";
    this.subject = subject;
    this.difficulty = difficulty;
    this.question = question;
    this.answer = answer;
    this.options = options;
  }
}

module.exports = TrueFalseQuestion;
