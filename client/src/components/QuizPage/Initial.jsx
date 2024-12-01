const Initial = ({
  timeLimit,
  setTimeLimit,
  subject,
  setSubject,
  difficulty,
  setDifficulty,
  gradingStrategy,
  handleStrategyChange,
  startQuiz,
}) => {
  return (
    <div className="m-20 mt-36 mx-52 border-2 px-12 py-20 rounded-xl shadow-xl bg-blue-600/15 border-black/25">
      <div className="grid grid-cols-2 gap-x-10 gap-y-10">
        <div className="flex items-center gap-2">
          <label>Time Limit: </label>
          <select
            value={timeLimit}
            onChange={(e) => setTimeLimit(parseInt(e.target.value))}
            className="border p-2 rounded-md flex-1"
          >
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label>Subject: </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded-md flex-1"
          >
            <option value="math">Math</option>
            <option value="english">English</option>
            <option value="computer-science">Computer Science</option>
            <option value="general-knowledge">General Knowledge</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label>Difficulty: </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-2 rounded-md flex-1"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label>Select Grading Strategy: </label>
          <select
            value={gradingStrategy}
            onChange={handleStrategyChange}
            className="border p-2 rounded-md flex-1"
          >
            <option value="percentage">Percentage</option>
            <option value="passfail">Pass/Fail</option>
          </select>
        </div>
      </div>

      <div onClick={startQuiz} className="mt-10 flex justify-center">
        <button className="btn border-none px-8 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-base leading-5 transition-colors duration-200 transform rounded-md">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Initial;
