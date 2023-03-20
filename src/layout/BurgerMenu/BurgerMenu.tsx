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
      className="flex fixed top-[70px] left-0 z-10 flex-col justify-center items-center py-2 w-screen bg-zinc-100 shadow-md lg:hidden"
    >
      {children}
    </motion.div>
  );
};

export default BurgerMenu;
