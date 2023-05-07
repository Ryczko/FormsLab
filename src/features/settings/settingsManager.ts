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
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useApplicationContext } from 'features/application/context';
import { auth, db } from 'firebaseConfiguration';
import { FirebaseError } from 'firebase/app';

export const useSettingsManager = () => {
  const { loading, error, user } = useApplicationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
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
      setIsRemoving(true);
      await user.delete();
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

      closeDeleteModal();
      await router.replace('/login');
      toast.success('Account deleted');
      signOut(auth);
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/requires-recent-login') {
        toast.error('For security reasons, please sign in again to delete your account');
        signOut(auth);
        await router.replace('/login');
      }
    }
    setIsRemoving(false);
  };

  return {
    loading,
    error,
    user,
    isOpen,
    closeDeleteModal,
    openDeleteModal,
    handleOnAccountDelete,
    isRemoving,
  };
};
