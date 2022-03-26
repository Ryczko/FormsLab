import { Link } from 'react-router-dom';
import './index.scss';

function Logo() {
  return (
    <Link to={'/'} className="flex items-center text-zinc-600">
      <div className="heart mr-4"></div>
      Employee Pulse
    </Link>
  );
}

export default Logo;
