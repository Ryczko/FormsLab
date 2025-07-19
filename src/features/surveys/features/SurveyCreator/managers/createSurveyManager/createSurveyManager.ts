import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import useTranslation from 'next-translate/useTranslation';
import { ComparisonType, QuestionType } from '@prisma/client';
import { postFetch, putFetch } from '../../../../../../../lib/axiosConfig';
import { END_OF_SURVEY } from 'shared/constants/surveysConfig';
import { DRAFT_SURVEY_SESSION_STORAGE } from 'shared/constants/app';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { LogicPath } from '@prisma/client';
import { DropResult } from 'react-beautiful-dnd';
import { CreateEditSurveyPayload } from 'pages/api/survey';
import { QuestionWithLogicPath } from 'types/QuestionWithLogicPath';
import { useApplicationContext } from 'features/application/context';
import { Page } from 'features/application/types/Page';
import { USER_FEEDBACK_TEMPLATE } from 'features/surveys/features/SurveyCreator/constants/templatesData/UserFeedbackTemplate';

export interface DraftQuestion {
  draftId: string;
  title: string;
  options?: string[];
  type: QuestionType;
  isRequired: boolean;
  logicPaths?: Partial<LogicPath>[];
  expanded: boolean;
  advancedSettingsExpanded: boolean;
}

export interface SurveyOptions {
  oneQuestionPerStep: boolean;
  displayTitle: boolean;
  hideProgressBar: boolean;
  accentColor: string;
}

