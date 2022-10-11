import { serverApi } from 'services/serverApi';

interface Store {
  goal: string;
  employeeId: number;
  workoutPlanWorkouts: { workout_id: number }[];
}

class WorkoutPlansService {
  async getAll() {
    const { data } = await serverApi.get('/workoutPlans');
    return data?.workoutPlans;
  }

  async store(input: Store) {
    const { data } = await serverApi.post('/workoutPlans', { ...input });
    return data;
  }

  async getOne(id: number) {
    const { data } = await serverApi(`/workoutPlans/${id}`);
    return data.workoutPlan;
  }
}

export default new WorkoutPlansService();
