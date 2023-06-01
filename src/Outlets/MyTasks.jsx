import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Components/Modal";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [allTask, setAllTask] = useState([]);
  const [singleTask, setSingleTask] = useState({});

  useEffect(() => {
    fetch(
      `https://task-management-server-code.up.railway.app/task?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setAllTask(data));
  }, [allTask]);

  const handleDelete = (id) => {
    fetch(`https://task-management-server-code.up.railway.app/task/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const remaining = allTask.filter((t) => t.id !== id);
        toast.success("🦄 Delete Successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setAllTask(remaining);
      });
  };

  const handleComplete = (id) => {
    fetch(
      `https://task-management-server-code.up.railway.app/taskstatus/${id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = allTask.filter((t) => t.id !== id);
          const updatedStatus = allTask.find((t) => t.id === id);
          updatedStatus.status = "Completed";
          const confirmStatusData = [updatedStatus, ...remaining];
          setAllTask(confirmStatusData);
        }
      });
  };

  const handleSingleTaskView = (id) => {
    fetch(`https://task-management-server-code.up.railway.app/task/${id}`)
      .then((response) => response.json())
      .then((data) => setSingleTask(data));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="font-medium text-xl border-b-2 py-3 px-2">
        My Task List{" "}
      </h2>

      <div className="overflow-x-auto ">
        <table className="table w-full capitalize font-semibold table-heading">
          {/* head*/}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Last Update</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTask &&
              allTask.map((task, index) => (
                <tr key={task._id}>
                  <th>{index + 1}</th>
                  <th>{task.title}</th>
                  <th>
                    <span className="  truncate  inline-block">
                      {task.description.slice(0, 50)}...
                    </span>
                  </th>
                  <th>{task.date}</th>
                  <th>
                    {task.status === "Completed" ? (
                      <span className="bg-success text-white text-sm rounded-md px-4 py-1 cursor-pointer">
                        Completed
                      </span>
                    ) : (
                      <span
                        onClick={() => handleComplete(task._id)}
                        className="bg-error text-white text-sm rounded-md px-4 py-1 cursor-pointer"
                      >
                        Pending
                      </span>
                    )}
                  </th>
                  <th className=" flex  gap-2 items-center">
                    <Link to={`/updatetask/${task._id}`}>
                      <FiEdit2 className="cursor-pointer" />
                    </Link>
                    <span onClick={() => handleDelete(task._id)}>
                      <AiFillDelete className="text-error text-xl cursor-pointer" />
                    </span>
                    <label
                      onClick={() => handleSingleTaskView(task._id)}
                      htmlFor="my_modal_6"
                    >
                      <AiOutlineEye className="cursor-pointer" />
                    </label>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal singleTask={singleTask}></Modal>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyTasks;
