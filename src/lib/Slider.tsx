import { InputHTMLAttributes } from "react";

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Slider({ ...props }: SliderProps) {
  return <input type="range" {...props} />;
}
