import { serverApi } from 'services/serverApi';

interface Store {
  name: string;
  advise: string;
  needsEquipment: boolean;
}

class ExercisesController {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMDkxNDgzLCJleHAiOjE2NjU2ODM0ODN9.JL1xqkKYe8859l6-5ttD3_LLNLARTyW1RotzZWwNb6s';

  async getAll() {
    const { data } = await serverApi.get('/exercises');
    return data?.exercises;
  }

  async store({ name, advise, needsEquipment }: Store) {
    const { data } = await serverApi.post('/exercises', {
      name,
      comment: advise,
      needsEquipment,
    });
    return data;
  }
}

export default new ExercisesController();
