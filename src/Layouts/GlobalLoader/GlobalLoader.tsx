import { motion } from 'framer-motion';
import Loader from '../../Components/Loader';
import Logo from '../../Components/Logo';

export default function GlobalLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: 'tween' }}
      className="bg-zinc-100 w-screen h-screen fixed top-0 left-0 z-50"
    >
      <div className="fixed text-center left-[50%] top-[45%] -translate-x-[50%] -translate-y-[50%]">
        <Logo classNames="text-6xl mb-10 leading-[80px]" />
        <Loader isLoading />
      </div>
    </motion.div>
  );
}
