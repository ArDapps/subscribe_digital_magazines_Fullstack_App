"use client";
import { useGetMagazineDataListQuery } from "@/redux/slices/RTK/magazineSlice";
import Link from "next/link";
export default function Home() {
  const {
    isLoading,
    data: getAllMagazine,
    isError,
    refetch,
  } = useGetMagazineDataListQuery({});

  console.log(getAllMagazine);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-main-blue">
          Explore ALl Global Magazine
        </span>{" "}
        and Subscribe
      </h1>
      <div className=" z-10 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-12">
        {getAllMagazine &&
          getAllMagazine
            .slice()
            .reverse()
            .map((magazine, index) => (
              <div
                className=" bg-gradient-to-r to-sky-600 from-main-blue text-white m-3 p-3 rounded-md"
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
    </main>
  );
}
