import clsx from 'clsx';
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

export enum InputSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
}

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
  inputSize?: InputSize;
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
  inputSize = InputSize.MEDIUM,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="block text-left font-semibold">{label}</label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className={clsx(
            'my-2 block w-full rounded-md border bg-zinc-50 shadow-sm focus:outline-none',
            error && 'border-red-400',
            inputSize === InputSize.SMALL && 'h-[38px] px-3 py-1.5',
            inputSize === InputSize.MEDIUM && 'px-4 py-2 ',
            className
          )}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-4 top-2.5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeOffIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
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
