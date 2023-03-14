import { useDefinedContext } from './../../shared/context/useDefinedContext';
import { createContext } from 'react';
import { ApplicationManager } from './manager';


export const ApplicationContext = createContext<ApplicationManager | undefined>(undefined);

export const useApplicationContext = (): ApplicationManager => useDefinedContext(ApplicationContext);