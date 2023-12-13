import React, { useState } from 'react';

type DropdownProps = {
  surveyId: string;
  onChange: (newValue: string) => void;
};

const Dropdown = ({ surveyId, onChange }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="dropdown-container">
      <select
        value={selectedValue}
        onChange={handleDropdownChange}
        className="dropdown"
      >
        <option value="">Select a name</option>
        <option value="Samuel Repko">Samuel Repko</option>
        <option value="Kukucka">Kukucka</option>
      </select>
    </div>
  );
};

export default Dropdown;