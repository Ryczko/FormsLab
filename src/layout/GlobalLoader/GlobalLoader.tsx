import { motion } from 'framer-motion';
import Loader from 'shared/components/Loader/Loader';
import Image from 'next/image';

import logo from '../../../public/images/logo.svg';

export default function GlobalLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, type: 'tween' }}
      className="fixed left-0 top-0 z-50 h-screen w-screen bg-zinc-100"
    >
      <div className="fixed left-[50%] top-[45%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
        <Image
          className="mx-auto"
          priority
          src={logo}
          alt="logo"
          width={260}
          height={60}
        />
        <Loader className="mt-3" isLoading />
      </div>
    </motion.div>
  );
}
