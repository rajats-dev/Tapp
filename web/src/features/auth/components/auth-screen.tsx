"use client";
import SignUpCard from "./sign-up-card";
import SignInCard from "./sign-in-card";
import useAuthState from "@/hooks/state/useAuthState";

const AuthScreen = () => {
  const { pageState, setPageState } = useAuthState();

  return (
    <div className="h-full flex items-center justify-center">
      <div>
        {pageState == "signIn" ? (
          <SignInCard setState={setPageState} />
        ) : (
          <SignUpCard setState={setPageState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
