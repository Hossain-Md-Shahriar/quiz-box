import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [student, setStudent] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users?email=${user?.email}`)
      .then((response) => setStudent(response.data.user));
  }, []);
  return (
    <div className="mt-[72px] bg-slate-200 shadow-xl rounded-lg border-2 h-[550px] p-16 ">
      <div className="flex justify-between">
        <div className="space-y-4 text-3xl font-bold">
          <FaUserCircle className="text-9xl" />
          <h2>Name: {student.name}</h2>
          <h2>Email: {student.email}</h2>
        </div>
        <div>
          <div className="flex items-center gap-3 text-2xl bg-amber-500 text-white border-2 border-amber-600 p-3 rounded-md font-bold">
            <div>
              <BsCoin className="text-yellow-200" />
            </div>
            <h2>{student.reward} points</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
