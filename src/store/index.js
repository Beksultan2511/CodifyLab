import { combineReducers, createStore } from "redux";
import { Get } from "./Get";
import { GetTo } from "./GetTo";
import { AddAndDelete } from "./AddAndDelete";

const rootReducer = combineReducers({
  Get,
  GetTo,
  AddAndDelete,
});

export const store = createStore(rootReducer);
