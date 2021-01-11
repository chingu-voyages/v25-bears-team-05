import { IUserProcessed } from "../../services/user/user.type";

export interface Avatar {
  url?: string;
}

export interface AvatarProps {
  userData?: IUserProcessed;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large";
  className?: string;
}
