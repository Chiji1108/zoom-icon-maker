import { InputHTMLAttributes } from "react";
import cn from "classnames";

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {}

// TODO: add style
export default function Slider({ className, ...props }: SliderProps) {
  return <input type="range" className={cn("w-full", className)} {...props} />;
}
