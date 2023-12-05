import { PencilIcon } from '@heroicons/react/outline';
import React from 'react';

interface InputIconProps {
  'data-testid'?: string;
}

const InputIcon: React.FC<InputIconProps> = ({ 'data-testid': testId }) => {
  return <PencilIcon data-testid={testId} />;
};

export default InputIcon;
