import { useState } from 'react';

export const usePreviewPanelManager = () => {
  const [isPanelOpened, setIsPanelOpened] = useState(false);

  const togglePanel = () => {
    setIsPanelOpened((prev) => !prev);
  };

  return {
    isPanelOpened,
    togglePanel,
  };
};

export type PreviewPanelManager = ReturnType<typeof usePreviewPanelManager>;
