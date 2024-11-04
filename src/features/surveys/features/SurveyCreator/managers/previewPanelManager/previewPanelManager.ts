import { useState } from 'react';

export const usePreviewPanelManager = () => {
  const [isPanelOpened, setIsPanelOpened] = useState(false);

  const [restartTrigger, setRestartTrigger] = useState(0);

  const handleRestart = () => {
    setRestartTrigger((prev) => prev + 1);
  };

  const togglePanel = () => {
    setIsPanelOpened((prev) => !prev);
  };

  return {
    isPanelOpened,
    togglePanel,
    restartTrigger,
    handleRestart,
  };
};

export type PreviewPanelManager = ReturnType<typeof usePreviewPanelManager>;
