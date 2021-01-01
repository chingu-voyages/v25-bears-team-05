import React, { useEffect, useRef, useState } from "react";
import Button from "../button";
import "./ContentClipper.css";

function ContentClipper({
  children,
  clippedHeight = "120px",
}: {
  children: JSX.Element | string;
  clippedHeight?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClipping, setIsClipping] = useState(true);
  const containerRef = useRef<any>();
  useEffect(() => {
    setIsClipping(
      containerRef.current.scrollHeight > containerRef.current.clientHeight
    );
  }, [containerRef.current]);
  return (
    <div className={`Content-clipper`}>
      <div
        ref={containerRef}
        className="Content-clipper__content"
        style={isOpen ? {} : { maxHeight: clippedHeight }}
      >
        {children}
      </div>
      {(isClipping || isOpen) && (
        <Button
          className="Content-clipper__button"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "show less" : "show more"}
        </Button>
      )}
    </div>
  );
}

export default ContentClipper;
