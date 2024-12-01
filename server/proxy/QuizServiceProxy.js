const QuizService = require("../services/QuizService");

class QuizServiceProxy {
  constructor(user, db) {
    this.user = user;
    this.quizService = new QuizService(db);
  }

  async createQuiz(quiz) {
    if (this.user !== "admin") {
      throw new Error("Access denied. Only admins can create quizzes.");
    }
    return await this.quizService.createQuiz(quiz);
  }

  async updateQuiz(quizId, updatedData) {
    if (this.user !== "admin") {
      throw new Error("Access denied. Only admins can update quizzes.");
    }
    return await this.quizService.updateQuiz(quizId, updatedData);
  }

  async deleteQuiz(quizId) {
    if (this.user !== "admin") {
      throw new Error("Access denied. Only admins can delete quizzes.");
    }
    return await this.quizService.deleteQuiz(quizId);
  }

  async getQuizzes() {
    return await this.quizService.getQuizzes();
  }
}

module.exports = QuizServiceProxy;
