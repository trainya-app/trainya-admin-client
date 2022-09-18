export interface Workout {
  id: number;
  employee_id: number;
  title: string;
  description?: string;
  type?: string;
  preview_image_url?: string;
  video_url?: string;
  duration: string;
}
