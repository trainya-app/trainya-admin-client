import { serverApi } from 'services/serverApi';

interface Store {
  goal: string;
  employeeId: number;
  workoutPlanWorkouts: { workout_id: number }[];
}

class WorkoutPlansService {
  async store(input: Store) {
    const { data } = await serverApi.post('/workoutPlans', { ...input });
    return data;
  }
}

export default new WorkoutPlansService();
