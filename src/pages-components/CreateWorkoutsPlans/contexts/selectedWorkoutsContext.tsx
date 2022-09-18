import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';
import {
  SelectedWorkoutsAction,
  selectedWorkoutsReducer,
  SelectedWorkout,
} from '../reducers/selectedWorkoutsReducer';

export interface IValues {
  selectedWorkouts: SelectedWorkout[];
  selectedWorkoutsDispatch: Dispatch<SelectedWorkoutsAction>;
}

interface IProviderProps {
  children: ReactNode;
}

export const SelectedWorkoutsContext = createContext({} as IValues);

export const SelectedWorkoutsProvider = ({ children }: IProviderProps) => {
  const [selectedWorkouts, selectedWorkoutsDispatch] = useReducer(
    selectedWorkoutsReducer,
    { value: [] }
  );

  const values: IValues = useMemo(
    () => ({
      selectedWorkouts: selectedWorkouts.value,
      selectedWorkoutsDispatch,
    }),
    [selectedWorkouts, selectedWorkoutsDispatch]
  );

  return (
    <SelectedWorkoutsContext.Provider value={values}>
      {children}
    </SelectedWorkoutsContext.Provider>
  );
};
