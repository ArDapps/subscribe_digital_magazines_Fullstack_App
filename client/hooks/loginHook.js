"use client";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginUser } from "@/redux/slices/authApiCall";

const LoginHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state);

  const [identity, setIdentity] = useState();
  const [password, setPassword] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setLoginErrorMessage(null);
  }, []);
  useEffect(() => {
    console.log("use effect login");
    if (user.auth.error != null) {
      setLoginErrorMessage(user.auth.error);
    }

    if (
      typeof window !== "undefined" &&
      localStorage.getItem("userInfo") != null
    ) {
      router.push("/profile");
    }
  }, [user]);

  const onSubmit = async (data) => {
    console.log(data, "onSubmit");
    const loginData = await dispatch(LoginUser(data));
    if (loginData.type === "auth/LoginUser/fulfilled") {
      router.push("/profile");
    }
    console.log("=====>", loginData.type);
  };
  return [
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
  ];
};

export default LoginHook;
