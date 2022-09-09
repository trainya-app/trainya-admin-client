export interface Workout {
  id: number;
  employeeId: number;
  title: string;
  description?: string;
  previewImageUrl?: string;
  videoUrl?: string;
  level?: string;
  duration?: number;
}
