import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const Welcome = () => {
    const { user, isAdmin } = useContext(AuthContext);
  return (
    <div className="mt-[72px]">
      <p className="text-3xl font-bold">Welcome Back {user.displayName}!</p>
      {isAdmin || <p className="text-md mt-2 font-semibold">Are you ready to test your skills?</p>}
    </div>
  )
}

export default Welcome
