import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";

export interface MaterialIconProps extends ComponentPropsWithoutRef<"span"> {
  icon: "add_photo_alternate" | "close";
}

export default function MaterialIcon({
  icon,
  className,
  ...props
}: MaterialIconProps) {
  return (
    <span className={cn("material-icons", className)} {...props}>
      {icon}
    </span>
  );
}
