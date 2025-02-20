"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { AUTH_USER } from "@/lib/apiAuthRoutes";
import useAuthState from "./state/useAuthState";

type SignupInputs = {
  name: string;
  email: string;
  password: string;
};

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setPageState } = useAuthState();

  const signup = async (inputs: SignupInputs) => {
    try {
      setLoading(true);
      const res = await fetch(`${AUTH_USER}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      toast.success("Successfully Signup");
      setPageState("signIn");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignUp;
