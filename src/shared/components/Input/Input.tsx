import clsx from 'clsx';
import type React from 'react';

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
}: InputProps & React.HTMLProps<HTMLInputElement>) {
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
          'mt-2 mb-4 block w-full rounded-lg py-2 px-4 shadow focus:outline-none',
          error ? 'border border-red-400' : ''
        )}
      />
      {!!error && (
        <p className="mb-2 max-w-sm text-right text-sm text-red-400">{error}</p>
      )}
    </>
  );
}

export default Input;
