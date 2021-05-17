import { ComponentProps, memo } from "react";
import cn from "classnames";

export interface CheckboxProps extends ComponentProps<"input"> {}
const Checkbox = memo(({ ...props }: CheckboxProps) => {
  return <input type="checkbox" {...props} />;
});
Checkbox.displayName = "Checkbox";
export default Checkbox;
