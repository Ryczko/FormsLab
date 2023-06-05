import { motion } from 'framer-motion';
import { FunctionComponent } from 'react';

const withAnimation = <T extends object>(
  WrappedComponent: FunctionComponent<T>
) => {
  const hocComponent: FunctionComponent<T> = ({ ...props }) => (
    <motion.div
      data-test-id="loading"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.15 }}
      onAnimationComplete={() => {
        window.scroll(0, 0);
      }}
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
  return hocComponent;
};

export default withAnimation;
