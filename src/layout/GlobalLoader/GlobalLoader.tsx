import { motion } from 'framer-motion';
import Loader from 'shared/components/Loader/Loader';
import Image from 'next/image';

import logo from '../../../public/images/logo.svg';

export default function GlobalLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: 'tween' }}
      className="fixed top-0 left-0 z-50 h-screen w-screen bg-zinc-100"
    >
      <div className="fixed top-[45%] left-[50%] w-full translate-y-[-50%] translate-x-[-50%] text-center">
        <Image priority src={logo} alt="logo" width={260} height={60} />
        <Loader className="mt-1" isLoading />
      </div>
    </motion.div>
  );
}
