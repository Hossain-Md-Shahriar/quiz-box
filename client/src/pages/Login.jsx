import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signIn, user, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    try {
      const { data } = await axios.get(`http://localhost:5000/users?email=${email}`);
      console.log(data.admin);
      setIsAdmin(data.admin);

      const result = await signIn(email, password);
      console.log(result?.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="md:w-1/2 lg:w-1/4 mx-auto mt-32 shadow-lg px-5 py-8 rounded-xl border-2 border-[#3282b857]">
        <h2 className="text-2xl font-medium mb-8 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="form-control mb-2">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-7">
            <button className="btn btn-neutral bg-[#0F4C75] hover:bg-[#0a3049] text-white">
              Login
            </button>
          </div>
        </form>
        <p className="text-center pt-3 border-t mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#3282B8] font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
