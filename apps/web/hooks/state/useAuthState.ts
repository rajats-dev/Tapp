import { SingInFlow } from "@/features/auth/types";
import { create } from "zustand";

interface AuthStatePage {
  pageState: string;
  setPageState: (page: SingInFlow) => void;
}

const useAuthState = create<AuthStatePage>((set) => ({
  pageState: "signUp",
  setPageState: (page: SingInFlow) => set({ pageState: page }),
}));

export default useAuthState;
