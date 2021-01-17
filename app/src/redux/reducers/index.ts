import { combineReducers } from "redux";
import dialog from "./dialog";
import threads from "./threads";
import users from "./users";
import feed from "./feed";
import session from "./session";

export default combineReducers({ users, dialog, threads, feed, session });
