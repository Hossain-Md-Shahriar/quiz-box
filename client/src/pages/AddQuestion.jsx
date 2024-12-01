import { Link } from "react-router-dom";

const AddQuestion = () => {

  return (
    <div className=" py-32 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-10">What is the Question Type?</h2>
      <div className="flex justify-around">
        <Link className="btn px-8 w-1/3 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-base leading-5 transition-colors duration-200 transform rounded-md" to="/multiple-choice">Multiple Choice</Link>
        <Link className="btn px-8 w-1/3 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-base leading-5 transition-colors duration-200 transform rounded-md" to="/true-false">True False</Link>
      </div>
    </div>
  );
};

export default AddQuestion;
