import { PropsWithChildren } from 'react';

export default function QuestionBlockWrapper(props: PropsWithChildren) {
  return (
    <div className="relative my-8">
      {/* <div className="absolute right-0 top-0 translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-full bg-white p-3 shadow-md hover:scale-95">
        <TrashIcon className="w-[25px] text-sm text-red-700" />
      </div> */}
      {props.children}
    </div>
  );
}
