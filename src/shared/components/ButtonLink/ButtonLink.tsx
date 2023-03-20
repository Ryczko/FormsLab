import type React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ButtonProps} from '../Button/Button';
import { ButtonSize, ButtonVariant } from '../Button/Button';

export const ButtonLinkVariant = ButtonVariant;
export const ButtonLinkSize = ButtonSize;

const ButtonLink = forwardRef(function ButtonLink({
  children,
  className,
  variant = ButtonLinkVariant.SECONDARY,
  sizeType = ButtonLinkSize.DEFAULT,
  ...props
}: ButtonProps & React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={clsx(
        'btn',
        variant,
        sizeType,
        'hover:no-underline',
        className
      )}
    >
      {children}
    </a>
  );
});

export default ButtonLink;
