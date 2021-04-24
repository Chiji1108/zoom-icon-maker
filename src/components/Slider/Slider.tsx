import { InputHTMLAttributes, memo } from "react";
import cn from "classnames";

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {}

// TODO: add style
const Slider = memo(({ ...props }: SliderProps) => {
  return <input type="range" {...props} />;
});
Slider.displayName = "Slider";
export default Slider;
