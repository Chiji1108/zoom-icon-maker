import { ComponentPropsWithoutRef, memo } from "react";
import cn from "classnames";

export interface MaterialIconProps extends ComponentPropsWithoutRef<"span"> {
  icon:
    | "add_photo_alternate"
    | "close"
    | "rotate_right"
    | "rotate_left"
    | "zoom_in"
    | "zoom_out";
}

const MaterialIcon = memo(
  ({ icon, className, ...props }: MaterialIconProps) => {
    return (
      <span className={cn("material-icons", className)} {...props}>
        {icon}
      </span>
    );
  }
);
MaterialIcon.displayName = "MaterialIcon";
export default MaterialIcon;
