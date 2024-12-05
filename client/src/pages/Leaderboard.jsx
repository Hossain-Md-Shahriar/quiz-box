import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Leaderboard = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leaderboard")
      .then((response) => setStudents(response.data));
  }, []);

  return (
    <div className="mt-[72px]">
      <h2 className="text-center text-4xl font-bold mb-9">
        LEADERBOARD
      </h2>
      <div className="px-28 overflow-x-auto">
        <table className="table border-2">
          {/* head */}
          <thead>
            <tr className="text-base text-black bg-blue-400">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr className={`hover text-base ${user?.email === student.email && "bg-red-300 font-semibold"}`} key={index}>
                <th>{index + 1}</th>
                <td>{student?.name}</td>
                <td>{student.email}</td>
                <td>{student.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
