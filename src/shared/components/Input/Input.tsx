import clsx from 'clsx';
import React from 'react';

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

function Input({
  type,
  value,
  placeholder,
  required,
  onChange,
  error,
  className,
}: InputProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          className,
          'block py-2 px-4 mt-2 mb-4 w-full rounded-lg focus:outline-none shadow',
          error ? 'border border-red-400' : ''
        )}
      />

      {!!error && (
        <p className="mb-2 max-w-sm text-sm text-right text-red-400">{error}</p>
      )}
    </>
  );
}

export default Input;
