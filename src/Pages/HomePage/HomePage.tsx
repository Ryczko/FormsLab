import { Link } from 'react-router-dom';
import emote from '../../Assets/emote.svg';
import emote3 from '../../Assets/emote3.svg';
import Button, { ButtonSize, ButtonVariant } from '../../Components/Button';

function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <section className="relative mt-5">
        <div
          className="absolute hidden left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none xl:block"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
            <image
              className="opacity-80 rotate-12"
              y={180}
              x={1100}
              cx="1232"
              cy="128"
              r="128"
              xlinkHref={emote}
            />
            <image
              className="opacity-80 -rotate-12"
              y={140}
              x={110}
              cx="1232"
              cy="128"
              r="128"
              xlinkHref={emote3}
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                How are you{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-100">
                  feeling?
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-zinc-600 mb-8">
                  There is no better way to find out than Employee Pulse
                </p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <Link to={'/login'}>
                    <Button
                      variant={ButtonVariant.PRIMARY}
                      sizeType={ButtonSize.MEDIUM}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
