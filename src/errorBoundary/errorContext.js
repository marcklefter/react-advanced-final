import {
  createContext,
  useContext
} from 'react';

// ...

const ErrorContext = createContext();

export function ErrorProvider({ value, children }) {
  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  )
}

export function useErrorHandler() {
  return useContext(ErrorContext);
}
