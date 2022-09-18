import { serverApi } from 'services/serverApi';

interface Store {
  workoutId: number;
  exerciseId: number;
  sets: number;
  repetitions: number;
}

class WorkoutExerciseService {
  async store({ workoutId, exerciseId, sets, repetitions }: Store) {
    const { data } = await serverApi.post('/workoutExercises', {
      workoutId,
      exerciseId,
      sets,
      repetitions,
    });
    return data;
  }
}

export default new WorkoutExerciseService();
