import { createContext } from 'react';
import { useDefinedContext } from './../../shared/context/useDefinedContext';
import type { ApplicationManager } from './manager';


export const ApplicationContext = createContext<ApplicationManager | undefined>(undefined);

export const useApplicationContext = (): ApplicationManager => useDefinedContext(ApplicationContext);