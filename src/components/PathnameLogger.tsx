"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PathnameLogger = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("pathName:", pathname);
  }, [pathname]);

  return null;
};

export default PathnameLogger;
