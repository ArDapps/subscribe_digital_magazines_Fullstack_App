"use client";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user != null || user != undefined) {
      router.push("/profile");
      return;
    }
    console.log("WE ARE AR AT Login LAYOUT", user);
  }, []);
  return <div className=" ">{children}</div>;
}
