const express = require("express");
const cors = require("cors");
const Database = require("./db/Database");
const Quiz = require("./models/Quiz");
const TimeLimitDecorator = require("./decorators/TimeLimitDecorator");
// const RandomizeQuestionsDecorator = require("./decorators/RandomizeQuestionsDecorator");
const PercentageGradingStrategy = require("./strategies/PercentageGradingStrategy");
const PassFailGradingStrategy = require("./strategies/PassFailGradingStrategy");
const QuizServiceProxy = require("./proxy/QuizServiceProxy");
const QuestionFactory = require("./factories/QuestionFactory");
const SujectFilter = require("./decorators/SubjectFilter");
const DifficultyFilter = require("./decorators/DifficultyFilter");
const { ObjectId } = require("mongodb");
const LeaderboardService = require("./observer/LeaderboardService");

const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(cors());

const dbInstance = Database.getInstance();

const DB_URL = "mongodb://localhost:27017";
const DB_NAME = "practice";

// Dummy quiz data
// const quizData = new Quiz("General Knowledge Quiz", [
//   { id: 1, question: "What is the capital of France?", answer: "Paris" },
//   { id: 2, question: "What is 2 + 2?", answer: "4" },
//   { id: 3, question: "What is the color of the sky?", answer: "Blue" },
// ]);

var quizData;
var quiz;

// Connect to the database
(async () => {
  try {
    const db = await dbInstance.connect(DB_URL, DB_NAME);

    const userCollection = db.collection("users");
    const quizzesCollection = db.collection("quizzes");

    app.get("/all-quiz", async (req, res) => {
      const result = await quizzesCollection
        .find()
        .project({
          _id: 1,
          subject: 1,
          difficulty: 1,
          question: 1,
          options: 1,
          answer: 1,
        })
        .toArray();
      quizData = new Quiz(result);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin, user });
    });

    app.get("/students", async (req, res) => {
      let result = await userCollection.find().toArray();
      if (result) {
        result = result.filter((user) => user?.role !== "admin");
      }
      res.send(result);
    });

    // quiz related API
    app.post("/api/quizzes", async (req, res) => {
      const { type, client, quiz } = req.body;
      const proxy = new QuizServiceProxy(client, db);

      try {
        console.log("hi");
        const question = QuestionFactory.createQuestion(type, quiz);
        console.log(question);
        const result = await proxy.createQuiz(question);
        res.send(result);
      } catch (error) {
        res.status(403).send({ success: false, message: error.message });
      }
    });

    //update
    app.put("/api/quizzes/:id", async (req, res) => {
      const client = req.body.client;
      const quiz = req.body.quiz;
      const proxy = new QuizServiceProxy(client, db);
      const quizId = req.params.id;

      try {
        const result = await proxy.updateQuiz(quizId, quiz);
        res.send(result);
      } catch (error) {
        res.status(403).send({ success: false, message: error.message });
      }
    });

    // delete
    app.post("/api/quizzes/:id", async (req, res) => {
      const client = req.body.client;
      console.log(client);
      const proxy = new QuizServiceProxy(client, db);
      const quizId = req.params.id;

      try {
        const result = await proxy.deleteQuiz(quizId);
        res.send(result);
      } catch (error) {
        res.status(403).send({ success: false, message: error.message });
      }
    });

    app.get("/api/quizzes", async (req, res) => {
      const client = req.body.client;
      const proxy = new QuizServiceProxy(client, db);

      try {
        const quizzes = await proxy.getQuizzes();
        res.send(quizzes);
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    // get single document by id
    app.get("/api/quizzes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await quizzesCollection.findOne(query);
      res.send(result);
    });

    // Define the API route directly in server.js
    app.post("/api/quiz/start", async (req, res) => {
      const { timeLimit, subject, difficulty } = req.body;

      // Apply decorators (e.g., add time limit and randomize questions)
      quiz = new TimeLimitDecorator(quizData, timeLimit * 60); // Time limit of 30 minutes
      quiz = new SujectFilter(quiz, subject);
      quiz = new DifficultyFilter(quiz, difficulty);
      //   quiz = new RandomizeQuestionsDecorator(quiz); // We will use other decorator later: difficulty, category, time extension, hint, leaderboard
      console.log(quiz.getDetails());
      res.send(quiz.getDetails());
    });

    // Define the API route for grading quizzes
    app.post("/api/quiz/:id/grade", (req, res) => {
      const answers = req.body.answers; // User answers
      const gradingStrategyName = req.body.gradingStrategy; // Grading strategy from frontend (e.g., 'percentage', 'passfail', 'custom')

      // Select grading strategy based on user input
      let gradingStrategy;
      switch (gradingStrategyName) {
        case "percentage":
          gradingStrategy = new PercentageGradingStrategy();
          break;
        case "passfail":
          gradingStrategy = new PassFailGradingStrategy();
          break;
        default:
          return res.status(400).send({ message: "Invalid grading strategy" });
      }

      // Grade the quiz using the selected strategy
      console.log(quiz);
      console.log(typeof quiz.grade);
      const grade = quiz.grade(answers, gradingStrategy);
      res.send({ grade });
    });

    // Initialize leaderboard service with the database
    const leaderboardService = new LeaderboardService(db);

    // API to update leaderboard after a quiz
    app.post("/api/complete-quiz", async (req, res) => {
      const { email, reward } = req.body;

      try {
        const rewardUpdates = { [email]: reward }; // Reward changes for this quiz
        await leaderboardService.updateLeaderboard(rewardUpdates);
        console.log(rewardUpdates);
        res.send({
          success: true,
          message: "Leaderboard updated!",
        });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // API to fetch the leaderboard
    app.get("/api/leaderboard", async (req, res) => {
      try {
        const leaderboard = await leaderboardService.getLeaderboard();
        res.send(leaderboard);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
})();

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
