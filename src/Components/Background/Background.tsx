export default function Background() {
  return (
    <div
      className="fixed hidden overflow-hidden  left-1/2 transform -translate-x-1/2 -z-10 pointer-events-none xl:block opacity-70"
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
          className="opacity-80 rotate-6"
          y={180}
          x={1100}
          width="200"
          height="200"
          xlinkHref={'/emote2.svg'}
        />
        <image
          className="opacity-80 -rotate-6"
          y={100}
          x={50}
          width="200"
          height="200"
          xlinkHref={'/emote.svg'}
        />
      </svg>
    </div>
  );
}
