import React from "react";
import SelectNetwork from "./SelectNetwork";

function Navbar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-between max-w-[1000px] w-full py-2 mt-3 rounded-3xl bg-950 px-3 border-l border-b border-200">
      <p className="flex items-center justify-center rounded-xl ">
        wallet address
      </p>
      <SelectNetwork />
    </nav>
  );
}

export default Navbar;
