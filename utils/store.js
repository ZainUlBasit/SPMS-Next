import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/utils/Slices/AuthSlice";
import CompanyReducer from "@/utils/Slices/CompanySlice";
import ItemSlice from "@/utils/Slices/ItemSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      AuthState: AuthReducer,
      CompanyState: CompanyReducer,
      ItemState: ItemSlice,
    },
  });
};
