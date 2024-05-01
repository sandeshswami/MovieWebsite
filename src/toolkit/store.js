import { configureStore } from "@reduxjs/toolkit";
import ApiData from "./slice/ApiData";

export default configureStore({
  reducer: {
    AllData: ApiData,
  },
});
