export interface Avatar {
  url?: string;
}

export interface AvatarProps extends Avatar {
  userName: string;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large";
  className?: string;
}
