import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useApplicationContext } from 'src/features/application/context';
import { auth, db } from 'src/firebase';

interface SettingsManager {
  loading: boolean;
  error: Error | undefined;
  user: User | null | undefined;
  isOpen: boolean;
  closeDeleteModal: () => void;
  openDeleteModal: () => void;
  handleOnAccountDelete: () => void;
}

export const useSettingsManager = (): SettingsManager => {
  const { loading, error, user } = useApplicationContext();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function closeDeleteModal() {
    setIsOpen(false);
  }

  function openDeleteModal() {
    setIsOpen(true);
  }

  const handleOnAccountDelete = async () => {
    try {
      if (!user) {
        return;
      }
      const q = query(
        collection(db, 'surveys'),
        where('creatorId', '==', user?.uid)
      );
      const surveysCollection = await getDocs(q);
      surveysCollection.forEach(async (survey) => {
        await deleteDoc(doc(db, 'surveys', survey.id));
      });
      const answersCollection = await getDocs(
        query(collection(db, 'answers'), where('creatorId', '==', user?.uid))
      );
      answersCollection.forEach(async (answer) => {
        await deleteDoc(doc(db, 'answers', answer.id));
      });

      await deleteDoc(doc(db, 'users', user.uid));

      await user.delete();

      closeDeleteModal();
      toast.success('Account deleted');
      signOut(auth);
      router.replace('/');
    } catch (error) {
      toast.error('Error deleting account');
      console.error(error);
    }
  };

  return {
    loading,
    error,
    user,
    isOpen,
    closeDeleteModal,
    openDeleteModal,
    handleOnAccountDelete,
  };
};
