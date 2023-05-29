import Emoji from 'features/surveys/components/Emoji/Emoji';

interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

export const CustomXAxisTick = ({ x, y, payload }: CustomXAxisTickProps) => {
  return (
    <g transform={`translate(${x - 10},${y - 2})`}>
      <foreignObject width={20} height={22}>
        <Emoji shortcodes={payload.value} size={20} />
      </foreignObject>
    </g>
  );
};
