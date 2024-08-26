import React from "react";

function SelectNetwork() {
  return (
    <div className="relative w-max">
      <button className="flex items-center justify-center px-5 py-2 rounded-xl bg-500 hover:bg-600">
        Network
      </button>

      <div className="absolute top-16 flex flex-col gap-2 w-40 p-2 bg-200 rounded-xl">
        <button className="text-base font-medium w-full bg-gradient-to-br from-950 to-black hover:bg-600 py-2 rounded-lg">
          Arbitrum
        </button>
        <button className="text-base font-medium w-full bg-gradient-to-br from-950 to-black hover:bg-600 py-2 rounded-lg">
          BSC
        </button>
      </div>
    </div>
  );
}

export default SelectNetwork;
