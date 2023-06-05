import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useRedirectWithTimeout(
  redirectTo: string,
  seconds: number
) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  const router = useRouter();

  useEffect(() => {
    if (secondsRemaining === 0) router.push('/', undefined, { scroll: false });

    const timer = setTimeout(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      if (secondsRemaining === 1)
        router.push(redirectTo, undefined, { scroll: false });
    }, 1000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining, redirectTo]);

  return { secondsRemaining };
}
