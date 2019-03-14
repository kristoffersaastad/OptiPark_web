import { combineReducers } from "redux";

import data from "./data";
import global from "./global"
import loaders from './loaders'

export default combineReducers({
  data,
  global,
  loaders,
});
