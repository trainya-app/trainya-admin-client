import { serverApi } from 'services/serverApi';
import { IExercise } from 'types/IExercise';

interface Store {
  name: string;
  advise: string;
  needsEquipment: boolean;
  videoUrl?: string;
}

interface Update {
  id: number;
  name: string;
  advise: string;
  needsEquipment: boolean;
  videoUrl?: string;
}

class ExercisesController {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMDkxNDgzLCJleHAiOjE2NjU2ODM0ODN9.JL1xqkKYe8859l6-5ttD3_LLNLARTyW1RotzZWwNb6s';

  async getAll() {
    const { data } = await serverApi.get('/exercises');
    return data?.exercises;
  }

  async store({
    name,
    advise,
    needsEquipment,
    videoUrl,
  }: Store): Promise<{ message: string; exercise: IExercise }> {
    const { data } = await serverApi.post<{
      message: string;
      exercise: IExercise;
    }>('/exercises', {
      name,
      comment: advise,
      needsEquipment,
      video_url: videoUrl,
    });
    return data;
  }

  async update({
    id,
    name,
    advise,
    needsEquipment,
    videoUrl,
  }: Update): Promise<{ message: string; exercise: IExercise }> {
    const { data } = await serverApi.put<{
      message: string;
      exercise: IExercise;
    }>(`/exercises/${id}`, {
      name,
      comment: advise,
      needsEquipment,
      videoUrl: videoUrl || undefined,
    });
    return data;
  }
}

export default new ExercisesController();
