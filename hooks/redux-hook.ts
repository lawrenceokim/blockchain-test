import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store";

//please use the below throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

//NOTE: useDispatch(), useSelector() and useStore() are all functions that i am aliasing with the 3 imports from "./store"
