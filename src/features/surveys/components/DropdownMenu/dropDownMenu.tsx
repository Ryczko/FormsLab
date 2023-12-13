import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importujte Axios alebo inú knižnicu na HTTP požiadavky

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
    <div className="dropdown-container" onClick={handleDropdownOpen} onBlur={handleDropdownClose}>
      <select
        value={selectedValue}
        onChange={handleDropdownChange}
        className="dropdown"
      >
        <option value="">Select a name</option>
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
