import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface BurgerMenuProps {
  isOpen: boolean;
}

const BurgerMenu = ({
  isOpen,
  children,
}: PropsWithChildren<BurgerMenuProps>) => {
  const variants = {
    open: { x: 0, transition: { type: 'linear' } },
    closed: { x: '100%', transition: { type: 'linear' } },
  };
  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      initial="closed"
      variants={variants}
      id="burger_menu"
      className="fixed left-0 top-[60px] z-10 flex w-screen flex-col items-center justify-center bg-white py-2 shadow-md lg:hidden"
    >
      {children}
    </motion.div>
  );
};

export default BurgerMenu;
