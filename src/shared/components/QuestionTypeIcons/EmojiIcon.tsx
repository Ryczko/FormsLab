import { EmojiHappyIcon } from '@heroicons/react/outline';
import React from 'react';

interface EmojiIconProps {
  'data-test-id'?: string;
}

const EmojiIcon: React.FC<EmojiIconProps> = ({ 'data-test-id': testId }) => {
  return <EmojiHappyIcon data-test-id={testId} />;
};

export default EmojiIcon;