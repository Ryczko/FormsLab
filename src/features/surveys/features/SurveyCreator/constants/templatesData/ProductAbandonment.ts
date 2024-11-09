import { Template } from 'features/surveys/features/SurveyCreator/components/Templates/Templates';

export const PRODUCT_ABANDONMENT_TEMPLATE: Template = {
  title: 'Product Abandonment',
  questions: [
    {
      draftId: 'b3b59611-8b33-4f31-b710-642b4700a6b8',
      type: 'CHOICE',
      title: 'Why did you stop your subscription?',
      isRequired: true,
      options: [
        'I did not get much value out of it',
        'I expected something else',
        'It is too expensive for me',
        'I do not want to give details',
      ],
      expanded: true,
      advancedSettingsExpanded: false,
      logicPaths: [
        {
          comparisonType: 'EQUAL',
          selectedOption: 'I did not get much value out of it',
          nextQuestionId: 'f9ac4e1b-0a80-4dc1-85d7-83195983bdb9',
        },
        {
          comparisonType: 'EQUAL',
          selectedOption: 'I expected something else',
          nextQuestionId: 'f9ac4e1b-0a80-4dc1-85d7-83195983bdb9',
        },
        {
          comparisonType: 'EQUAL',
          selectedOption: 'It is too expensive for me',
          nextQuestionId: '2f1cee49-0c37-43a8-b3f4-ad331a77061f',
        },
        {
          comparisonType: 'EQUAL',
          selectedOption: 'I do not want to give details',
          nextQuestionId: 'END_OF_SURVEY',
          endSurvey: true,
        },
      ],
    },
    {
      draftId: 'f9ac4e1b-0a80-4dc1-85d7-83195983bdb9',
      type: 'INPUT',
      title: 'Sorry to hear 😟 What is the biggest problem of our product?',
      isRequired: true,
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
      draftId: '2f1cee49-0c37-43a8-b3f4-ad331a77061f',
      type: 'INPUT',
      title: 'Sorry to hear 😟 What price would you be satisfied with?',
      isRequired: true,
      expanded: false,
      advancedSettingsExpanded: false,
    },
  ],
};
