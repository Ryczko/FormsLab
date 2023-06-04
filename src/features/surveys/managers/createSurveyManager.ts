import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import useTranslation from 'next-translate/useTranslation';
import { QuestionType } from '@prisma/client';
import { postFetch } from '../../../../lib/axiosConfig';
import { defaultQuestions } from 'shared/constants/surveysConfig';

export interface Question {
  title: string;
  options?: string[];
  type: QuestionType;
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

  const isEmojiPicked = (emoji: string, questionIndex: number) => {
    const questionsEmojis = questions[questionIndex].options;
    if (questionsEmojis && questionsEmojis.includes(emoji)) {
      toast.error(t('duplicatingEmoji'));
      return true;
    }

    return false;
  };

  const handleEmotePick = (
    emojiIndex: number,
    newEmote: string,
    questionIndex: number
  ) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      const newOptions = [...(newQuestion.options ?? [])];

      if (!isEmojiPicked(newEmote, questionIndex)) {
        newOptions.splice(emojiIndex, 1, newEmote);
      }

      newQuestion.options = newOptions;
      newQuestions.splice(questionIndex, 1, newQuestion);

      return newQuestions;
    });
  };

  const handleAddingNewEmote = (newEmote: string, questionIndex: number) => {
    setQuestions((oldQuestions) => {
      const newQuestions = [...oldQuestions];
      const newQuestion = { ...newQuestions[questionIndex] };
      const newOptions = [...(newQuestion.options ?? [])];

      if (!isEmojiPicked(newEmote, questionIndex)) {
        newOptions.push(newEmote);
      }

      newQuestion.options = newOptions;
      newQuestions.splice(questionIndex, 1, newQuestion);

      return newQuestions;
    });
  };

  const handleEmoteRemove = (emojiIndex: number, questionIndex: number) => {
    const newQuestion = { ...questions[questionIndex] };
    const newOptions = [...(newQuestion.options ?? [])];
    newOptions.splice(emojiIndex, 1);
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
    if (questions.map((question) => question.title).includes('')) {
      return false;
    }
    return true;
  };

  const createSurvey = async () => {
    setIsSubmitted(true);

    if (!isTitleValid(title)) {
      toast.error(t('missingFields'));
      return setError(t('required'));
    }

    if (!areQuestionsValid(questions)) {
      toast.error(t('missingFields'));
      return;
    }

    setIsCreating(true);

    try {
      const newSurvey = await postFetch('/api/survey', {
        title,
        questions: questions.map((question) => ({
          title: question.title,
          options: question.options,
          type: question.type,
        })),
      });

      const domain =
        window.location.hostname === 'localhost' ? 'http://' : 'https://';
      const link = `${domain}${window.location.host}/survey/${newSurvey.id}`;
      const copiedCorrectly = await copy(link, true);
      await router.push(`/survey/answer/${newSurvey.id}`);
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
    handleEmotePick,
    handleEmoteRemove,
    handleAddingNewEmote,
    createSurvey,
    isCreating,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    isSubmitted,
  };
};
