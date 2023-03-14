import React from 'react';

interface InputProps {
  label: string;
}

function Input({
  label,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="m-auto max-w-lg font-semibold text-left">
      <label className="block">{label}</label>
      <input
        {...props}
        className="block py-3 px-4 mt-2 w-full rounded-lg focus:outline-none shadow"
      />
    </div>
  );
}

export default Input;
