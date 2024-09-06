import React from "react";

function UserPay() {
  return (
    <div className="flex flex-col gap-4 w-full p-5 rounded-3xl bg-gradient-to-br from-950 to-black">
      <h1 className="text-3xl font-semibold">You pay</h1>
      <div className="flex items-center justify-between gap-2 w-full">
        <button className="flex items-center justify-center w-[30%] py-2 rounded-xl bg-500 hover:bg-600">
          tokens
        </button>
        <input className="text-950 w-[70%] p-2 outline-none rounded-xl bg-200" />
      </div>
      <div className="flex items-center justify-between gap-2 w-full">
        <p className="">
          Balance $<span>0.00</span>
        </p>
        <button className="text-base font-semibold px-5 py-2 rounded-xl bg-500 hover:bg-600">
          MAX
        </button>
      </div>
    </div>
  );
}

export default UserPay;
