import { deleteDoc, doc, getDocs, query, collection } from 'firebase/firestore';
import { db } from 'firebaseConfiguration';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useTranslation from 'next-translate/useTranslation';

export const useRemoveSurvey = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { t } = useTranslation('surveysHooks');

  const deleteSurvey =
    (id: string, closeDeleteModal: () => void, onSuccess?: () => void) =>
      async () => {
        setIsRemoving(true);
        try {
          await deleteDoc(doc(db, 'surveys', id));

          const answersCollection = await getDocs(
            query(collection(db, 'surveys', id, 'answers'))
          );

          answersCollection.forEach(async (answer) => {
            await deleteDoc(answer.ref);
          });

          if (onSuccess) onSuccess();
          toast.success(t('surveyDeleteSuccess'));
        } catch (error) {
          toast.error(t('surveyDeleteError'));
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
