import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import AddTasks from "../Outlets/AddTasks";
import MyTasks from "../Outlets/MyTasks";
import UpdateTask from "../Outlets/UpdateTask";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Home from "../Outlets/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "addtask",
        element: (
          <PrivateRoute>
            <AddTasks></AddTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "mytask",
        element: (
          <PrivateRoute>
            <MyTasks></MyTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "updatetask",
        element: (
          <PrivateRoute>
            <UpdateTask></UpdateTask>
          </PrivateRoute>
        ),
      },
      {
        path: "updatetask/:id",
        element: (
          <PrivateRoute>
            <UpdateTask></UpdateTask>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://task-management-server-code.up.railway.app/task/${params.id}`
          ),
      },
    ],
  },
]);
