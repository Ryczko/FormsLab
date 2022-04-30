import './Loader.scss';

type Props = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: Props) {
  if (isLoading) return <div className="loader"></div>;
  return null;
}
