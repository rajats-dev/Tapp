import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { SingInFlow } from "../types";

interface SignInCardProps {
  setState: (state: SingInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use you email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            placeholder="Username"
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
          <Button type="submit" size="lg" disabled={false} className="w-full">
            Continue
          </Button>
          <Separator />
          <div className="flex flex-col gap-y-2.5">
            {/* <Button
              disabled={false}
              onClick={() => {}}
              variant="outline"
              size="lg"
              className="w-full relative"
            >
              <FcGoogle className="size-5 absolute left-2.5" />
              Continue with Google
            </Button>
            <Button
              disabled={false}
              onClick={() => {}}
              variant="outline"
              size="lg"
              className="w-full relative"
            >
              <FaGithub className="size-5 absolute left-2.5" />
              Continue with GitHub
            </Button> */}
            <p className="text-sm text-muted-foreground">
              Dont&apos;t have an account?{" "}
              <span
                className="text-sky-700 hover:underline cursor-pointer"
                onClick={() => setState("signUp")}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
