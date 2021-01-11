import { combineReducers } from "redux";
import dialog from "./dialog";
import users from "./users";

export default combineReducers({ users, dialog });
