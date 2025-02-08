/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext<[any, React.Dispatch<any>]>([
  {},
  () => null,
]);

interface StateProviderProps {
  initialState: any;
  reducer: React.Reducer<any, any>;
  children: React.ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({
  initialState,
  reducer,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
