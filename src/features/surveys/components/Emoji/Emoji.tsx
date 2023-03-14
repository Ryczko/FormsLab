type EmojiProps = {
  symbol: string;
  label?: string;
};

export default function Emoji({ symbol, label }: EmojiProps) {
  return (
    <span
      role="img"
      aria-label={label ? label : ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
}
