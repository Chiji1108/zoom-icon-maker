import { ComponentProps, memo } from "react";
import cn from "classnames";

export interface MaterialIconProps extends ComponentProps<"span"> {}

const MaterialIcon = memo(({ className, ...props }: MaterialIconProps) => {
  return <span className={cn("material-icons", className)} {...props} />;
});
MaterialIcon.displayName = "MaterialIcon";
export default MaterialIcon;
