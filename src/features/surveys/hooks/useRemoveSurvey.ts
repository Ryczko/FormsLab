import { useState } from 'react';
import toast from 'react-hot-toast';
import useTranslation from 'next-translate/useTranslation';
import { deleteFetch } from '../../../../lib/axiosConfig';

export const useRemoveSurvey = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { t } = useTranslation('common');

  const deleteSurvey = async (
    id: string,
    closeDeleteModal: () => void,
    onSuccess?: () => Promise<void>
  ) => {
    setIsRemoving(true);
    try {
      await deleteFetch(`/api/survey/${id}`);
      if (onSuccess) await onSuccess();
      toast.success(t('surveyRemoving.surveyDeleteSuccess'));
    } catch (error) {
      toast.error(t('surveyRemoving.surveyDeleteError'));
    } finally {
      closeDeleteModal();
      setIsRemoving(false);
    }
  };

  return {
    deleteSurvey,
    isRemoving,
  };
};
