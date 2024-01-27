import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

interface ProgressbarProps {
  currentStep: number;
  totalSteps: number;
  isSubmitted?: boolean;
  accentColor?: string | null;
}

export default function Progressbar({
  currentStep,
  totalSteps,
  isSubmitted,
  accentColor,
}: ProgressbarProps) {
  const percentage =
    ((currentStep - 1 + (isSubmitted ? 1 : 0)) / totalSteps) * 100;

  const getBackgroundColor = () => {
    if (!accentColor) return undefined;

    extend([mixPlugin]);

    const color = colord(accentColor);
    const newc = color.tints(3).map((c) => c.toHex());

    return newc[1];
  };

  return (
    <div
      className="relative mt-4 h-[12px] w-full overflow-hidden rounded-lg bg-indigo-100"
      style={{ background: getBackgroundColor() }}
    >
      <div
        data-testid="progressbar"
        style={{
          width: `${percentage}%`,
          backgroundColor: accentColor ?? undefined,
        }}
        className="h-full bg-indigo-300 transition-all duration-300"
      ></div>
    </div>
  );
}
