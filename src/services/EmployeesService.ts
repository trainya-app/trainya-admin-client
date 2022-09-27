import { serverApi } from './serverApi';

interface Store {
  name: string;
  birthDate: string;
  email: string;
  password: string;
  wage?: number;
  paymentDate?: string;
  profileImg?: string;
  documentType: 'RG' | 'CPF' | 'CNH' | 'CNPJ';
  documentValue: string;
}

class EmployeesService {
  async store(input: Store) {
    const { data } = await serverApi.post('/employees', input);
    return data;
  }
}
export default new EmployeesService();