export const useCreateSurveyManager = (initialData?: SurveyWithQuestions) => {
  const { setActivePage } = useApplicationContext();

  const [isEditMode] = useState(!!initialData);
  const [title, setTitle] = useState(initialData?.title ?? 'My survey');
  const [isLoaded, setIsLoaded] = useState(isEditMode);

  const mapQuestionsWithExpanded = (
    questions: QuestionWithLogicPath[]
  ): DraftQuestion[] => {
    return questions.map((question) => ({
      ...question,
      expanded: false,
      advancedSettingsExpanded: false,
      draftId: question.id,
      logicPaths: question.logicPaths?.map((path) => ({
        ...path,
        nextQuestionId: path.endSurvey ? END_OF_SURVEY : path.nextQuestionId,
      })),
    }));
  };

  const [questions, setQuestions] = useState<DraftQuestion[]>(
    initialData ? mapQuestionsWithExpanded(initialData.questions) : []
  );
  const [surveyOptions, setSurveyOptions] = useState<SurveyOptions>({
    oneQuestionPerStep: initialData?.oneQuestionPerStep ?? true,
    displayTitle: initialData?.displayTitle ?? false,
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
  };

  useEffect(() => {
    if (isEditMode) return;

    if (typeof window !== 'undefined' && isLoaded) {
      sessionStorage.setItem(
        DRAFT_SURVEY_SESSION_STORAGE,
        JSON.stringify({
          title,
          questions,
          surveyOptions,
        })
      );
    }
  }, [title, questions, surveyOptions, isEditMode, isLoaded]);

  useEffect(() => {
    setActivePage(isEditMode ? Page.EDIT_SURVEY : Page.CREATE_SURVEY);
    if (!isEditMode && typeof window !== 'undefined') {
      const draftSurvey = sessionStorage.getItem(DRAFT_SURVEY_SESSION_STORAGE);
      if (draftSurvey) {
        const { title, questions, surveyOptions } = JSON.parse(draftSurvey);
        if (title !== undefined) setTitle(title);
        if (questions !== undefined) setQuestions(questions);
        if (surveyOptions !== undefined) setSurveyOptions(surveyOptions);
      } else {
        setTitle(USER_FEEDBACK_TEMPLATE.title);
        setQuestions(USER_FEEDBACK_TEMPLATE.questions);
      }
      setIsLoaded(true);
    } else if (isEditMode) {
      setIsLoaded(true);
    }
    return () => {
      setActivePage(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSurveyOptions = (
    option: keyof SurveyOptions,
    value: boolean | string
  ) => {
    setSurveyOptions((oldOptions) => ({ ...oldOptions, [option]: value }));
  };

  const addQuestion = (newQuestion: DraftQuestion) => {
    setQuestions((oldQuestions) => [...oldQuestions, newQuestion]);
    setIsSubmitted(false);
    setError('');
  };

  const removeAllQuestions = () => {
    setQuestions([]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((oldQuestions) => {
      oldQuestions.forEach((question) => {
        question.logicPaths?.forEach((path) => {
          if (path.nextQuestionId === questions[index].draftId) {
            path.nextQuestionId = undefined;
          }
        });
      });

      return oldQuestions.filter((question, idx) => idx !== index);
    });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError('');
    setTitle(e.target.value);
  };

  const updateQuestion = (newQuestionTitle: string, questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      newQuestion.title = newQuestionTitle.trimStart();
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
      oldQuestions[questionIndex].logicPaths?.forEach((path) => {
        if (
          path.selectedOption ===
          oldQuestions[questionIndex].options?.[optionIndex]
        ) {
          path.selectedOption = undefined;
        }
      });

      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      const newOptions = [...(newQuestion.options ?? [])];

      if (!blockDuplicate || !isEmojiPicked(newValue, questionIndex)) {
        newOptions.splice(optionIndex, 1, newValue.trimStart());
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
    setQuestions((oldQuestions) => {
      oldQuestions[questionIndex].logicPaths?.forEach((path) => {
        if (
          path.selectedOption ===
          oldQuestions[questionIndex].options?.[optionIndex]
        ) {
          path.selectedOption = undefined;
        }
      });

      const newQuestion = { ...questions[questionIndex] };
      const newOptions = [...(newQuestion.options ?? [])];
      newOptions.splice(optionIndex, 1);
      newQuestion.options = newOptions;

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

  const areQuestionsValid = (questions: DraftQuestion[]) => {
    const questionIndexesToExpand: number[] = [];
    const andvancedSettingsIndexesToExpand: number[] = [];

    questions.forEach((question, index) => {
      if (question.options?.includes('')) {
        questionIndexesToExpand.push(index);
      }

      if (
        question.logicPaths?.some(
          (path) =>
            (path.comparisonType !== ComparisonType.SUBMITTED &&
              !path.selectedOption) ||
            !path.comparisonType ||
            !path.nextQuestionId
        )
      ) {
        questionIndexesToExpand.push(index);
        andvancedSettingsIndexesToExpand.push(index);
      }
    });

    const newQuestions = questions.map((question, index) => {
      const newQuestion = { ...question };
      if (questionIndexesToExpand.includes(index)) {
        newQuestion.expanded = true;
      }

      if (andvancedSettingsIndexesToExpand.includes(index)) {
        newQuestion.advancedSettingsExpanded = true;
      }

      return newQuestion;
    });

    setQuestions(newQuestions);

    if (
      questions.some((question) => question.title === '') ||
      questionIndexesToExpand.length > 0 ||
      andvancedSettingsIndexesToExpand.length > 0
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

  const getCreateEditSurveyPayload = (): CreateEditSurveyPayload => {
    return {
      title,
      oneQuestionPerStep: surveyOptions.oneQuestionPerStep,
      displayTitle: surveyOptions.displayTitle,
      hideProgressBar: surveyOptions.hideProgressBar,
      accentColor: surveyOptions.accentColor,
      questions: questions.map((question) => ({
        draftId: question.draftId,
        title: question.title,
        options: question.options ?? [],
        type: question.type,
        isRequired: question.isRequired,
        logicPaths: question.logicPaths?.map((path) => ({
          comparisonType: path.comparisonType as ComparisonType,
          selectedOption: path.selectedOption as string,
          nextQuestionOrder: questions.findIndex(
            (question) => question.draftId === path.nextQuestionId
          ),
        })),
      })),
    };
  };

  const createSurvey = async () => {
    if (!isSurveyValid()) return;

    setIsCreating(true);

    try {
      const newSurveyPayload = getCreateEditSurveyPayload();

      const newSurvey = await postFetch<CreateEditSurveyPayload>(
        '/api/survey',
        newSurveyPayload
      );

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
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(DRAFT_SURVEY_SESSION_STORAGE);
      }
    } catch (error) {
      toast.error(t('surveyCreationFailed'));
    }
    setIsCreating(false);
  };

  const confirmEditSurvey = async () => {
    if (!isSurveyValid() || !initialData) return;

    setIsCreating(true);

    try {
      const newSurveyPayload = getCreateEditSurveyPayload();

      const newSurvey = await putFetch<CreateEditSurveyPayload>(
        `/api/survey/${initialData.id}`,
        newSurveyPayload
      );

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

  const expandAdvancedSettings = (questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      newQuestion.advancedSettingsExpanded =
        !newQuestion.advancedSettingsExpanded;
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

  const addLogicPath = (questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      newQuestion.logicPaths = [...(newQuestion.logicPaths ?? []), {}];
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const removeLogicPath = (questionIndex: number, logicPathIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      const newLogicPath = [...(newQuestion.logicPaths ?? [])];
      newLogicPath.splice(logicPathIndex, 1);
      newQuestion.logicPaths = newLogicPath;
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const updateLogicPath = (
    questionIndex: number,
    logicPathIndex: number,
    conditions: Partial<LogicPath>
  ) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };

      const newLogicPath = [...(newQuestion.logicPaths ?? [])];
      const newLogicPathItem = {
        ...newLogicPath[logicPathIndex],
        ...conditions,
      };

      newLogicPath.splice(logicPathIndex, 1, newLogicPathItem);
      newQuestion.logicPaths = newLogicPath;
      newQuestions.splice(questionIndex, 1, newQuestion);
      return newQuestions;
    });
  };

  const selectTemplate = (title: string, questions: DraftQuestion[]) => {
    setTitle(title);
    setQuestions(questions);
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
    addLogicPath,
    removeLogicPath,
    updateLogicPath,
    expandAdvancedSettings,
    selectTemplate,
    removeAllQuestions,
  };
};

export type CreateSurveyManager = ReturnType<typeof useCreateSurveyManager>;
