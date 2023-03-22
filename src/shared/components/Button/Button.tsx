import React from 'react';
import clsx from 'clsx';
import Loader from 'shared/components/Loader/Loader';

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
  isLoading?: boolean;
  sizeType?: ButtonSize;
  className?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactNode;
}

const Button = ({
  children,
  className,
  isLoading,
  variant = ButtonVariant.SECONDARY,
  sizeType = ButtonSize.DEFAULT,
  disabled = false,
  type = 'button',
  icon,
  ...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => (
  <button
    className={clsx(
      'btn relative flex items-center justify-center',
      variant,
      sizeType,
      className
    )}
    disabled={disabled || isLoading}
    type={type}
    {...props}
  >
    {!!icon && <div className="px-1">{icon}</div>}
    {children}
    {isLoading && (
      <Loader
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        isLoading
      />
    )}
  </button>
);

export default Button;
