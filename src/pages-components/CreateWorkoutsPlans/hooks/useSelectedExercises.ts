import { useContext } from 'react';
import { SelectedExercisesContext } from '../contexts/selectedExercisesContext';

export const useSelectedExercises = () => {
  const ctx = useContext(SelectedExercisesContext);
  return ctx;
};
