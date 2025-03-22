import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { SingInFlow } from "../types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignInCardProps {
  setState: (state: SingInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loader, setloader] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        setloader(true);
        const res = await signIn("credentials", {
          email: inputs.email,
          password: inputs.password,
          redirect: false,
        });
        if (!res?.ok) throw new Error(res?.error || "Error in process");
        router.push("/client");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use you email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0 p-3 pt-0">
        <form className="flex flex-col gap-2" onSubmit={handleSubmitForm}>
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
          <Button type="submit" size="lg" disabled={loader} className="w-full">
            Continue
          </Button>
          <Separator />
          <div className="flex flex-col gap-y-2.5">
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
    </div>
  );
};

export default SignInCard;
