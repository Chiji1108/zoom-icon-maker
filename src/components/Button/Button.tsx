import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
}

// TODO: improve style
export default function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "py-2 px-4 font-semibold rounded-lg disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:hover:cursor-not-allowed transition-all",
        {
          "shadow-md  bg-blue-500 text-white hover:bg-blue-700 disabled:hover:bg-blue-500 ":
            variant === "primary",
          "text-blue-500": variant === "secondary",
        }
      )}
      {...props}
    />
  );
}
