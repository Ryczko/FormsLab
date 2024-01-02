import { PencilIcon } from '@heroicons/react/outline';
import React from 'react';

interface InputIconProps {
  'data-test-id'?: string;
}

const InputIcon: React.FC<InputIconProps> = ({ 'data-test-id': testId }) => {
  return <PencilIcon data-test-id={testId} />;
};

export default InputIcon;
