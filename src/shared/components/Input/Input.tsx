import React from 'react';

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({
  type,
  value,
  placeholder,
  required,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="block py-2 pr-4 pl-2 mt-2 w-full rounded-lg focus:outline-none shadow"
      />

      <p className="self-center max-w-sm text-sm text-center text-red-300">
        {error}
      </p>
    </div>
  );
}

export default Input;
