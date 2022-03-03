import emote from "../../Assets/emote.svg";
import emote3 from "../../Assets/emote3.svg";

function HomePage() {
    return (
        <div className="flex flex-col  overflow-hidden">
            <section className="relative mt-5">
                <div
                    className="absolute hidden left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none xl:block"
                    aria-hidden="true"
                >
                    <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
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
                                How are you{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                                    feeling?
                                </span>
                            </h1>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 mb-8">
                                    There is no better way to find out than Employee Pulse
                                </p>
                                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                                    <div>
                                        <button className="px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                                            Sign Up
                                        </button>
                                    </div>
                                    <div>
                                        <button className="px-6 py-3 rounded-md text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4">
                                            Sign In
                                        </button>
                                    </div>
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
