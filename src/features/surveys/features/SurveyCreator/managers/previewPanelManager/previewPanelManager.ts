import { useState } from 'react';

export const usePreviewPanelManager = () => {
  const [isPanelOpened, setIsPanelOpened] = useState(false);

  // useEffect(() => {
  //   if (window.innerWidth > 1280) {
  //     setIsPanelOpened(true);
  //   }
  // }, []);

  const togglePanel = () => {
    setIsPanelOpened((prev) => !prev);
  };

  return {
    isPanelOpened,
    togglePanel,
  };
};

export type PreviewPanelManager = ReturnType<typeof usePreviewPanelManager>;
