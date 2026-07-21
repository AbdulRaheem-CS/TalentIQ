"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function useCountUp(target: number, options?: { duration?: number; delay?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: options?.duration ?? 1.2,
      delay: options?.delay ?? 0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, options?.duration, options?.delay]);

  return value;
}
