import { useCallback, useState } from 'react';

export default function useDeleteSurveyModal() {
  const [isDeleteSurveyModalOpen, setIsDeleteSurveyModalOpen] = useState(false);

  const closeDeleteSurveyModal = useCallback(() => {
    setIsDeleteSurveyModalOpen(false);
  }, [setIsDeleteSurveyModalOpen]);

  const openDeleteSurveyModal = useCallback(() => {
    setIsDeleteSurveyModalOpen(true);
  }, [setIsDeleteSurveyModalOpen]);

  return {
    isDeleteSurveyModalOpen,
    closeDeleteSurveyModal,
    openDeleteSurveyModal,
  };
}
