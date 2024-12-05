import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const Welcome = () => {
    const { user, isAdmin } = useContext(AuthContext);
  return (
    <div className="mt-[72px] text-center">
      <p className="text-5xl pt-10 mb-8 font-bold">Welcome Back {user.displayName}!</p>
      {isAdmin || <p className="text-xl mt-2 font-semibold">Are you ready to test your skills?</p>}
    </div>
  )
}

export default Welcome
