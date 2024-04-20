import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/utils/Slices/AuthSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { AuthState: AuthReducer },
  });
};
