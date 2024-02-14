"use client";
import MagazineCreationForm from "@/components/magazinecreationForm/magazinecreationForm";
import { useGetMagazineDataListQuery } from "@/redux/slices/RTK/magazineSlice";
import Link from "next/link";
const Magazines = () => {
  const {
    isLoading,
    data: getAllMagazine,
    isError,
    refetch,
  } = useGetMagazineDataListQuery({});

  console.log(getAllMagazine);
  return (
    <div className="container mx-auto  flex flex-col justify-center items-center pt-12">
      <p className="text-xl m-3 p-3 bg-main-blue text-white rounded max-w-[750px] text-center ">
        Create Your Magazine with Subscribe Monthly Price
      </p>
      <div className="w-[500px] md:w-[800px]">
        <MagazineCreationForm />
      </div>

      <div className=" z-10 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-12">
        {getAllMagazine &&
          getAllMagazine
            .slice()
            .reverse()
            .map((magazine, index) => (
              <div
                className="bg-main-blue text-white m-3 p-3 rounded-md"
                key={index}
              >
                <Link href={`/profile/magazines/${magazine.id}`}>
                  <p>{magazine.title}</p>
                  <p className="bg-slate-300 m-2 p-3 text-main-blue">
                    {magazine.description}
                  </p>
                  <p>{magazine.monthlyPrice}$</p>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Magazines;
