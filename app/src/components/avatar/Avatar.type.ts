import { IUser } from "../../services/user/user.type";

export interface Avatar {
  url?: string;
}

export interface AvatarProps {
  userData?: IUser;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large";
  className?: string;
}
