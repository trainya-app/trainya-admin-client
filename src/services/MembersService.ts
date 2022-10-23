import { serverApi } from './serverApi';

interface InputCreateDTO {
  phone: string;
  name: string;
  weight: number;
  height: number;
  email: string;
  password: string;
  avatarUrl: string;
  birthDate: string;
  gymId: number;
}

interface InputUpdateDTO {
  id: number;
  name: string;
  weight: number;
  height: number;
  email: string;
  avatarUrl: string;
  birthDate: string;
}

class MembersService {
  async store(input: InputCreateDTO) {
    const { data } = await serverApi.post('/members', input);
    return data;
  }

  async update(input: InputUpdateDTO) {
    const { data } = await serverApi.put(`/members/${input.id}`, input);
    return data;
  }
}

export default new MembersService();
