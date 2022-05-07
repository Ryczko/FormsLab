import { motion } from 'framer-motion';

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => (
    <motion.div
      initial={{ opacity: 0, x: '50%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-50%' }}
      transition={{ duration: 0.3, type: 'tween' }}
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
  return hocComponent;
};
