"use client";
import { useAuthContext } from "@/context/AuthContext";
import AuthScreen from "@/features/auth/components/auth-screen";
import { redirect } from "next/navigation";

export default function Home() {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) return null;

  console.log(authUser);

  if (authUser) {
    redirect("/client");
  }

  return <>{!authUser && <AuthScreen />}</>;
}
