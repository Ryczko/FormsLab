import Emoji from '../Emoji/Emoji';

interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

export const CustomXAxisTick = ({ x, y, payload }: CustomXAxisTickProps) => {
  console.log('custom tick', x, y, payload);
  return (
    <g transform={`translate(${x - 10},${y})`}>
      <foreignObject width={20} height={20}>
        <Emoji unified={payload.value} size={20} />
      </foreignObject>
    </g>
  );
};
