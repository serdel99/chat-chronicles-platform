import { useRef, useEffect } from "react";

export const useFocusResponse = () => {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    element.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return element;
};
