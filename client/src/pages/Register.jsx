import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const Register = () => {
  const { updateUserProfile, createUser, user, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name);
      setUser({ ...result?.user, displayName: name });

      const { data } = await axios.post("http://localhost:5000/users", {
        name,
        email,
        role: "student",
        reward: 0,
      });
      console.log(data);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="md:w-1/2 lg:w-1/4 mx-auto mt-32 shadow-lg px-5 py-8 rounded-xl border-2 border-[#3282b857]">
        <h2 className="text-2xl font-medium mb-8 text-center">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="form-control mb-2">
            <label className="label">
              <span className="">Name</span>
            </label>
            <input
              type="name"
              placeholder="name"
              name="name"
              className="input input-bordered"
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
        <p className="text-center pt-3 border-t mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#3282B8] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
