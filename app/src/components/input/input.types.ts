import { ChangeEvent } from "react";

export interface IInputAttributes {
  type: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.MutableRefObject<any>;
  [keyof: string]: any;
}

export interface IInputProps extends IInputAttributes {
  label?: string;
  errorMessage?: string;
}
