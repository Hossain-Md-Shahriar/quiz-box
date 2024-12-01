import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import QuizPage from "../pages/QuizPage";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import Welcome from "../pages/Welcome";
import AddQuestion from "../pages/AddQuestion";
import MultipleChoice from "../pages/MultipleChoice";
import TrueFalse from "../pages/TrueFalse";
import ManageQuestions from "../pages/ManageQuestions";
import UpdateQuestion from "../pages/UpdateQuestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        ),
      },
      {
        path: "/student-dashboard",
        element: (
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/quiz",
        element: (
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-question",
        element: (
          <PrivateRoute>
            <AddQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: "/multiple-choice",
        element: (
          <PrivateRoute>
            <MultipleChoice />
          </PrivateRoute>
        ),
      },
      {
        path: "/true-false",
        element: (
          <PrivateRoute>
            <TrueFalse />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-questions",
        element: (
          <PrivateRoute>
            <ManageQuestions />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
