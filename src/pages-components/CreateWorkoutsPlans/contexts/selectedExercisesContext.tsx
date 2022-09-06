import { createContext, ReactNode, useReducer, Dispatch, useMemo } from 'react';
import { IExercise } from '..';
import {
  SelectedExercisesAction,
  selectedExercisesReducer,
} from '../reducers/selectedExercisesReducer';

export interface IValues {
  selectedExercises: IExercise[];
  selectedExercisesDispatch: Dispatch<SelectedExercisesAction>;
}

interface IProviderProps {
  children: ReactNode;
}

export const SelectedExercisesContext = createContext({} as IValues);

export const SelectedExercisesProvider = ({ children }: IProviderProps) => {
  const [selectedExercises, selectedExercisesDispatch] = useReducer(
    selectedExercisesReducer,
    { value: [] }
  );

  const values: IValues = useMemo(
    () => ({
      selectedExercises: selectedExercises.value,
      selectedExercisesDispatch,
    }),
    [selectedExercises, selectedExercisesDispatch]
  );

  return (
    <SelectedExercisesContext.Provider value={values}>
      {children}
    </SelectedExercisesContext.Provider>
  );
};
