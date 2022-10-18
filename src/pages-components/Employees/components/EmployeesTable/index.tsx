/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from 'components/Button';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { DeleteEmployeeModal } from './components/DeleteEmployeeModal';
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
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
}

const columns = ['', 'Nome', 'Cargo', 'Telefone', 'Salário', 'Data de Pag.'];

export const EmployeesTable = ({
  sortColumn,
  setSortDirection,
  sortDirection,
  employees,
  setEmployees,
}: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeIdToDelete, setEmployeeToDelete] = useState(0);

  const handleToggleSortDir = useCallback(() => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleOpenDeleteModal(employeeId: number) {
    setIsDeleteModalOpen(true);
    setEmployeeToDelete(employeeId);
  }

  return (
    <>
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
              <th />
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
                <td>
                  <Button
                    variant="danger"
                    className="p-3"
                    onClick={() => handleOpenDeleteModal(employee.id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <DeleteEmployeeModal
        employeeId={employeeIdToDelete}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        setEmployees={setEmployees}
      />
    </>
  );
};
