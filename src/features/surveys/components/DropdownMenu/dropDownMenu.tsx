import React, { useState } from 'react';

type DropdownProps = {
  surveyId: string;
  onChange: (newValue: string) => void;
  onOpen: () => Promise<string[]>
  userList: string[]
};

const Dropdown = ({ surveyId, onChange, onOpen, userList }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [users, setUsers] = useState<string[]>(userList);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const handleDropdownOpen = async () => {
    
    setIsDropdownOpen(true);
    if(isDropdownOpen){
      const users = await onOpen();
      setUsers(users);
    }
  };

  const handleDropdownClose = async () => {
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <label htmlFor="userDropdown" style={{ marginRight: '8px' }}>Filter by User:</label>
      <select
        id='userDropdown'
        value={selectedValue}
        onChange={handleDropdownChange}
        style={{
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
        }}
        onClick={handleDropdownOpen}
        onBlur={handleDropdownClose}
      >
        <option value="">None</option>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
