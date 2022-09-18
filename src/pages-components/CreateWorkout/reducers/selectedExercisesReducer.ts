import { IExercise } from 'types/IExercise';

export interface SelectedExercisesAction {
  type: 'ADD-WORKOUT' | 'REMOVE-WORKOUT' | 'UPDATE-WORKOUT' | 'PLACE-EXERCISES';
  payload: any;
}

interface SelectedExercisesState {
  value: IExercise[];
}

export const selectedExercisesReducer = (
  state: SelectedExercisesState,
  action: SelectedExercisesAction
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
    case 'PLACE-EXERCISES': {
      const { payload } = action;
      return { value: payload };
    }
    default:
      throw new Error('The type informed is invalid');
  }
};
