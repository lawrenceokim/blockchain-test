import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center transition-all duration-500 mt-16">
      <div className="flex flex-col gap-4 max-w-[700px] w-full bg-blue-700/80 rounded-3xl p-7">
        {/* ///////////// */}
        <div className="flex flex-col gap-4 w-full p-5 rounded-3xl bg-[#0b0c58]">
          <h1 className="text-3xl font-semibold">You pay</h1>
          <div className="flex items-center justify-between gap-2 w-full">
            <button className="flex items-center justify-center w-[30%] py-2 rounded-xl bg-gray-400">
              token
            </button>
            <input className="w-[70%] p-2 outline-none rounded-xl bg-gray-400" />
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <p className="">
              Balance $<span>0.00</span>
            </p>
            <button className="text-base font-semibold px-5 py-2 rounded-xl bg-green-800 hover:bg-green-700">
              MAX
            </button>
          </div>
        </div>
        {/* ///////////// */}
        <div className="flex flex-col gap-4 w-full p-5 rounded-3xl bg-[#0b0c58]">
          <h1 className="text-3xl font-semibold">You Receive</h1>
          <div className="flex items-center justify-between gap-2 w-full">
            <span className="w-[70%] py-5 rounded-xl bg-gray-400"></span>
            <span className="flex items-center justify-center w-[30%] py-2 rounded-xl bg-gray-400">
              token
            </span>
          </div>
        </div>
        {/* ///////////////// */}
        <button className="text-3xl font-semibold w-full bg-green-800 hover:bg-green-700 rounded-3xl py-5">
          swap
        </button>
      </div>
    </main>
  );
}
