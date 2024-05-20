import React from 'react';
import TitleAndConfigSection from 'features/surveys/features/SurveyCreator/components/TitleAndConfigSection/TitleAndConfigSection';
import QuestionsSection from 'features/surveys/features/SurveyCreator/components/QuestionsSection/QuestionsSection';
import ActionButtons from 'features/surveys/features/SurveyCreator/components/ActionButtons/ActionButtons';
import clsx from 'clsx';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import PreviewPanel from 'features/surveys/features/SurveyCreator/components/PreviewPanel/PreviewPanel';
import { useNavigationContext } from 'features/surveys/features/layout/context';
import ReactDOM from 'react-dom';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import { useApplicationContext } from 'features/application/context';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import useTranslation from 'next-translate/useTranslation';
import { EyeOffIcon, EyeIcon } from '@heroicons/react/outline';
import Tabs from 'shared/components/Tabs/Tabs';
import SurveyOptionsModalModal from 'features/surveys/components/SurveyOptionsModal/SurveyOptionsModal';

export default function SurveyCreator() {
  const { isPanelOpened, togglePanel } = usePreviewPanelContext();

  const { t } = useTranslation('surveyCreate');

  const { user } = useApplicationContext();

  const {
    createSurvey,
    isCreating,
    questions,
    addQuestion,
    signInToCreateSurvey,
    isEditMode,
    confirmEditSurvey,
    discardChanges,
    surveyOptions,
    updateSurveyOptions,
  } = useSurveyCreatorContext();

  const { ref } = useNavigationContext();

  const test = () => {
    console.log('jajsldkfjlkasdjflkasdjf');
  };

  return (
    <>
      <div
        className={clsx(
          'flex-grow pb-8 pt-4 transition-all duration-500 ease-in-out',
          isPanelOpened && '2xl:mr-[550px]'
        )}
      >
        <div className="mx-auto max-w-[58rem] px-4 xl:px-8">
          <Tabs
            categories={{
              General: (
                <>
                  <TitleAndConfigSection />
                  <QuestionsSection />
                  <ActionButtons />
                </>
              ),
              'Display options': (
                <>
                  <SurveyOptionsModalModal
                    surveyOptions={surveyOptions}
                    updateOptions={updateSurveyOptions}
                  />
                </>
              ),
            }}
          />
        </div>
      </div>

      <PreviewPanel />

      {ref?.current &&
        ReactDOM.createPortal(
          <div className="flex items-center gap-2">
            <Button
              onClick={togglePanel}
              variant={ButtonVariant.PRIMARY}
              sizeType={ButtonSize.SMALL}
              icon={
                isPanelOpened ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )
              }
              data-test-id="preview-button"
            />
            <Button
              name="create-survey"
              onClick={isEditMode ? confirmEditSurvey : createSurvey}
              className="z-0 w-full"
              variant={ButtonVariant.PRIMARY}
              isLoading={isCreating}
              disabled={questions.length === 0}
            >
              {isEditMode ? t('buttonSave') : t('buttonCreate')}
            </Button>
          </div>,
          ref?.current
        )}
    </>
  );
}
