import React from 'react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => (
    <div className="m-auto my-2 w-full max-w-md font-semibold text-left">
      <label className="block">{label}</label>
      <input
        {...props}
        ref={ref}
        className="block py-2 pr-4 pl-2 mt-2 w-full rounded-lg focus:outline-none shadow"
      />
    </div>
  )
);

export default Input;
