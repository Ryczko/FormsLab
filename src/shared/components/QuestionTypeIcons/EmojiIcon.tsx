import { EmojiHappyIcon } from '@heroicons/react/outline';
import React from 'react';

interface EmojiIconProps {
  'data-testid'?: string;
}

const EmojiIcon: React.FC<EmojiIconProps> = ({ 'data-testid': testId }) => {
  return <EmojiHappyIcon data-testid={testId} />;
};

export default EmojiIcon;