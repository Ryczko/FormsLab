import React from 'react';
import { useSurveyResultsContext } from 'features/surveys/features/SurveyResults/managers/context';
import ResultComponent from 'features/surveys/features/SurveyResults/components/ResultsComponents/ResultComponent';

export default function SummaryResults() {
  const { mappedAnswersData } = useSurveyResultsContext();

  return (
    <div className="mt-6">
      {Object.keys(mappedAnswersData).map((key) => (
        <ResultComponent
          key={key}
          question={mappedAnswersData[key].question}
          type={mappedAnswersData[key].questionType}
          answers={mappedAnswersData[key].answers}
        />
      ))}
    </div>
  );
}
