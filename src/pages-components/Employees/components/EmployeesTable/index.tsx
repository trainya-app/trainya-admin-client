/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Container, ArrowIcon } from './styles';

export interface Employee {
  id: number;
  name: string;
  profile_img: string;
  wage: number;
  phone: number;
  payment_date: string;
  role: {
    title: string;
  };
}

interface Props {
  sortColumn: { text: string; prop: string };
  sortDirection: 'asc' | 'desc';
  setSortDirection: Dispatch<SetStateAction<'asc' | 'desc'>>;
  employees: Employee[];
}

const columns = ['', 'Nome', 'Cargo', 'Telefone', 'Salário', 'Data de Pag.'];

export const EmployeesTable = ({
  sortColumn,
  setSortDirection,
  sortDirection,
  employees,
}: Props) => {
  const handleToggleSortDir = useCallback(() => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                <div>
                  {column}
                  {sortColumn.text === column && (
                    <ArrowIcon
                      dir={sortDirection}
                      onClick={() => handleToggleSortDir()}
                    >
                      <FaArrowUp className="icon" />
                    </ArrowIcon>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={`employeelistitem-${employee.id}`}>
              <td style={{ width: 0 }}>
                <div className="image bg-blue-400">
                  <Image src="" alt="" layout="fill" />
                </div>
              </td>
              <td>{employee.name}</td>
              <td>{employee.role.title}</td>
              <td>{employee.phone}</td>
              <td>{employee.wage}</td>
              <td>{employee.payment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
