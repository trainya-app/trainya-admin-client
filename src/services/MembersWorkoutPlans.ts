import { serverApi } from './serverApi';

interface Store {
  memberId: number;
  workoutPlanId: number;
}

class MembersWorkoutPlans {
  async store(input: Store) {
    console.log({ input });
    const { data } = await serverApi.post('/memberWorkoutPlans', input);
    console.log(data);
    return data.memberWorkoutPlan;
  }
}

export default new MembersWorkoutPlans();
