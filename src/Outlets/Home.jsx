import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const HandleLogin = () => {
    googleLogin().then((result) => {
      return navigate("/mytask");
    });
  };

  if (user) {
    return navigate("/mytask");
  }

  return (
    <div className="max-w-5xl min-h-[calc(100vh-65px)] mx-auto flex justify-center px-5">
      <div className="space-y-3">
        <img
          className="h-40 w-auto mx-auto"
          src="https://cdn.dribbble.com/users/2322685/screenshots/6221645/welcome-dribbble.gif"
          alt=""
        />
        <h1 className="font-semibold text-4xl">
          HI, Welcome to Task Management Application
        </h1>
        <p className="text-2xl font-medium">
          If you want use This Application, You have to simply login
        </p>
        <p className="font-medium text-lg ">
          Please{" "}
          <span
            onClick={HandleLogin}
            className="text-error cursor-pointer hover:underline"
          >
            Login with Gmail
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
