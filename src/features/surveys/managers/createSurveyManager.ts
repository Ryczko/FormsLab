import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import useTranslation from 'next-translate/useTranslation';
import { QuestionType } from '@prisma/client';
import { postFetch } from '../../../../lib/axiosConfig';
import { defaultQuestions } from 'shared/constants/surveysConfig';

export interface Question {
  id: string;
  title: string;
  options?: string[];
  type: QuestionType;
  isRequired: boolean;
}

export const useCreateSurveyManager = () => {
  const [title, setTitle] = useState('');

  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);

  const [error, setError] = useState('');

  const addQuestion = (newQuestion: Question) => {
    setQuestions((oldQuestions) => [...oldQuestions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((oldQuestions) =>
      oldQuestions.filter((question, idx) => idx !== index)
    );
  };

  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();
  const { copy } = useCopyToClipboard();
  const { t } = useTranslation('surveyCreate');

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

    if (!isTitleValid(title)) {
      toast.error(t('fillRequiredFields'));
      setError(t('required'));
      return false;
    }

    if (!areQuestionsValid(questions)) {
      toast.error(t('fillRequiredFields'));
      return false;
    }

    return true;
  };

  const createSurvey = async () => {
    if (!isSurveyValid()) return;

    setIsCreating(true);

    try {
      const newSurvey = await postFetch('/api/survey', {
        title,
        questions: questions.map((question) => ({
          title: question.title,
          options: question.options,
          type: question.type,
          isRequired: question.isRequired,
        })),
      });

      const domain =
        window.location.hostname === 'localhost' ? 'http://' : 'https://';
      const link = `${domain}${window.location.host}/survey/${newSurvey.id}`;
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
  };
};
