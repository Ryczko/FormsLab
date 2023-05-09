import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import Emoji from 'features/surveys/components/Emoji/Emoji';
import useTranslation from 'next-translate/useTranslation';

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  const { t } = useTranslation('surveyAnswer');
  if (active) {
    return (
      <div className="flex flex-col items-center rounded-md border border-zinc-200 bg-white p-4 shadow-md">
        <Emoji unified={label} size={22} />
        <p className="mt-2">
          {t('tooltipValue')}&nbsp;
          {payload?.[0].value}
        </p>
      </div>
    );
  }

  return null;
};
