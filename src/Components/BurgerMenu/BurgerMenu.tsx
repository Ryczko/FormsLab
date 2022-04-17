import { motion } from 'framer-motion';


// eslint-disable-next-line react/prop-types
const BurgerMenu = ({ isOpen, children }) => {
  const variants = {
    open: { x: 0, transition: { type: 'linear' } },
    closed: { x: '100%', transition: { type: 'linear' } },
  };
  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      initial='closed'
      variants={variants}
      id='burger_menu'
      className='fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen bg-zinc-100 md:hidden'
    >
      {children}
    </motion.div>
  );
};
export default BurgerMenu;