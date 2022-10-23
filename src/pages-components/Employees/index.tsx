/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useMemo, useState } from 'react';
import { Select } from 'components/Select';
import { FaSort } from 'react-icons/fa';

import EmployeesService from 'services/EmployeesService';
import { Header } from './components/Header';
import { Container, NavButtons } from './styles';
import { Employee, EmployeesTable } from './components/EmployeesTable';
import { CreateEmployeeModal } from './components/CreateEmployeeModal';

const sortList = [
  {
    text: 'Ordernar',
    prop: 'sort',
  },
  {
    text: 'Nome',
    prop: 'name',
  },
  {
    text: 'Cargo',
    prop: 'roll',
  },
  {
    text: 'Telefone',
    prop: 'phone',
  },
  {
    text: 'Salário',
    prop: 'wage',
  },
  {
    text: 'Data de Pag.',
    prop: 'payment_date',
  },
];

export const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>(
    [] as Employee[]
  );

  const [isSortSelectOpen, setIsSortSelectOpen] = useState(false);
  const [sortColumnSelected, setSortColumnSelected] = useState(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchContent, setSearchContent] = useState('');

  const [isCreateEmployeeModalOpen, setIsCreateEmployeeModalOpen] =
    useState(false);

  useEffect(() => {
    (async () => {
      const employees = await EmployeesService.getAll();
      setAllEmployees(employees);
    })();
  }, []);

  const sort = sortList[sortColumnSelected];

  const employeesSearched = useMemo(
    () =>
      allEmployees.filter((employee) =>
        Object.values(employee)
          .join('')
          .toLowerCase()
          .includes(searchContent.toLowerCase().trim())
      ),
    [searchContent, allEmployees]
  );

  const employeesSorted = useMemo(
    () =>
      employeesSearched.sort((a: any, b: any) => {
        if (a[sort.prop] > b[sort.prop]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return sortDirection === 'asc' ? -1 : 1;
      }),
    [allEmployees, sortColumnSelected, sortDirection, employeesSearched]
  );

  function handleOpenCreateEmployeeModal() {
    setIsCreateEmployeeModalOpen(true);
  }

  return (
    <>
      <Container>
        <Header
          search={searchContent}
          setSearch={setSearchContent}
          handleOpenCreateEmployeeModal={handleOpenCreateEmployeeModal}
        />
        <NavButtons>
          <Select
            options={sortList}
            setIsOpen={setIsSortSelectOpen}
            isOpen={isSortSelectOpen}
            selectedOption={sortColumnSelected}
            setSelectedOption={setSortColumnSelected}
            btnIcon={FaSort}
          />
        </NavButtons>
        <EmployeesTable
          sortColumn={sort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          employees={employeesSorted}
          setEmployees={setAllEmployees}
        />
      </Container>
      <CreateEmployeeModal
        isOpen={isCreateEmployeeModalOpen}
        setIsOpen={setIsCreateEmployeeModalOpen}
      />
    </>
  );
};
