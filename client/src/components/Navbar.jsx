import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="fixed w-full z-20 flex justify-between items-center py-3 px-5 bg-gray-600 text-white">
      <div>
        <h3 className="text-3xl font-bold">QuizBox</h3>
      </div>
      <div>
        <button onClick={() => logOut()} className="btn text-base font-bold">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
