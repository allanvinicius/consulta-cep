import { twMerge } from "tailwind-merge";
import React from "react";

interface ContainerGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ContainerGrid({ children, className }: ContainerGridProps) {
  const defaultClass =
    "w-full max-w-[1328px] mx-auto px-8 max-[768px]:px-8 max-[480px]:px-6";
  const combinedClass = twMerge(defaultClass, className);

  return <div className={combinedClass}>{children}</div>;
}
