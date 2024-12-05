import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import {
  MdBook,
  MdCalendarMonth,
  MdEmail,
  MdHome,
  MdList,
  MdMenuBook,
  MdOutlineShoppingCart,
  MdPeople,
  MdReviews,
} from "react-icons/md";
import { FaUtensils } from "react-icons/fa6";
import Navbar from "../components/Navbar";

const Main = () => {
  const { isAdmin, user } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          {/* dashboard sidebar */}
          <div className="fixed top-0 left-0 w-64 p-2 pt-6 h-screen bg-gray-700 text-white overflow-y-auto">
            <ul className="mt-20 menu space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink to="/admin-dashboard">
                      <MdHome /> Admin Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-question">
                      <FaUtensils /> Add Question
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage-questions">
                      <MdList /> Manage Questions
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/student-dashboard">
                      <MdHome /> Student Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/quiz">
                      <MdCalendarMonth /> Take a Quiz
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/leaderboard">
                      <MdCalendarMonth /> Leaderboard
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* dashboard content */}
          <div className="ml-64 p-10">
            <Outlet />
          </div>
        </div>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Main;
