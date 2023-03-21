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
      className="fixed top-[70px] left-0 z-10 flex w-screen flex-col items-center justify-center bg-zinc-100 py-2 shadow-md lg:hidden"
    >
      {children}
    </motion.div>
  );
};

export default BurgerMenu;
