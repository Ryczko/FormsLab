import { useRouter } from 'next/router';
import { ComponentType, useEffect, useMemo } from 'react';

const withFeatureToggles = (
  WrappedComponent: ComponentType,
  features: (string | undefined)[]
) => {
  const HocComponent = ({ ...props }) => {
    const router = useRouter();
    const isFeaturesToogled = useMemo(() => features.every(Boolean), []);

    useEffect(() => {
      if (!isFeaturesToogled) {
        router.replace('/');
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFeaturesToogled]);

    return isFeaturesToogled ? <WrappedComponent {...props} /> : null;
  };

  return HocComponent;
};

export default withFeatureToggles;
