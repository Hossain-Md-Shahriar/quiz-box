const { ObjectId } = require("mongodb");

class QuizService {
  constructor(db) {
    this.collection = db.collection("quizzes");
  }

  async createQuiz(quiz) {
    const result = await this.collection.insertOne(quiz);
    return result;
  }

  async updateQuiz(quizId, updatedData) {
    const filter = { _id: new ObjectId(quizId) };
    const result = await this.collection.updateOne(filter, {
      $set: updatedData,
    });
    return result;
  }

  async deleteQuiz(quizId) {
    const query = { _id: new ObjectId(quizId) };
    const result = await this.collection.deleteOne(query);
    return result;
  }

  async getQuizzes() {
    const result = await this.collection.find().toArray();
    return result;
  }
}

module.exports = QuizService;
