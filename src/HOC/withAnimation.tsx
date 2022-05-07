import { motion } from 'framer-motion';

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.15 }}
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
  return hocComponent;
};
