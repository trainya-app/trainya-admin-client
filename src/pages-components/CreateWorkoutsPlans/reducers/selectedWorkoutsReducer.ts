import { IWorkout } from '..';

export interface SelectedWorkoutsAction {
  type: 'ADD-WORKOUT' | 'REMOVE-WORKOUT';
  payload: any;
}

interface SelectedWorkoutsState {
  value: IWorkout[];
}

export const selectedWorkoutsReducer = (
  state: SelectedWorkoutsState,
  action: SelectedWorkoutsAction
) => {
  switch (action.type) {
    case 'ADD-WORKOUT': {
      const { payload } = action;
      const workoutIsSelected = state.value.some((el) => el.id === payload.id);

      if (workoutIsSelected) {
        return state;
      }

      return { value: [...state.value, payload] };
    }
    case 'REMOVE-WORKOUT': {
      const { payload } = action;
      const filteredState = state.value.filter((el) => el.id !== payload.id);
      return { value: filteredState };
    }
    default:
      throw new Error('The type informed is invalid');
  }
};
