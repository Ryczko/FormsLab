interface ProgressbarProps {
  currentStep: number;
  totalSteps: number;
  isSubmitted?: boolean;
}

export default function Progressbar({
  currentStep,
  totalSteps,
  isSubmitted,
}: ProgressbarProps) {
  const percentage =
    ((currentStep - 1 + (isSubmitted ? 1 : 0)) / totalSteps) * 100;

  return (
    <div className="relative mt-4 h-[24px] w-full overflow-hidden rounded-lg bg-indigo-100">
      <div
        data-testid="progressbar"
        style={{ width: `${percentage}%` }}
        className="h-full bg-indigo-300 transition-all duration-300"
      ></div>
      <span className="text-purple absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold">
        {isSubmitted ? (
          <span>Submitting...</span>
        ) : (
          <span>
            {currentStep - 1} of {totalSteps} completed
          </span>
        )}
      </span>
    </div>
  );
}
