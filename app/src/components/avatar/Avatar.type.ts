import { IUsersStore } from "../../services/user/user.type";

export interface Avatar {
  url?: string;
}

export interface AvatarProps {
  users: IUsersStore;
  userId?: string;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large";
  className?: string;
}
