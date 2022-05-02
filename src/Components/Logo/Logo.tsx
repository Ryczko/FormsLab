import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to={'/'} className="flex items-center font-serif text-2xl text-zinc-600">
      Employee Pulse
    </Link>
  );
}

export default Logo;
