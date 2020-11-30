import React, { useState } from "react";
import Button from "../button";
import "./OptionsMenu.css";

interface IOption {
  action: () => void;
  confirm?: boolean;
}

interface IOptions {
  buttons: { [keyof: string]: IOption };
}

function OptionsMenu({ buttons }: IOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCallAction = ({ action, confirm }: IOption) => {
    setIsOpen(false);
    action();
  };
  return (
    <div className="Options-menu">
      <Button
        onClick={() => setIsOpen((open) => !open)}
        className="Options-menu__toggle"
      >
        ...
      </Button>
      {isOpen && (
        <div className="Options-menu__list">
          {Object.entries(buttons).map(([title, option]: [string, IOption]) => (
            <Button onClick={() => handleCallAction(option)}>{title}</Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default OptionsMenu;
