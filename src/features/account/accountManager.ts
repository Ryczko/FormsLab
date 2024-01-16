import { useState } from 'react';
import { useApplicationContext } from 'features/application/context';

export const useAccountManager = () => {
  const { error, user } = useApplicationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving] = useState(false);

  function closeDeleteModal() {
    setIsOpen(false);
  }

  function openDeleteModal() {
    setIsOpen(true);
  }

  const handleOnAccountDelete = async () => {
    try {
      // provide removing account usign api here
    } catch (error) {
      /* empty */
    }
  };

  return {
    error,
    user,
    isOpen,
    closeDeleteModal,
    openDeleteModal,
    handleOnAccountDelete,
    isRemoving,
  };
};
