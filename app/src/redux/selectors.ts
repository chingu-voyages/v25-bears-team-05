import { IStoreState } from "./store.type";

// users
export const getUsers = (store: IStoreState) => store.users;

export const getCurrentUser = (store: IStoreState) => store.users.me;

// session
// isLoggedIn
