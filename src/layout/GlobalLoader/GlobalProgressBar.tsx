import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";

const GlobalProgressBar = () => {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    let timeout:ReturnType<typeof setTimeout>;

      const handleRouteChangeStart = () => {
        controls.set({height:'4px'})
        controls.start({ width: "0%" });
      clearTimeout(timeout);
    };

    const handleRouteChangeComplete = () => {
      controls.start({ width: "100%" });
      timeout = setTimeout(() => {
        controls.start({ width: "0%",height:0 });
      }, 500); // set delay time here in milliseconds
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
      clearTimeout(timeout);
    };
  }, [router.events, controls]);

  return (
    <>
      <div className="absolute top-0 left-0 z-50 w-full h-1 bg-transparent">
        <motion.div
          className="h-1 bg-blue-500"
          initial={{ width: "0%" }}
          animate={controls}
          transition={{ duration: 0.4 }}
        />
      </div>
    </>
  );
};

export default GlobalProgressBar;
