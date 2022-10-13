import { serverApi } from './serverApi';

interface Store {
  memberId: number;
  workoutPlanId: number;
}

class MembersWorkoutPlans {
  async store(input: Store) {
    const { data } = await serverApi.post('/memberWorkoutPlans', input);
    return data.memberWorkoutPlan;
  }
}

export default new MembersWorkoutPlans();
