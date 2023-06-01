import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";

const Layouts = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};

export default Layouts;
