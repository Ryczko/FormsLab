import { createContext } from 'react';
import { useDefinedContext } from 'shared/context/useDefinedContext';

interface ty {
  ref?: null;
  setRef?: React.Dispatch<React.SetStateAction<any>>;
}

export const NavigationContext = createContext<ty>({
  ref: null,
  setRef: undefined,
});

export const useNavigationContext = () => useDefinedContext(NavigationContext);
