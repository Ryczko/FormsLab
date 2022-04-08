import React from 'react';
import clsx from 'clsx';

export enum IconButtonVariant {
  PRIMARY = 'btn-primary',
  SECONDARY = 'btn-secondary',
  OUTLINE = 'btn-outline',
  OUTLINE_PRIMARY = 'btn-outline-primary',
  DANGER = 'btn-danger',
  SUCCESS = 'btn-success',
  FLAT = 'btn-flat',
}
export enum IconButtonSize {
  DEFAULT = '',
  NORMAL = 'w-24',
  MEDIUM = 'w-32',
  LARGE = 'w-40',
  EXTRA_LARGE = 'w-48',
}
type ButtonProps = {
  variant?: IconButtonVariant;
  disabled?: boolean;
  sizeType?: IconButtonSize;
  className?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: React.ReactNode;
};

const IconButton = ({
  children,
  className,
  variant = IconButtonVariant.SECONDARY,
  sizeType = IconButtonSize.DEFAULT,
  disabled = false,
  type = 'button',
  icon,
  ...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => (
  <button
    className={clsx('btn', variant, sizeType, className, 'flex')}
    disabled={disabled}
    type={type}
    {...props}
  >
    <div>{icon}</div>
    {children}
  </button>
);

export default IconButton;
