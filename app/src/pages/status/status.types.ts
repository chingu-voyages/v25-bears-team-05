import { statusStates } from "./StatusSetter";

export type StatusType =
  | "comment"
  | "home"
  | "network"
  | "notification"
  | "profile"
  | "search"
  | "thread";

export interface IStatusProps {
  type: StatusType;
  state: keyof typeof statusStates;
  message: string;
}

export interface IStatus extends IStatusProps {
  timeStamp: Date;
}
