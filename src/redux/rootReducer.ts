import { combineReducers } from "@reduxjs/toolkit";
import repositoryReducer from "./slices/repositorySlice";

const rootReducer = combineReducers({
  repository: repositoryReducer,
});

export default rootReducer;
