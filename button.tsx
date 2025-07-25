import * as React from "react";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    {...props}
  />
));
Button.displayName = "Button";
