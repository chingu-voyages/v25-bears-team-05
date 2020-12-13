export interface Avatar {
  url?: string;
}

export interface AvatarProps extends Avatar {
  userName: string;
  size?: "xsmall" | "small" | "medium" | "large";
  className?: string;
}
