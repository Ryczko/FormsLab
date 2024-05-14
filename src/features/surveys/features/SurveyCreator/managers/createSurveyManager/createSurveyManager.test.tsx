import { useCreateSurveyManager } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { v4 } from 'uuid';
import { act, renderHook, waitFor } from '@testing-library/react';
import { defaultQuestions } from 'shared/constants/surveysConfig';
import { useApplicationManager } from 'features/application/manager';
import { ApplicationContext } from 'features/application/context';
import { PropsWithChildren } from 'react';

jest.mock('next/router', () => require('next-router-mock'));

const NEW_QUESTION_TITLE = 'new question';

const NEW_SURVEY_TITLE = 'new survey title';

const setUp = () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    const manager = useApplicationManager();

    return (
      <ApplicationContext.Provider value={manager}>
        {children}
      </ApplicationContext.Provider>
    );
  };

  const { result } = renderHook(() => useCreateSurveyManager(), {
    wrapper: Wrapper,
  });

  act(() => {
    result.current.addQuestion({
      draftId: v4(),
      type: 'INPUT',
      title: NEW_QUESTION_TITLE,
      options: [],
      isRequired: false,
      expanded: true,
      advancedSettingsExpanded: false,
    });
  });

  return result;
};

describe('useCreateSurveyManager tests', () => {
  it('should add questions correctly', async () => {
    const result = setUp();
    act(() => {
      result.current.addQuestion({
        draftId: v4(),
        type: 'INPUT',
        title: 'test',
        options: [],
        isRequired: false,
        expanded: true,
        advancedSettingsExpanded: false,
      });
    });

    await waitFor(() => {
      expect(result.current.questions.length).toBe(defaultQuestions.length + 2);
    });
  });

  it('should remove questions correctly', async () => {
    const result = setUp();

    act(() => {
      result.current.removeQuestion(0);
    });

    await waitFor(() => {
      expect(result.current.questions.length).toBe(defaultQuestions.length);
    });
    await waitFor(() => {
      expect(result.current.questions[1].title).toBe(NEW_QUESTION_TITLE);
    });
  });

  it('should update survey title correctly', async () => {
    const result = setUp();

    const mockEvent = {
      target: {
        value: NEW_SURVEY_TITLE,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeTitle(mockEvent);
    });

    await waitFor(() => {
      expect(result.current.title).toBe(NEW_SURVEY_TITLE);
    });
  });

  it('should update question by index correctly', async () => {
    const result = setUp();

    const updatedTitle = 'updated title';

    act(() => {
      result.current.updateQuestion(updatedTitle, 0);
    });

    await waitFor(() => {
      expect(result.current.questions[0].title).toBe(updatedTitle);
    });
  });

  it('should toggle question required', async () => {
    const result = setUp();
    const lastQuestionIndex = result.current.questions.length - 1;

    act(() => {
      result.current.updateQuestionRequired(lastQuestionIndex);
    });

    await waitFor(() => {
      expect(result.current.questions[lastQuestionIndex].isRequired).toBe(true);
    });

    act(() => {
      result.current.updateQuestionRequired(lastQuestionIndex);
    });

    await waitFor(() => {
      expect(result.current.questions[lastQuestionIndex].isRequired).toBe(
        false
      );
    });
  });
});
