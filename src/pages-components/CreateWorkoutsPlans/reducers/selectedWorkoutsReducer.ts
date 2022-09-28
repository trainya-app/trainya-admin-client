import { Workout } from '../@types/Workout';

export interface SelectedWorkout extends Workout {
  exercisesCount: number;
}

export interface SelectedWorkoutsAction {
  type:
    | 'ADD-WORKOUT'
    | 'REMOVE-WORKOUT'
    | 'UPDATE-WORKOUT'
    | 'REPLACE-WORKOUTS';
  payload: any;
}

interface SelectedWorkoutsState {
  value: SelectedWorkout[];
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
    case 'UPDATE-WORKOUT': {
      const { payload } = action;
      const mappedState = state.value.map((el) => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      });

      return { value: mappedState };
    }
    case 'REPLACE-WORKOUTS': {
      return { value: action.payload };
    }
    default:
      throw new Error('The type informed is invalid');
  }
};
