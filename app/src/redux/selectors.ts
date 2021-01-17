import { IStoreState } from "./store.type";

// users
export const getUsers = (store: IStoreState) => store.users;

export const getCurrentUser = (store: IStoreState) => store.users.me;

// threads
export const getThreads = (store: IStoreState) => store.threads;

// feed
export const getLatestFeed = (store: IStoreState) =>
  store.feed.buckets[Object.keys(store.feed.buckets).sort().reverse()[0]];

// session
export const getLoggedInState = (store: IStoreState) =>
  store.session?.isLoggedIn;
