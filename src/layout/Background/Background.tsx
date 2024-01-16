import { useRouter } from 'next/router';
import { HIDDEN_ELEMENTS_ROUTES } from 'shared/constants/routesConfig';

/* eslint-disable tailwindcss/no-contradicting-classname */
export default function Background() {
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 -z-10  h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        {!HIDDEN_ELEMENTS_ROUTES.includes(router.pathname) && (
          <>
            <div className="absolute bottom-auto left-auto right-0 top-0 hidden h-[300px] w-[300px] translate-x-[-30%] translate-y-[20%] rounded-full bg-[#C6D4FB] opacity-25 blur-[80px] xl:block"></div>
            <div className="absolute bottom-auto left-0 right-auto top-0 hidden h-[400px] w-[400px] translate-x-[0%] translate-y-[100%] rounded-full bg-[#C6D4FB] opacity-25 blur-[80px] xl:block"></div>
          </>
        )}
      </div>
    </>
  );
}
