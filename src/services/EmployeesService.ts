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
  gymId: number;
}

class EmployeesService {
  async store(input: Store) {
    const { data } = await serverApi.post('/employees', input);
    return data;
  }

  async getAll() {
    const { data } = await serverApi.get('/employees');
    return data.employees;
  }

  async delete(employeeId: number) {
    const { data } = await serverApi.delete(`/employees/${employeeId}`);
    return data;
  }
}
export default new EmployeesService();
