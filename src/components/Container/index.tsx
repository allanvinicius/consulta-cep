import { twMerge } from "tailwind-merge";
import { ContainerGridProps } from "../../types";

export function ContainerGrid({ children, className }: ContainerGridProps) {
  const defaultClass =
    "w-full max-w-[1328px] mx-auto px-8 max-[768px]:px-8 max-[480px]:px-6";
  const combinedClass = twMerge(defaultClass, className);

  return <div className={combinedClass}>{children}</div>;
}
