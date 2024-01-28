import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import useTranslation from 'next-translate/useTranslation';
import { QuestionType } from '@prisma/client';
import { postFetch, putFetch } from '../../../../../../../lib/axiosConfig';
import { defaultQuestions } from 'shared/constants/surveysConfig';
import { DRAFT_SURVEY_SESSION_STORAGE } from 'shared/constants/app';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { Question as QuestionDto } from '@prisma/client';
import { DropResult } from 'react-beautiful-dnd';

export interface Question {
  id: string;
  title: string;
  options?: string[];
  type: QuestionType;
  isRequired: boolean;
  expanded: boolean;
}

export interface SurveyOptions {
  oneQuestionPerStep: boolean;
  displayTitle: boolean;
  hideProgressBar: boolean;
  accentColor: string;
}

export const useCreateSurveyManager = (initialData?: SurveyWithQuestions) => {
  const [isEditMode] = useState(!!initialData);

  const [title, setTitle] = useState(initialData?.title ?? 'My survey');

  const mapQuestionsWithExpanded = (questions?: QuestionDto[]) => {
    return questions?.map((question) => ({
      ...question,
      expanded: false,
    }));
  };

  const [questions, setQuestions] = useState<Question[]>(
    mapQuestionsWithExpanded(initialData?.questions) ?? defaultQuestions
  );
  const [surveyOptions, setSurveyOptions] = useState<SurveyOptions>({
    oneQuestionPerStep: initialData?.oneQuestionPerStep ?? true,
    displayTitle: initialData?.displayTitle ?? true,
    hideProgressBar: initialData?.hideProgressBar ?? false,
    accentColor: initialData?.accentColor ?? '#C7D2FE',
  });

  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { copy } = useCopyToClipboard();
  const { t } = useTranslation('surveyCreate');

  const signInToCreateSurvey = () => {
    router.push('/login');
    sessionStorage.setItem(
      DRAFT_SURVEY_SESSION_STORAGE,
      JSON.stringify({
        title,
        questions,
        surveyOptions,
      })
    );
  };

  useEffect(() => {
    const draftSurvey = sessionStorage.getItem(DRAFT_SURVEY_SESSION_STORAGE);
    if (!draftSurvey) return;

    const { title, questions, surveyOptions } = JSON.parse(draftSurvey);

    setTitle(title);
    setQuestions(questions);
    setSurveyOptions(surveyOptions);
    sessionStorage.removeItem(DRAFT_SURVEY_SESSION_STORAGE);
  }, []);

  const updateSurveyOptions = (
    option: keyof SurveyOptions,
    value: boolean | string
  ) => {
    setSurveyOptions((oldOptions) => ({ ...oldOptions, [option]: value }));
  };

  const addQuestion = (newQuestion: Question) => {
    setQuestions((oldQuestions) => [...oldQuestions, newQuestion]);
    setIsSubmitted(false);
    setError('');
  };

  const removeQuestion = (index: number) => {
    setQuestions((oldQuestions) =>
      oldQuestions.filter((question, idx) => idx !== index)
    );
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError('');
    setTitle(e.target.value);
  };

  const updateQuestion = (newQuestionTitle: string, questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      newQuestion.title = newQuestionTitle;
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const updateQuestionRequired = (questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      newQuestion.isRequired = !newQuestion.isRequired;
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const isEmojiPicked = (emoji: string, questionIndex: number) => {
    const questionsEmojis = questions[questionIndex].options;
    if (questionsEmojis && questionsEmojis.includes(emoji)) {
      toast.error(t('duplicatingEmoji'));
      return true;
    }

    return false;
  };

  const handleOptionChange = (
    optionIndex: number,
    newValue: string,
    questionIndex: number,
    blockDuplicate = false
  ) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      const newOptions = [...(newQuestion.options ?? [])];

      if (!blockDuplicate || !isEmojiPicked(newValue, questionIndex)) {
        newOptions.splice(optionIndex, 1, newValue);
      }

      newQuestion.options = newOptions;
      newQuestions.splice(questionIndex, 1, newQuestion);

      return newQuestions;
    });
  };

  const handleAddingNewOption = (
    newOption: string,
    questionIndex: number,
    blockDuplicate = false
  ) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      const newOptions = [...(newQuestion.options ?? [])];

      if (!blockDuplicate || !isEmojiPicked(newOption, questionIndex)) {
        newOptions.push(newOption);
      }

      newQuestion.options = newOptions;
      newQuestions.splice(questionIndex, 1, newQuestion);

      return newQuestions;
    });
  };

  const handleOptionRemove = (optionIndex: number, questionIndex: number) => {
    const newQuestion = { ...questions[questionIndex] };
    const newOptions = [...(newQuestion.options ?? [])];
    newOptions.splice(optionIndex, 1);
    newQuestion.options = newOptions;
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const isTitleValid = (title: string) => {
    if (!title.trim()) {
      setError(t('required'));
      return false;
    }
    return true;
  };

  const areQuestionsValid = (questions: Question[]) => {
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) => {
        if (question.options?.includes('')) {
          return { ...question, expanded: true };
        }
        return question;
      })
    );

    if (
      questions.some(
        (question) => question.options?.includes('') || question.title === ''
      )
    ) {
      return false;
    }
    return true;
  };

  const isSurveyValid = () => {
    setIsSubmitted(true);
    let isValid = true;

    if (!isTitleValid(title)) {
      setError(t('required'));
      isValid = false;
    }

    if (!areQuestionsValid(questions)) {
      isValid = false;
    }

    if (!isValid) {
      toast.error(t('fillRequiredFields'));
    }

    return isValid;
  };

  const createSurvey = async () => {
    if (!isSurveyValid()) return;

    setIsCreating(true);

    try {
      const newSurvey = await postFetch('/api/survey', {
        title,
        oneQuestionPerStep: surveyOptions.oneQuestionPerStep,
        displayTitle: surveyOptions.displayTitle,
        hideProgressBar: surveyOptions.hideProgressBar,
        accentColor: surveyOptions.accentColor,
        questions: questions.map((question) => ({
          title: question.title,
          options: question.options,
          type: question.type,
          isRequired: question.isRequired,
        })),
      });

      const link = `${window.location.protocol}//${window.location.host}/survey/${newSurvey.id}`;

      const copiedCorrectly = await copy(link, true);
      await router.push(`/survey/answer/${newSurvey.id}`, undefined, {
        scroll: false,
      });
      toast.success(
        `${t('surveyCreationSuccess')} ${
          copiedCorrectly ? t('surveyCreationSucessCopiedCorrectly') : ''
        }`
      );
    } catch (error) {
      toast.error(t('surveyCreationFailed'));
    }
    setIsCreating(false);
  };

  const confirmEditSurvey = async () => {
    if (!isSurveyValid() || !initialData) return;

    setIsCreating(true);

    try {
      const newSurvey = await putFetch(`/api/survey/${initialData.id}`, {
        title,
        oneQuestionPerStep: surveyOptions.oneQuestionPerStep,
        displayTitle: surveyOptions.displayTitle,
        hideProgressBar: surveyOptions.hideProgressBar,
        accentColor: surveyOptions.accentColor,
        questions: questions.map((question) => ({
          id: question.id,
          title: question.title,
          options: question.options,
          type: question.type,
          isRequired: question.isRequired,
        })),
      });

      await router.push(`/survey/answer/${newSurvey.id}`, undefined, {
        scroll: false,
      });
    } catch (error) {
      toast.error(t('surveyCreationFailed'));
    }
    setIsCreating(false);
  };

  const discardChanges = () => {
    router.push(`/survey/answer/${initialData?.id}`, undefined, {
      scroll: false,
    });
  };

  const reorderQuestion = (startIndex: number, endIndex: number) => {
    const newOrderedQuestions = Array.from(questions);

    const [removed] = newOrderedQuestions.splice(startIndex, 1);
    newOrderedQuestions.splice(endIndex, 0, removed);

    setQuestions(newOrderedQuestions);
  };

  const expandQuestion = (questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      newQuestion.expanded = !newQuestion.expanded;
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const onDragQuestionEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    reorderQuestion(result.source.index, result.destination.index);
  };

  return {
    title,
    error,
    handleChangeTitle,
    handleOptionChange,
    handleOptionRemove,
    handleAddingNewOption,
    createSurvey,
    isCreating,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    isSubmitted,
    updateQuestionRequired,
    reorderQuestion,
    expandQuestion,
    surveyOptions,
    updateSurveyOptions,
    signInToCreateSurvey,
    isEditMode,
    confirmEditSurvey,
    discardChanges,
    onDragQuestionEnd,
  };
};

export type CreateSurveyManager = ReturnType<typeof useCreateSurveyManager>;
