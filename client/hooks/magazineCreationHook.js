"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddMagazineMutation,
  useGetMagazineDataListQuery,
} from "@/redux/slices/RTK/magazineSlice";

const MagazineCreationHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const {
    isLoading,
    data: getAllMagazine,
    isError,
  } = useGetMagazineDataListQuery({});

  const al = useSelector((state) => state);

  const [nexLoading, setNexLoading] = useState(false);

  const router = useRouter();
  const [addMagazine, { isLoading: isaddedLoading, isSuccess }] =
    useAddMagazineMutation();

  const onSubmit = async (data) => {
    data.monthlyPrice = parseInt(data.monthlyPrice);

    console.log(data, "onSubmit");

    try {
      const result = await addMagazine(data).unwrap();
      // Handle successful result if needed
      console.log("Magazine added successfully:", result);
    } catch (error) {
      // Handle error if needed
      console.error("Error adding magazine:", error);
    }
  };

  return [
    isLoading,
    isError,
    handleSubmit,
    onSubmit,
    register,
    errors,
    nexLoading,
  ];
};

export default MagazineCreationHook;
