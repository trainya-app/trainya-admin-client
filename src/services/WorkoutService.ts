import { serverApi } from 'services/serverApi';

interface Store {
  employeeId: number;
  title: string;
  description?: string;
  previewImageUrl?: string;
  videoUrl?: string;
  duration: string;
}

interface IWorkout {
  id: number;
  employee_id: number;
  title: string;
  description?: string;
  type?: string;
  preview_image_url?: string;
  video_url?: string;
  duration: string;
}

class WorkoutsService {
  async store({
    employeeId,
    title,
    description,
    previewImageUrl,
    videoUrl,
    duration,
  }: Store): Promise<{ message: string; workout: IWorkout }> {
    const { data } = await serverApi.post<{
      message: string;
      workout: IWorkout;
    }>('/workouts', {
      employeeId,
      title,
      description,
      previewImageUrl,
      videoUrl,
      duration,
    });

    return data;
  }
}

export default new WorkoutsService();
