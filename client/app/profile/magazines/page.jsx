"use client";
import MagazineCreationForm from "@/components/magazinecreationForm/magazinecreationForm";
import { useGetMagazineDataListQuery } from "@/redux/slices/RTK/magazineSlice";
import React from "react";

const Magazines = () => {
  const {
    isLoading,
    data: getAllMagazine,
    isError,
  } = useGetMagazineDataListQuery({});

  console.log(getAllMagazine);
  return (
    <div className="container mx-auto  flex flex-col justify-center items-center pt-12">
      <p className="text-xl m-3 p-3 bg-main-blue text-white rounded max-w-[750px] text-center ">
        Create Your Magazine with Subscribe Monthly Price
      </p>
      <div className="w-[500px]">
        <MagazineCreationForm />
      </div>
    </div>
  );
};

export default Magazines;
