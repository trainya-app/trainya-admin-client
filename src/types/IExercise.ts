export interface IExercise {
  id: number;
  name: string;
  sets: number;
  repetitions: number;
  comment?: string;
  video_url?: string;
}
