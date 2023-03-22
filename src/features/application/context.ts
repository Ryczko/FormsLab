import { createContext } from 'react';
import { useDefinedContext } from 'shared/context/useDefinedContext';
import { ApplicationManager } from 'features/application/manager';

export const ApplicationContext = createContext<ApplicationManager | undefined>(
  undefined
);

export const useApplicationContext = (): ApplicationManager =>
  useDefinedContext(ApplicationContext);
