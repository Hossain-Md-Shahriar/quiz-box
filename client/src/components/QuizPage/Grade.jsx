const Grade = ({ grade, reward }) => {
  return (
    <div className="m-20 mt-36 mx-52 border-2 px-12 py-20 rounded-xl shadow-xl bg-green-600/15 border-black/25 text-center text-2xl font-semibold space-y-4">
      <h1>Your Grade is {grade}</h1>
      <h1>🔥You Got {reward} Reward Points🔥</h1>
    </div>
  );
};

export default Grade;
