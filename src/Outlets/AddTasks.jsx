import moment from "moment";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTasks = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch("http://localhost:5000/task", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("🦄 added Successfully!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/mytask");
          }, 2000);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex justify-center items-center py-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" px-5 flex flex-col gap-2  w-full max-w-5xl mx-auto"
      >
        {/*  */}
        <input
          type="text"
          {...register("title", { required: "title  is required" })}
          aria-invalid={errors.title ? "true" : "false"}
          placeholder="task title here"
          className="w-full py-3 px-6 rounded-md bg-gray-100 border-2 text-gray-700 font-semibold  focus:outline-0 placeholder:font-semibold placeholder:text-sm placeholder:text-gray-400"
        />
        {errors.title && <p role="alert">{errors.title?.message}</p>}

        {/*  */}
        <input
          {...register("email")}
          type="email"
          defaultValue={user?.email}
          className="w-full py-3 px-6 rounded-md  mt-5 bg-gray-100 border-2 text-gray-700 font-semibold  focus:outline-0 placeholder:font-semibold placeholder:text-sm placeholder:text-gray-400"
        />

        {/*  */}
        <input
          {...register("date", { required: "date  is required" })}
          aria-invalid={errors.date ? "true" : "false"}
          type="text"
          defaultValue={moment().format("L")}
          className="w-full py-3 px-6 rounded-md  mt-5 bg-gray-100 border-2 text-gray-700 font-semibold  focus:outline-0 placeholder:font-semibold placeholder:text-sm placeholder:text-gray-400"
        />
        {errors.date && <p role="alert">{errors.date?.message}</p>}

        {/*  */}
        <textarea
          type="text"
          {...register("description", { required: "description  is required" })}
          aria-invalid={errors.description ? "true" : "false"}
          placeholder="task description here"
          className="w-full py-3 px-6 rounded-md h-40 mt-5 bg-gray-100 border-2 text-gray-700 font-semibold  focus:outline-0 placeholder:font-semibold placeholder:text-sm placeholder:text-gray-400"
        />
        {errors.description && (
          <p role="alert">{errors.description?.message}</p>
        )}
        <button
          type="submit"
          className="w-full my-2 py-3 px-6 rounded-md bg-sky-400 hover:bg-sky-600 cursor-pointer transition-colors duration-500 text-gray-200 font-semibold   focus:outline-0"
        >
          Add Task
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddTasks;
