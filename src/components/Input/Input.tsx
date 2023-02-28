import React from 'react';

interface InputProps {
  label: string;
}

function Input({
  label,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="m-auto max-w-lg text-left font-semibold">
      <label className="block">{label}</label>
      <input
        {...props}
        className="mt-2 block w-full rounded-lg py-3 px-4 shadow focus:outline-none"
      />
    </div>
  );
}

export default Input;
