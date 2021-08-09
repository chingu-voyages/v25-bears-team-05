import React from "react";

export interface IInputAttributes {
  type: string;
  id: string;
  value: string;
  className?: string;
  ref?: React.MutableRefObject<any>;
  [keyof: string]: any;
}

export interface IInputProps extends IInputAttributes {
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  label?: string;
  errorMessage?: string;
  validationMessenger?: (value: string) => string;
  errorMessageReturner?: (error: string) => void;
  actionOnEnterKey?: () => void;
  isDisabled?: boolean;
}
