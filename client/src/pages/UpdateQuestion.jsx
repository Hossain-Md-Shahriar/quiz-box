import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const UpdateQuestion = () => {
  const { isAdmin } = useContext(AuthContext);
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/${id}`)
      .then((response) => setQuestion(response.data));
  }, []);

  const handleSubmitForMultipeChoice = async (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const difficulty = form.difficulty.value;
    const question = form.question.value;
    const answer = form.answer.value;
    const options = [
      form.option1.value,
      form.option2.value,
      form.option3.value,
      form.option4.value,
    ];
    const quiz = {
      type: question.type,
      subject,
      difficulty,
      question,
      answer,
      options,
    };

    try {
      const client = isAdmin ? "admin" : "student";
      const { data } = await axios.put(
        `http://localhost:5000/api/quizzes/${id}`,
        {
          client,
          quiz,
        }
      );
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitForTrueFalse = async (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const difficulty = form.difficulty.value;
    const question = form.question.value;
    const answer = form.answer.value;
    const options = ["True", "False"];
    const quiz = {
      type: question.type,
      subject,
      difficulty,
      question,
      answer,
      options,
    };

    try {
      const client = isAdmin ? "admin" : "student";
      const { data } = await axios.put(`http://localhost:5000/api/quizzes/${id}`, {
        client,
        quiz,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {question?.type === "multiple-choice" ? (
        <div className="py-20 max-w-2xl mx-auto px-4">
          <div className="rounded-lg shadow-lg overflow-hidden border border-black/20">
            <section className="p-6">
              <h2 className="text-2xl font-bold py-1">Update Question</h2>

              <form onSubmit={handleSubmitForMultipeChoice}>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700 " htmlFor="subject">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="border p-2 rounded-md"
                      defaultValue={question.subject}
                    >
                      <option value="math">Math</option>
                      <option value="english">English</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="general-knowledge">
                        General Knowledge
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700 " htmlFor="difficulty">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      className="border p-2 rounded-md"
                      defaultValue={question.difficulty}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="question">
                      Question
                    </label>
                    <input
                      id="question"
                      name="question"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      defaultValue={question.question}
                    />
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="answer">
                      Answer
                    </label>
                    <input
                      id="answer"
                      name="answer"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      defaultValue={question.answer}
                    />
                  </div>

                  {question.options.map((option, index) => (
                    <div key={index}>
                      <label className="text-gray-700" htmlFor="option1">
                        Option {index + 1}
                      </label>
                      <input
                        id={`option${index + 1}`}
                        name={`option${index + 1}`}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        defaultValue={option}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button className="btn px-8 w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-base leading-5 transition-colors duration-200 transform rounded-md">
                    Update Question
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      ) : (
        <div className=" py-20 max-w-2xl mx-auto px-4">
          <div className="rounded-lg shadow-lg overflow-hidden border border-black/20">
            <section className="p-6">
              <h2 className="text-2xl font-bold py-1">Add New Question</h2>

              <form onSubmit={handleSubmitForTrueFalse}>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700 " htmlFor="subject">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="border p-2 rounded-md"
                      defaultValue={question.subject}
                    >
                      <option value="math">Math</option>
                      <option value="english">English</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="general-knowledge">
                        General Knowledge
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700 " htmlFor="difficulty">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      className="border p-2 rounded-md"
                      defaultValue={question.difficulty}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="question">
                      Question
                    </label>
                    <input
                      id="question"
                      name="question"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      defaultValue={question.question}
                    />
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <label className="text-gray-700 " htmlFor="answer">
                      Answer
                    </label>
                    <select
                      id="answer"
                      name="answer"
                      className="border p-2 rounded-md"
                      defaultValue={question.answer}
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="btn px-8 w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-base leading-5 transition-colors duration-200 transform rounded-md">
                    Update Question
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateQuestion;
