import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiPencilBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AuthContext } from "../providers/AuthProvider";

const ManageQuestions = () => {
  const { isAdmin } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/quizzes");
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const client = isAdmin ? "admin" : "student";
      const { data } = await axios.post(
        `http://localhost:5000/api/quizzes/${id}`,
        { client }
      );
      console.log(data);
      getQuestions();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-[72px]">
      <h3 className="mb-4 font-semibold text-lg">
        All Questions: {questions.length}
      </h3>
      <div className="border rounded-xl overflow-hidden">
        <table className="table">
          <thead>
            <tr className="text-sm bg-slate-200">
              <th></th>
              <th>Subject</th>
              <th>Difficulty</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{question.subject}</td>
                <td>{question.difficulty}</td>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td className="flex justify-center gap-9 text-2xl">
                  <Link
                    to={`/update/${question._id}`}
                    className="text-gray-600 hover:text-green-400"
                    title="Update"
                  >
                    <PiPencilBold />
                  </Link>
                  <button
                    onClick={() => deleteHandler(question._id)}
                    className="text-gray-600 hover:text-red-400"
                    title="Delete"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQuestions;
