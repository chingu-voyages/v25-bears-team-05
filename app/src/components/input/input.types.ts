import { ChangeEvent } from "react";

export interface InputAttributes {
  type: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.MutableRefObject<any>;
  [keyof: string]: any;
}

export interface InputProps extends InputAttributes {
  label?: string;
  errorMessage?: string;
}
