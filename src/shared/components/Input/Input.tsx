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
  centeredError?: boolean;
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
  centeredError,
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
          'my-2 block w-full rounded-md border px-4 py-2 shadow focus:outline-none',
          error ? ' border-red-400' : ' border-transparent',
          className
        )}
        {...props}
      />
      {!!error && (
        <p
          className={clsx(
            'mb-2 text-sm text-red-400',
            centeredError ? 'text-center' : 'text-right'
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
