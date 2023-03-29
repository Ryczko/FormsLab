import { useCallback, useState } from 'react';

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
}
