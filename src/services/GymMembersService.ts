import { serverApi } from './serverApi';

class GymMembersService {
  async delete(gymMemberId: number) {
    const { data } = await serverApi.delete(`/gymMembers/${gymMemberId}`);
    return data;
  }
}

export default new GymMembersService();
