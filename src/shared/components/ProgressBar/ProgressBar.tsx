import clsx from 'clsx';

interface ProgressbarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function Progressbar({ currentStep, totalSteps, className }: ProgressbarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={clsx('w-full', className)}>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple" style={{ backgroundColor: '#C7D2FE' }}>

              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block" style={{ color: '#312E81' }}>

              {percentage.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-purple flex rounded" style={{ backgroundColor: '#C7D2FE' }}>
          <div
            data-testid="progressbar"
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-purple justify-center bg-C7D2FE"
          ></div>
        </div>
      </div>
    </div>
  );
}
