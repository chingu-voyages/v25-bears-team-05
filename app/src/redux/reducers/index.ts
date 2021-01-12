import { combineReducers } from "redux";
import dialog from "./dialog";
import threads from "./threads";
import users from "./users";

export default combineReducers({ users, dialog, threads });
