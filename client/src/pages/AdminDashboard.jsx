import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/all-quiz").then((response) => {
      const res = response.data;
      const totalMath = res.filter((item) => item.subject === "math").length;
      const totalEnglish = res.filter(
        (item) => item.subject === "english"
      ).length;
      const totalGK = res.filter(
        (item) => item.subject === "general-knowledge"
      ).length;
      const totalCS = res.filter(
        (item) => item.subject === "computer-science"
      ).length;
      const chartData = [
        {
          subject: "Math",
          total: totalMath,
        },
        {
          subject: "English",
          total: totalEnglish,
        },
        {
          subject: "General Knowledge",
          total: totalGK,
        },
        {
          subject: "Computer Science",
          total: totalCS,
        },
      ];
      setData(chartData);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  return (
    <div className="mt-[72px] flex gap-14">
      <div>
        <h3 className="mb-2 ml-16 font-semibold text-lg">
          Total Questions per Subject
        </h3>
        <BarChart
          width={680}
          height={450}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="w-full">
        <h3 className="mb-2 font-semibold text-lg">All Registered Students</h3>
        <div className="h-96 border-2 rounded-lg overflow-x-auto overflow-y-scroll">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-sm">
                <th></th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr className="hover" key={index}>
                  <th>{index + 1}</th>
                  <td>{student?.name}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
