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
import GenderCheckbox from "@/components/GenderCheckbox";

interface SignUpCardProps {
  setState: (state: SingInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleCheckboxChange = (gender: "male" | "female") => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // signup(inputs);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use you email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitForm}>
          <Input
            disabled={false}
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            placeholder="Fullname"
            type="text"
            required
          />
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

          <GenderCheckbox
            selectedGender={inputs.gender}
            onCheckboxChange={handleCheckboxChange}
          />
          <Button type="submit" size="lg" disabled={false} className="w-full">
            Continue
          </Button>
          <div>
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
