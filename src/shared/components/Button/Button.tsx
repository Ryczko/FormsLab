import type React from 'react';
import clsx from 'clsx';

export enum ButtonVariant {
  PRIMARY = 'btn-primary',
  SECONDARY = 'btn-secondary',
  OUTLINE = 'btn-outline',
  OUTLINE_PRIMARY = 'btn-outline-primary',
  DANGER = 'btn-danger',
  SUCCESS = 'btn-success',
  FLAT = 'btn-flat',
}
export enum ButtonSize {
  DEFAULT = '',
  MEDIUM = 'w-32',
  LARGE = 'w-40',
}
export interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  sizeType?: ButtonSize;
  className?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  children,
  className,
  variant = ButtonVariant.SECONDARY,
  sizeType = ButtonSize.DEFAULT,
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => (
  <button
    className={clsx('btn', variant, sizeType, className)}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
