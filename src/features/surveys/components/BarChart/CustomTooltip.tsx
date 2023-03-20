import type { TooltipProps } from 'recharts';
import type {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import Emoji from '../Emoji/Emoji';

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="flex flex-col items-center rounded-md border border-zinc-200 bg-white p-4 shadow-md">
        <Emoji unified={label} size={22} />
        <p className="mt-2"> value: {payload?.[0].value}</p>
      </div>
    );
  }

  return null;
};
