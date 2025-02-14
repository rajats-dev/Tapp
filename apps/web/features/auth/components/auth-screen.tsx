"use client";
import React, { useState } from "react";
import { SingInFlow } from "../types";
import SignUpCard from "./sign-up-card";
import SignInCard from "./sign-in-card";

const AuthScreen = () => {
  const [state, setState] = useState<SingInFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-[420px] md:w-[420px]">
        {state == "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
