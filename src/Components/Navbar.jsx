import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, LogoutUser } = useContext(AuthContext);
  return (
    <div className="w-full bg-sky-400">
      <div className="navbar  w-full max-w-5xl mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl text-white">
            Task Management
          </a>
        </div>
        {user && user?.email && (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://img.freepik.com/premium-vector/young-smiling-man-3d-avatar-happy-guy_165429-1393.jpg?size=626&ext=jpg&ga=GA1.2.1249170093.1682334450&semt=sph" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm h-fit dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <span>{user.email}</span>
                </li>
                <li>
                  <Link to="/mytask" className="justify-between">
                    My Task
                  </Link>
                </li>
                <li>
                  <Link to="/addtask" className="justify-between">
                    Add Task
                  </Link>
                </li>
                <li></li>
              </ul>
            </div>
            <button
              className="px-4 py-2  text-white  bg-transparent border-white"
              onClick={LogoutUser}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
