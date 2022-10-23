import { serverApi } from './serverApi';

export interface GymMember {
  id: number;
  gym: {
    name: string;
  };
  member: {
    id: number;
    name: string;
    email: string;
    phone: string;
    weight: number;
    height: number;
  };
  member_id: number;
}

class GymsService {
  async getMembers(id: number): Promise<GymMember[]> {
    const { data } = await serverApi.get(`/gymMembers/${id}`);
    return data.gymMembers as GymMember[];
  }
}

export default new GymsService();
