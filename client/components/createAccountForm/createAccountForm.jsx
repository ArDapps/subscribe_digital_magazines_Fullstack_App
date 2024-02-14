"use client";

import CreateAccountHook from "@/hooks/createAccountHook";
import { ErrorAlert } from "../errorAlert/errorAlert";

const CreateAccountForm = () => {
  const [
    handleSubmit,
    onSubmit,
    setFullName,
    register,
    errors,
    setEmail,
    setPassword,
    isPasswordVisible,
    setIsPasswordVisible,
    confirmPassword,
    setConfirmPassword,
    isconfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    passwordDontMachMessage,
    registerErrorMessage,
    fullName,
    email,
    password,
    user,
  ] = CreateAccountHook();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-main-blue  to-[#3236D9]">
      {" "}
      <div className="container mx-auto max-w-[450px] md:max-w-[700px]  bg-main-bg rounded-xl text-center m-3 p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-6">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              {...register("firstName", {
                required: true,
                minLength: 2,
              })}
              type="text"
              id="firstName"
              className="pl-11 text-gray-800  pr-11 py-2  rounded-[25px]  block w-full mb-3"
              placeholder=" firstName"
            />
          </div>
          {errors.firstName && (
            <ErrorAlert message={" write your first name"} />
          )}

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...register("email", {
                required: true,
                type: email,
              })}
              type="email"
              id="email"
              className="pl-11 text-gray-800  pr-11 py-2  rounded-[25px]  block w-full mb-3"
              placeholder="  Email Address"
            />
          </div>
          {errors.email && <ErrorAlert message={"  Add your valid email"} />}
          <div>
            <div>
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
                    className="pl-11 text-gray-800  pr-11 py-2  rounded-[25px]  block w-full"
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    {...register("password", { required: true })}
                    autoComplete="new-password"
                    placeholder=" password"
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

            {errors.password && <ErrorAlert message={" add password  "} />}
          </div>
          <div>
            <div>
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-11 text-gray-800  pr-11 py-2  rounded-[25px]  block w-full"
                    id="confirmpassword"
                    type={isconfirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    {...register("confirmPassword", { required: true })}
                    autoComplete="confirmPassword"
                    placeholder="Confirm Password  "
                  />

                  <div className="absolute left-0 z-30 inset-y-1 flex items-center px-4">
                    <button
                      type="button"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isconfirmPasswordVisible)
                      }
                    >
                      {isconfirmPasswordVisible ? (
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

            {errors.confirmPassword && (
              <ErrorAlert message={"  please add confirm password"} />
            )}
          </div>

          <p className="text-red-300">
            {" "}
            {passwordDontMachMessage != null && (
              <ErrorAlert message={passwordDontMachMessage} />
            )}
          </p>

          <div className="mx-auto container  max-w-[400px] pt-4">
            {user.auth.isLoading == true ? (
              <p className="flex flex-row text-white bg-main-purple font-medium rounded-xl text-lg px-6  me-2 mb-2 mx-auto container py-3 items-center justify-evenly">
                Account Save Processing
              </p>
            ) : (
              <button className=" text-main-blue bg-white font-medium rounded-xl text-lg px-6  me-2 mb-2 mx-auto container py-3">
                Create Account
              </button>
            )}
          </div>
          <p className="text-red-300">
            {" "}
            {registerErrorMessage != null && (
              <ErrorAlert message={registerErrorMessage} />
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
