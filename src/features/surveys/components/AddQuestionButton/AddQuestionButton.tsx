import { PlusCircleIcon } from '@heroicons/react/outline';

export const AddQuestionButton = () => {
  return (
    <button className="my-4 flex h-[60px] w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-400 duration-300 hover:scale-95">
      Add question <PlusCircleIcon className="m-2 h-6 w-6" />
    </button>
  );
};
