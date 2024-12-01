const MultipleChoiceQuestion = require("../models/MultipleChoiceQuestion");
const TrueFalseQuestion = require("../models/TrueFalseQuestion");

class QuestionFactory {
  static createQuestion(type, data) {
    switch (type) {
      case "multiple-choice":
        return new MultipleChoiceQuestion(data);
      case "true-false":
        return new TrueFalseQuestion(data);
      default:
        throw new Error("Invalid question type");
    }
  }
}

module.exports = QuestionFactory;
