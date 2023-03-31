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
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <Switch.Label className="ml-2">{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
}

export default Toggle;
