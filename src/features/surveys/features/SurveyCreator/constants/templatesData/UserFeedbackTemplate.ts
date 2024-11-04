import { Template } from 'features/surveys/features/SurveyCreator/components/Templates/Templates';

export const USER_FEEDBACK_TEMPLATE: Template = {
  title: 'Product Review',
  questions: [
    {
      draftId: '2e13090c-f717-4c6d-b8ca-98ef560a545d',
      type: 'RATE',
      title: 'How would you rate our product?',
      isRequired: true,
      expanded: true,
      advancedSettingsExpanded: false,
      logicPaths: [
        {
          comparisonType: 'LESS_THAN',
          selectedOption: '4',
          nextQuestionId: '37a5de87-f9af-4c5b-b952-896ec0dfa05d',
        },
      ],
    },
    {
      draftId: '1b5e995e-0303-4a8b-b8d0-1618c302bbe8',
      type: 'INPUT',
      title: 'Happy to hear 🎉 Write if you want to say something more 😊',
      isRequired: false,
      expanded: false,
      advancedSettingsExpanded: false,
      logicPaths: [
        {
          comparisonType: 'SUBMITTED',
          nextQuestionId: 'END_OF_SURVEY',
          endSurvey: true,
        },
      ],
    },
    {
      draftId: '37a5de87-f9af-4c5b-b952-896ec0dfa05d',
      type: 'INPUT',
      title: 'Sorry to hear 😟  What can we improve?',
      isRequired: true,
      expanded: false,
      advancedSettingsExpanded: false,
    },
  ],
};
