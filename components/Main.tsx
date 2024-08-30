import UserPay from "@/components/UserPay";
import UserReceive from "@/components/UserReceive";

function Main() {
  return (
    <main className="flex w-full h-screen items-center justify-center transition-all duration-500 pt-28 pb-10 overflow-y-scroll">
      <div className="flex flex-col gap-4 max-w-[700px] w-full bg-200 rounded-3xl p-7">
        <UserPay />
        <UserReceive />
        <button
          className={`text-3xl font-semibold w-full  bg-500 hover:bg-600 rounded-3xl py-5`}
          // disabled={isSwapDisabled}
          // onClick={swap}
        >
          swap
        </button>
      </div>
      {/* ////// MODALS /////// */}
      {/* <TokenAModal /> */}
      {/* <TokenBModal /> */}
    </main>
  );
}

export default Main;
