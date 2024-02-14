"use client";
import MagazineCreationHook from "@/hooks/magazineCreationHook";
import { ErrorAlert } from "../errorAlert/errorAlert";

const MagazineCreationForm = () => {
  const [isLoading, isError, handleSubmit, onSubmit, register, errors] =
    MagazineCreationHook();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-3 justify-between items-center gap-3 w-full ">
        <div className=" flex justify-between gap-1">
          <input
            {...register("title", {
              required: true,
              minLength: 5,
            })}
            type="text"
            id="title"
            className="mb-2  sm:w-full w-[400px] bg-main-white border  text-gray-900 text-sm rounded-lg focus:main-purple focus:border-main-red focus:outline-none  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:main-purple dark:focus:border-main-red focus:outline-none "
            placeholder=" Mangazine Name"
          />
        </div>
        {errors.title && (
          <ErrorAlert message={"   Please write the valide magazine Name "} />
        )}
        <div>
          <textarea
            rows="3"
            {...register("description", {
              required: true,
              minLength: 10,
            })}
            type="textArea"
            id="eventDescription"
            placeholder="Magazine Description   "
            className=" mb-2 block  sm:w-full w-[400px] p-4 text-gray-900 border    rounded-lg bg-main-white sm:text-md   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:main-purple focus:border-main-red focus:outline-none "
          />
        </div>
        {errors.description && (
          <ErrorAlert
            message={
              " Please Write valid and good description for your magazine more than 10 characters"
            }
          />
        )}
        <div className=" flex  justify-start sm:justify-between gap-1  sm:w-full w-[400px]">
          <input
            {...register("monthlyPrice", {
              required: true,
            })}
            type="number"
            id="monthlyPrice"
            className="mb-2   sm:w-full w-[400px] bg-main-white border  text-gray-900 text-sm rounded-lg focus:main-purple focus:border-main-red focus:outline-none  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:main-purple dark:focus:border-main-red focus:outline-none "
            placeholder="Monthly Fees"
          />
        </div>
        {errors.monthlyPrice && (
          <ErrorAlert message={" please Write Monthly Fees  "} />
        )}
      </div>

      <div className="mx-auto container  max-w-[400px] py-8">
        {isLoading == true ? (
          <p className="flex flex-row text-white bg-main-purple font-medium rounded-xl text-lg px-6  me-2 mb-2 mx-auto container py-3 items-center justify-evenly">
            data Processing
          </p>
        ) : (
          <button className="  hover:bg-slate-600  bg-main-blue text-white font-medium rounded-xl text-lg px-6  me-2 mb-2 mx-auto container py-3">
            Add Magazine
          </button>
        )}
      </div>
    </form>
  );
};

export default MagazineCreationForm;
