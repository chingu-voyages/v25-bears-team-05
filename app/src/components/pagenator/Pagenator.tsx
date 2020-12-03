import React, { useRef, useEffect } from "react";
import "./Pagenator.css";

function Pagenator({
  page,
  nextPage,
  active,
}: {
  page: number;
  nextPage: () => void;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const refCurrent = ref.current;
      if (!active) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            refCurrent && nextPage();
            refCurrent && observer.unobserve(refCurrent);
          }
        });
        refCurrent && observer.observe(refCurrent);
        return () => {
          refCurrent && observer.unobserve(refCurrent);
        };
      }
    }
  }, [page, active, nextPage]);
  return <div ref={ref} className="Pagenator"></div>;
}

export default Pagenator;
