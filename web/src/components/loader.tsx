import { LucideLoader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <LucideLoader2 size={20} className=" animate-spin" />
    </div>
  );
};

export default Loader;
