class MultipleChoiceQuestion {
  constructor({ subject, difficulty, question, answer, options }) {
    this.type = "multiple-choice";
    this.subject = subject;
    this.difficulty = difficulty;
    this.question = question;
    this.answer = answer;
    this.options = options;
  }
}

module.exports = MultipleChoiceQuestion;
