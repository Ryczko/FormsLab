import { createContext } from 'react';
import { useDefinedContext } from 'shared/context/useDefinedContext';
import { PreviewPanelManager } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/previewPanelManager';

export const PreviewPanelContext = createContext<
  PreviewPanelManager | undefined
>(undefined);

export const usePreviewPanelContext = (): PreviewPanelManager =>
  useDefinedContext(PreviewPanelContext);
