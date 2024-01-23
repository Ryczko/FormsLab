import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

type Option = {
  name: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  classNames?: string;
  onChangeCallback?: (value: Option) => void;
  selectedValue?: string;
}

export default function Select({
  options,
  classNames,
  onChangeCallback,
  selectedValue,
}: SelectProps) {
  const [selected, setSelected] = useState<Option | undefined>(
    options.find((option) => option.value === selectedValue)
  );

  const handleOnChange = (value: Option) => {
    setSelected(value);
    onChangeCallback?.(value);
  };

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      <div className={clsx('relative', classNames)}>
        <Listbox.Button className="relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected?.name ?? '-'}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-[150px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-1 text-sm px-4 ${
                    active ? 'bg-indigo-100 text-indigo-400' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
