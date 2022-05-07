import { motion } from 'framer-motion';

interface BurgerMenuProps {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const BurgerMenu = ({ isOpen, children }: BurgerMenuProps) => {
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
      className="fixed shadow-md left-0 z-10 flex flex-col items-center justify-center w-screen top-20 bg-zinc-100 md:hidden"
    >
      {children}
    </motion.div>
  );
};

export default BurgerMenu;
