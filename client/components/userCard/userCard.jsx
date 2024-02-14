"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { DateHumanConverter } from "@/utils/DateHumanConverter";

export const UserCard = ({ data }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div>
      {data && (
        <div className="flex flex-col pt-12  ">
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="w-[600px] h-[300px] border border-white rounded-md mx-auto flex  flex-col justify-center items-sart text-white hover:bg-slate-500 hover:text-main-red gap-4 px-4 bg-main-blue "
          >
            <div
              className={`${
                isHover ? "bg-main-red" : "bg-white/30"
              } hover:bg-main-red w-[60px] h-[60px] flex items-center justify-center rounded-full `}
            >
              <FaUserCircle size={50} />
            </div>

            <p className="text-start text-3xl py-2">{data.firstName}</p>
            <p className="text-start text-3xl ">{data.email}</p>
            {DateHumanConverter(data.createDateTime)}
          </div>
        </div>
      )}
    </div>
  );
};
