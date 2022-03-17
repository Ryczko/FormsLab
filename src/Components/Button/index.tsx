import React from "react";
import clsx from "clsx";

export enum ButtonVariant {
  PRIMARY = "btn-primary",
  SECONDARY = "btn-secondary",
  OUTLINE = "btn-outline",
  OUTLINE_PRIMARY = "btn-outline-primary",
  DANGER = "btn-danger",
  SUCCESS = "btn-success",
}

type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
};

const Button = ({
  children,
  className,
  onClick,
  variant = ButtonVariant.SECONDARY,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => (
  <button
    className={clsx("btn", variant, className)}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
