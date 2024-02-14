"use client";

import Link from "next/link";

import LoginHook from "@/hooks/loginHook";
import { ErrorAlert } from "../errorAlert/errorAlert";

const LoginForm = () => {
  const [
    onSubmit,
    register,
    handleSubmit,
    identity,
    errors,
    password,
    isPasswordVisible,
    user,
    loginErrorMessage,
    setIsPasswordVisible,
    setIdentity,
    setPassword,
  ] = LoginHook();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-main-blue  to-[#3236D9]">
      <div className="container mx-auto  max-w-[450px] md:max-w-[700px] bg-main-bg rounded-xl text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-3 p-3">
            <input
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              {...register("Email", {
                required: true,
              })}
              type="text"
              id="Email"
              className="pl-11 text-gray-800  pr-11 py-3  rounded-[25px]  block w-full "
              placeholder="Email address "
            />
          </div>

          {errors.Email && <ErrorAlert message={" please add valid email"} />}

          <div className="mx-3 px-3">
            <div className="space-y-2 text-gray-700 mb-3">
              <div className="relative focus-within:text-gray-900 dark:focus-within:text-gray-800 ">
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 flex items-center px-4 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  ></svg>
                </div>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  {...register("password", { required: true })}
                  className="pl-11 text-gray-800  pr-11 py-3  rounded-[25px]  block w-full"
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Password"
                />

                <div className="absolute left-0 z-30 inset-y-1 flex items-center px-4">
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {errors.password && (
            <ErrorAlert message={" Please add Correct Password "} />
          )}

          <div className="mx-auto container  max-w-[400px] py-8">
            {user.auth.isLoading == true ? (
              <p className="flex flex-row text-white bg-main-purple font-medium rounded-xl text-lg px-6  me-2 mb-2 mx-auto container py-3 items-center justify-evenly">
                data Processing
              </p>
            ) : (
              <button className=" bg-white hover:bg-slate-600  text-main-blue bg-main-purple font-medium rounded-xl text-lg px-6  me-2 mb-2 mx-auto container py-3">
                Login
              </button>
            )}
          </div>

          <p className="text-red-300">
            {" "}
            {loginErrorMessage != null && (
              <ErrorAlert message={loginErrorMessage} />
            )}
          </p>
        </form>
        <div className="container mx-auto items-center justify-center text-center pt-8">
          <h3 className="mx-auto container text-slate-300 ">
            if you already don`t have account press
            <Link href={"/create-account"}>
              <span className="text-white font-bold m-3">Here</span>
            </Link>
          </h3>
        </div>
        ;
      </div>
    </div>
  );
};

export default LoginForm;
