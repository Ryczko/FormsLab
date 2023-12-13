import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

type DropdownProps = {
  surveyId: string;
  onChange: (newValue: string) => void;
};

const Dropdown = ({ surveyId, onChange }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/survey/users/${surveyId}`);
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isDropdownOpen) {
      fetchUsers();
    }
  }, [surveyId, isDropdownOpen]);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <label htmlFor="userDropdown" style={{ marginRight: '8px' }}>Filter by User:</label>
      <select
        id='userDropdown'  // Make sure this id matches the htmlFor attribute of the label
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
