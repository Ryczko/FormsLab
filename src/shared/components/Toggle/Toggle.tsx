import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ToggleProps {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  label?: string;
  classNames?: string;
  testId?: string;
}

function Toggle({
  classNames,
  isEnabled,
  onToggle,
  label,
  testId,
}: ToggleProps) {
  return (
    <Switch.Group>
      <div className={clsx('flex items-center', classNames)}>
        <Switch.Label className="mr-2 text-sm">{label}</Switch.Label>
        <Switch
          checked={isEnabled}
          data-test-id={testId}
          onChange={onToggle}
          className={`${
            isEnabled ? 'bg-indigo-300' : 'bg-zinc-300'
          } relative inline-flex h-5 w-9 items-center rounded-full outline-none transition-colors`}
        >
          <span
            className={`${
              isEnabled ? 'translate-x-5' : 'translate-x-1'
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}

export default Toggle;
