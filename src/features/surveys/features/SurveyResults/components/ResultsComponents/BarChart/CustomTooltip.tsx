import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import useTranslation from 'next-translate/useTranslation';
import Emoji from 'features/surveys/components/Emoji/Emoji';

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  emojiLabels?: boolean;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  emojiLabels,
}: CustomTooltipProps) => {
  const { t } = useTranslation('surveyAnswer');
  if (active) {
    return (
      <div className="flex flex-col items-center rounded-md border border-zinc-200 bg-white p-4 shadow-md">
        {emojiLabels ? <Emoji shortcodes={label} size={22} /> : <p>{label}</p>}
        <p className="mt-2">
          {t('tooltipValue')}&nbsp;
          {payload?.[0].value}
        </p>
      </div>
    );
  }

  return null;
};
