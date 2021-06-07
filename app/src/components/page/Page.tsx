import React from "react";
import Nav from "../../components/nav";
import TopBar from "../../components/topBar";
import "./Page.css";

function Page({
  className,
  children,
}: {
  className: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className={`Page ${className || ""}`}>
      <TopBar
        className={`Page__top-bar ${className ? `${className}__top-bar` : ""}`}
      />
      {children}
      <Nav className={`Page__nav ${className ? `${className}__nav` : ""}`} />
    </div>
  );
}

export default Page;
