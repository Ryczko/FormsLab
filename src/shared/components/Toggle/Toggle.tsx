import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import Loader from 'shared/components/Loader/Loader';

interface ToggleProps {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  label?: string;
  classNames?: string;
  testId?: string;
  isLoading?: boolean;
}

function Toggle({
  classNames,
  isEnabled,
  onToggle,
  label,
  testId,
  isLoading,
}: ToggleProps) {
  return (
    <Switch.Group>
      <div
        className={clsx('relative flex items-center', classNames)}
        data-test-id="toggle-wrapper"
      >
        <Switch.Label className="mr-2 text-sm">{label}</Switch.Label>

        <Switch
          checked={isEnabled}
          data-test-id={testId}
          disabled={isLoading}
          onChange={onToggle}
          className={`${
            isEnabled ? 'bg-indigo-300' : 'bg-zinc-300'
          } relative inline-flex h-5 w-9 items-center rounded-full outline-none transition-colors`}
        >
          <span
            className={`${
              isEnabled ? 'translate-x-5' : 'translate-x-1'
            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
          >
            <Loader className="h-3 w-3" isLoading={!!isLoading} />
          </span>
        </Switch>
      </div>
    </Switch.Group>
  );
}

export default Toggle;
