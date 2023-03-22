import { motion } from 'framer-motion';
import Loader from 'shared/components/Loader/Loader';
import Logo from 'layout/Logo/Logo';

export default function GlobalLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: 'tween' }}
      className="fixed top-0 left-0 z-50 h-screen w-screen bg-zinc-100"
    >
      <div className="fixed top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
        <Logo classNames="!text-6xl !mb-10 !ml-0 !leading-[80px]" />
        <Loader isLoading />
      </div>
    </motion.div>
  );
}
