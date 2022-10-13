import { serverApi } from './serverApi';

export interface GymMember {
  id: number;
  gym: {
    name: string;
  };
  member: { name: string };
  member_id: number;
}

class GymsService {
  async getMembers(id: number): Promise<GymMember[]> {
    const { data } = await serverApi.get(`/gymMembers/${id}`);
    console.log('DATA', data);
    return data.gymMembers as GymMember[];
  }
}

export default new GymsService();
