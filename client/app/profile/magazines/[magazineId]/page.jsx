"use client";
import { useGetSingleMagazineQuery } from "@/redux/slices/RTK/magazineSlice";
import { useAddsubscribeMutation } from "@/redux/slices/RTK/subscribeSlice";
import { useRouter } from "next/navigation";
import React from "react";

const page = ({ params }) => {
  const {
    isLoading,
    data: singleMagazine,
    isError,
    refetch,
  } = useGetSingleMagazineQuery(params.magazineId);

  console.log(singleMagazine, "useGetSingleMagazineQuery");

  const [subscribe, { isLoading: isaddedSubscribeLoading, isSuccess }] =
    useAddsubscribeMutation();

  const router = useRouter();

  const subscribeJoin = async () => {
    await subscribe(params.magazineId);

    router.push("/profile");
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center ">
      <div>______________________</div>
      {singleMagazine && (
        <div className="text-center">
          <p className="text-2xl font-bold">{singleMagazine.title}</p>
          <p className="p-4">{singleMagazine.description}</p>
          <p className="bg-red-500 text-white p-2 rounded-md w-[100px] mx-auto text-center">
            {" "}
            {/* Added mx-auto */}
            {singleMagazine.monthlyPrice}
          </p>
          <button
            onClick={subscribeJoin}
            className="bg-main-blue text-white m-3 p-3 rounded-md hover:bg-red-500"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
