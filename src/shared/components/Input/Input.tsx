import clsx from 'clsx';
import React from 'react';

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  absoluteError?: boolean;
}

function Input({
  type,
  label,
  value,
  placeholder,
  required,
  onChange,
  error,
  className,
  absoluteError,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="relative">
      {label && (
        <label className="block text-left font-semibold">{label}</label>
      )}
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          'mb-4 mt-2 block w-full rounded-lg border px-4 py-2 shadow focus:outline-none',
          error ? ' border-red-400' : ' border-transparent',
          className
        )}
        {...props}
      />
      {!!error && (
        <p
          className={clsx(
            'mb-1 text-right text-sm text-red-400',
            absoluteError ? 'absolute right-0 top-full my-1' : ''
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
