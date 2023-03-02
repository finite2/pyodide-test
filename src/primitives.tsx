import { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    {...rest}>
    {children}
  </button>
);
