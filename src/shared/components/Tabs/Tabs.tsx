import React from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

interface TabsProps {
  categories: {
    [key: string]: React.ReactNode;
  };
}

export default function Tabs({ categories }: TabsProps) {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-[2px] rounded-md bg-indigo-200 p-[1px]">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-md py-2 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-indigo-200 focus:outline-none',
                  selected
                    ? 'bg-white text-indigo-400 shadow'
                    : 'text-indigo-800 hover:bg-white/40'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(categories).map((content, idx) => (
            <>
              <Tab.Panel
                key={idx}
                className={clsx(
                  'mt-2 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none'
                )}
              >
                {content}
              </Tab.Panel>
            </>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
