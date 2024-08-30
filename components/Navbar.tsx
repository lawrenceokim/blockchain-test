import React from "react";
import SelectNetwork from "./SelectNetwork";

function Navbar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-between max-w-[1000px] w-full py-2 mt-3 rounded-3xl bg-950 px-3 border-l border-b border-200">
      <h1 className="relative flex items-center justify-center rounded-xl text-xl ml-4">
        wapify
        <span className="absolute -left-3 rotate-45 text-3xl">S</span>
        <span className="absolute w-10 h-10 rounded-full bg-100/50"></span>
      </h1>
      <SelectNetwork />
    </nav>
  );
}

export default Navbar;
