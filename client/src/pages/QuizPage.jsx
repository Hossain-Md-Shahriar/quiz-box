import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Initial from "../components/QuizPage/Initial";
import { AuthContext } from "../providers/AuthProvider";
import Grade from "../components/QuizPage/Grade";

function QuizPage() {
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [gradingStrategy, setGradingStrategy] = useState("percentage"); // Default grading strategy
  const [timeLimit, setTimeLimit] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [subject, setSubject] = useState("math");
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [grade, setGrade] = useState("");
  const [reward, setReward] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-quiz")
      .then((response) => console.log(response.data));
  }, []);

  // Fetch quiz data from the backend
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/api/quiz/1") // Get quiz from backend
  //       .then((response) => {
  //         setQuiz(response.data);
  //       })
  //       .catch((error) => {
  //         setError("Failed to fetch quiz", error);
  //       });
  //   }, []);

  const startQuiz = () => {
    axios
      .post("http://localhost:5000/api/quiz/start", {
        timeLimit,
        subject,
        difficulty,
      })
      .then((response) => {
        setQuiz(response.data);
        setTimeLeft(response.data.timeLimit);
        setTimerStarted(true);
      })
      .catch((error) => console.error("Error starting the quiz:", error));
  };

  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && timerStarted) {
      handleSubmit();
      setTimerStarted(false);
    }
  }, [timeLeft, timerStarted]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSubmit = () => {
    console.log(answers);
    axios
      .post("http://localhost:5000/api/quiz/1/grade", {
        answers: answers,
        gradingStrategy: gradingStrategy,
      })
      .then((response) => {
        setGrade(response.data.grade);
      })
      .catch((error) => {
        console.error("Error grading quiz:", error);
      });

    // reward calculation
    const correctAnswers = answers.filter(
      (answer, index) => answer === quiz.questions[index].answer
    ).length;
    console.log(correctAnswers);

    if (difficulty === "easy" && timeLimit === 5) {
      setReward(correctAnswers * 4);
    } else if (difficulty === "easy" && timeLimit === 10) {
      setReward(correctAnswers * 3);
    } else if (difficulty === "easy" && timeLimit === 15) {
      setReward(correctAnswers * 2);
    } else if (difficulty === "medium" && timeLimit === 5) {
      setReward(correctAnswers * 6);
    } else if (difficulty === "medium" && timeLimit === 10) {
      setReward(correctAnswers * 5);
    } else if (difficulty === "medium" && timeLimit === 15) {
      setReward(correctAnswers * 4);
    } else if (difficulty === "hard" && timeLimit === 5) {
      setReward(correctAnswers * 8);
    } else if (difficulty === "hard" && timeLimit === 10) {
      setReward(correctAnswers * 7);
    } else {
      setReward(correctAnswers * 6);
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/complete-quiz", {
        email: user?.email,
        reward: reward,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error grading quiz:", error);
      });
  }, [user, reward]);

  const handleStrategyChange = (event) => {
    setGradingStrategy(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedAnswer("");
  };

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
    console.log(currentQuestionIndex);
  };

  return (
    <div className="mt-[72px]">
      {!grade ? (
        <div>
          {!quiz ? (
            <Initial
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              subject={subject}
              setSubject={setSubject}
              timeLimit={timeLimit}
              setTimeLimit={setTimeLimit}
              startQuiz={startQuiz}
              gradingStrategy={gradingStrategy}
              handleStrategyChange={handleStrategyChange}
            />
          ) : (
            <div className="m-20 mt-36 border-2 p-12 rounded-xl shadow-xl bg-blue-600/15 border-black/25">
              <p className="text-end text-lg font-medium text-green-700">
                {formatTime(timeLeft)}
              </p>

              <div className="py-6">
                <p className="pb-6 text-2xl font-semibold">
                  {quiz.questions[currentQuestionIndex]?.question}
                </p>
                <div className="grid grid-cols-2 gap-5">
                  {quiz.questions[currentQuestionIndex]?.options.map(
                    (option, index) => (
                      <label
                        key={index}
                        className={`flex items-center space-x-3 p-3 border border-teal-400 rounded-md ${
                          selectedAnswer === option ? "bg-teal-300" : "bg-white"
                        } hover:bg-teal-300 cursor-pointer`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={handleChange}
                          className="w-3 h-3 appearance-none border-2 border-gray-500 rounded-full checked:bg-teal-700"
                        />
                        <span className="font-medium">{option}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="btn btn-primary disabled:btn-outline text-base"
                    disabled={!selectedAnswer}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary disabled:btn-outline text-base"
                    disabled={!selectedAnswer}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Grade grade={grade} reward={reward} />
      )}
    </div>
  );
}

export default QuizPage;
