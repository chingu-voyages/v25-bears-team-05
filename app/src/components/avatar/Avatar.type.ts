import { IUserProcessed, IUsersStore } from "../../services/user/user.type";

export interface Avatar {
  url?: string;
}

export interface AvatarProps {
  users: IUsersStore;
  userId?: string;
  size?: "xsmall" | "small" | "medium" | "large";
  className?: string;
}
