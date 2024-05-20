import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Emoji from 'features/surveys/components/Emoji/Emoji';

type Option = {
  name: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  classNames?: string;
  onChangeCallback?: (value: Option) => void;
  selectedValue?: string;
  disabled?: boolean;
  emojiContent?: boolean;
  required?: boolean;
  submitted?: boolean;
}

export default function Select({
  options,
  classNames,
  onChangeCallback,
  selectedValue,
  disabled,
  emojiContent,
  required,
  submitted,
}: SelectProps) {
  const selectedItem = options.find((option) => option.value === selectedValue);

  const handleOnChange = (value: Option) => {
    onChangeCallback?.(value);
  };

  return (
    <Listbox value={selectedItem} onChange={handleOnChange} disabled={disabled}>
      <div
        className={clsx('relative', classNames, emojiContent && 'max-w-[80px]')}
      >
        <Listbox.Button
          className={clsx(
            'relative w-full rounded-md border py-1 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
            disabled
              ? 'cursor-not-allowed bg-gray-100'
              : 'cursor-default bg-white',
            required && submitted && !selectedItem?.value && 'border-red-500'
          )}
        >
          <span className="block max-w-[150px] truncate">
            {selectedItem?.name ? (
              emojiContent ? (
                <Emoji size={18} shortcodes={selectedItem?.name || ''} />
              ) : (
                selectedItem?.name
              )
            ) : (
              '-'
            )}
          </span>
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
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-1 text-sm text-left px-4 ${
                    active ? 'bg-indigo-100 text-indigo-400' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {emojiContent ? (
                        <Emoji size={18} shortcodes={option?.name || ''} />
                      ) : (
                        option.name
                      )}
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
