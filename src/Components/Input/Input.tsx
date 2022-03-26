import React from 'react';

interface InputProps {
  label: string;
}

function Input({
  label,
  ...props
}: InputProps & React.HTMLProps<HTMLInputElement>) {
  return (
    <div className="max-w-lg m-auto font-semibold text-left">
      <label className="block">{label}</label>
      <input
        {...props}
        className="block mt-2 w-full py-3 px-4 focus:outline-none rounded-md shadow-md"
      />
    </div>
  );
}

export default Input;
