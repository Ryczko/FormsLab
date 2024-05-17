import { ComparisonType } from '@prisma/client';
import { Translate } from 'next-translate';

export const getAvailableComparisons = (
  availableComparisons: ComparisonType[],
  t: Translate
) => {
  const namesWithValues = availableComparisons.map((comparison) => ({
    name: t(comparison),
    value: comparison,
  }));

  namesWithValues.push({
    name: t(ComparisonType.SUBMITTED),
    value: ComparisonType.SUBMITTED,
  });

  return namesWithValues;
};
