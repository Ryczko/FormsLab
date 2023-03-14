import { useContext } from 'react';

export const useDefinedContext = <TContext>(context: React.Context<TContext | undefined>): TContext => {
  const contextValue = useContext(context);

  if (contextValue === undefined) {
    throw new Error('Cannot use undefined context');
  }

  return contextValue;
};