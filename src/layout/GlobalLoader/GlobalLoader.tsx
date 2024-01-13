import { motion } from 'framer-motion';
import Loader from 'shared/components/Loader/Loader';
import Image from 'next/image';

import logo from '../../../public/images/logo.svg';
import Background from 'layout/Background/Background';

export default function GlobalLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: 'tween' }}
      className="fixed left-0 top-0 z-50 h-screen w-screen"
    >
      <Background />
      <div className="fixed left-[50%] top-[45%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
        <Image className="mx-auto" priority src={logo} alt="logo" width={190} />
        <Loader className="mt-5" isLoading />
      </div>
    </motion.div>
  );
}
