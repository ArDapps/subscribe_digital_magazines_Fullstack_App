import React from "react";
import { MdErrorOutline } from "react-icons/md";

export const ErrorAlert = ({ message }) => {
  return (
    <div className="mb-2 mx-auto items-center w-full container justify-center  text-center pr-8">
      {" "}
      <div className=" flex text-red-400 rounded relative " role="alert">
        <strong className="font-bold">
          <MdErrorOutline size={20} />
        </strong>
        <span className="block sm:inline pl-2 text-sm">{message}</span>
      </div>
    </div>
  );
};
