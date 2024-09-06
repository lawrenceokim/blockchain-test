import React from "react";

function UserReceive() {
  return (
    <div className="flex flex-col gap-4 w-full p-5 rounded-3xl bg-gradient-to-br from-950 to-black">
      <h1 className="text-3xl font-semibold">You Receive</h1>
      <div className="flex items-center justify-between gap-2 w-full">
        <span className="text-950 w-[70%] py-5 rounded-xl bg-200"></span>
        <span className="flex items-center justify-center w-[30%] py-2 rounded-xl bg-500 hover:bg-600">
          tokens
        </span>
      </div>
    </div>
  );
}

export default UserReceive;
