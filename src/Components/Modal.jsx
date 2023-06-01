import React from "react";

const Modal = ({ singleTask }) => {
  const { title, description, email, date } = singleTask || {};
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg bg-gray-200 px-2 py-2 rounded">
            {title}
          </h3>
          <p className="py-4  px-2">{description}</p>
          <p className=" px-2">last Update : {date}</p>
          <p className=" px-2">Posted By : {email}</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
    // <div className="modal" id="my_modal_6">
    //   <div className="modal-box">
    //     <h3 className="font-bold text-lg">{title}</h3>
    //     <p className="py-4">{description}</p>
    //    <p></p>
    //   </div>
    // </div>
  );
};

export default Modal;
