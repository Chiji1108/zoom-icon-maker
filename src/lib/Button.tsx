import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md disabled:shadow-none hover:bg-green-700 focus:outline-none disabled:opacity-50 disabled:hover:bg-blue-500 disabled:hover:cursor-not-allowed"
      {...props}
    />
  );
}
