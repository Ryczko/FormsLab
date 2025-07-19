import { useState, useEffect } from 'react';

export const usePreviewPanelManager = () => {
  const [isPanelOpened, setIsPanelOpened] = useState(false);
  const [openedWithoutAnimation, setOpenedWithoutAnimation] = useState(false);
  const [restartTrigger, setRestartTrigger] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      setIsPanelOpened(true);
      setOpenedWithoutAnimation(true);
    }
  }, []);

  const handleRestart = () => {
    setRestartTrigger((prev) => prev + 1);
  };

  const togglePanel = () => {
    setIsPanelOpened((prev) => !prev);
    setOpenedWithoutAnimation(false);
  };

  return {
    isPanelOpened,
    togglePanel,
    restartTrigger,
    handleRestart,
    openedWithoutAnimation,
  };
};

export type PreviewPanelManager = ReturnType<typeof usePreviewPanelManager>;
