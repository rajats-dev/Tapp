import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SingInFlow } from "../types";
import useSignUp from "@/hooks/query/useSignUp";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface SignUpCardProps {
  setState: (state: SingInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, signup } = useSignUp();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    signup(inputs);
  };

  const handleGoogleLogin = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/client",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use you email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 space-y-4">
          <Button
            disabled={false}
            onClick={handleGoogleLogin}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute left-2" />
            Continue with Google
          </Button>
        </div>
        <form onSubmit={handleSubmitForm}>
          <Input
            disabled={false}
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            disabled={false}
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="Email"
            type="text"
            required
          />
          <Input
            disabled={false}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full">
            Continue
          </Button>
          <div>
            <p className="text-sm text-muted-foreground pt-10">
              Already have an account?{" "}
              <span
                className="text-sky-700 hover:underline cursor-pointer"
                onClick={() => setState("signIn")}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
