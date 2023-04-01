import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ToggleProps {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  label?: string;
  classNames?: string;
}

function Toggle({ classNames, isEnabled, onToggle, label }: ToggleProps) {
  return (
    <Switch.Group>
      <div
        className={clsx('flex items-center', classNames)}
        data-test-id="toggle-wrapper"
      >
        <Switch
          checked={isEnabled}
          onChange={onToggle}
          className={`${
            isEnabled ? 'bg-indigo-300' : 'bg-zinc-300'
          } relative inline-flex h-5 w-9 items-center rounded-full outline-none transition-colors sm:h-6 sm:w-11`}
        >
          <span
            className={`${
              isEnabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform sm:h-4 sm:w-4`}
          />
        </Switch>
        <Switch.Label className="ml-2 text-sm sm:text-base">
          {label}
        </Switch.Label>
      </div>
    </Switch.Group>
  );
}

export default Toggle;
