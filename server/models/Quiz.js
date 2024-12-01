class Quiz {
  constructor(questions) {
    this.questions = questions; // Array of question objects
  }

  getDetails() {
    return {
      questions: this.questions,
    };
  }
}

module.exports = Quiz;
