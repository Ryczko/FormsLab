import React from 'react';
import clsx from 'clsx';
import { ButtonProps, ButtonSize, ButtonVariant } from '../Button/Button';

export const IconButtonVariant = ButtonVariant;
export const IconButtonSize = ButtonSize;

export type IconButtonProps = ButtonProps & {
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
}: IconButtonProps & React.HTMLProps<HTMLButtonElement>) => (
  <button
    className={clsx('btn', variant, sizeType, className, 'flex items-center')}
    disabled={disabled}
    type={type}
    {...props}
  >
    <div className="px-1">{icon}</div>
    {children}
  </button>
);

export default IconButton;
