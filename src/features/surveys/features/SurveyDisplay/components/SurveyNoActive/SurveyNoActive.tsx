import React from 'react';
import useTranslation from 'next-translate/useTranslation';

export default function SurveyNoActive() {
  const { t } = useTranslation('survey');

  return (
    <>
      <div className="text-5xl">🙁</div>
      <div className="my-5 text-xl">{t('surveyNoLongerActive')}</div>
    </>
  );
}
