import { useContext } from 'react';
import { SelectedWorkoutsContext } from '../contexts/selectedWorkoutsContext';

export const useSelectedWorkouts = () => {
  const ctx = useContext(SelectedWorkoutsContext);
  return ctx;
};
