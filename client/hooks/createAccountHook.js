"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { RegisterUser } from "@/redux/slices/authApiCall";
const CreateAccountHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state);

  const [fullName, setFullName] = useState();
  const [identity, setIdentity] = useState();

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isconfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordDontMachMessage, setPasswordDontMachMessage] = useState(null);

  const [registerErrorMessage, setRigisterErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (user.auth.error != null) {
      setRigisterErrorMessage(user.auth.error);
    }

    if (
      typeof window !== "undefined" &&
      localStorage.getItem("userInfo") != null
    ) {
      router.push("/profile");
    }
  }, [user]);

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        const reigertUser = await dispatch(RegisterUser(data));

        if (reigertUser.payload != null) {
          router.push("/profile");
        }
        // Handle the result if needed
      } catch (error) {
        // Handle the error if needed
      }
    } else {
      setPasswordDontMachMessage(" passwords Dont Match ");
    }
  };

  return [
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
  ];
};

export default CreateAccountHook;
