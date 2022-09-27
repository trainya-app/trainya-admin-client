/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useMemo, useState } from 'react';
import { Select } from 'components/Select';
import { FaSort } from 'react-icons/fa';

import { Header } from './components/Header';
import { Container, NavButtons } from './styles';
import { Employee, EmployeesTable } from './components/EmployeesTable';
import { CreateEmployeeModal } from './components/CreateEmployeeModal';

// const filterList = [
//   'Filtrar',
//   'Option 1',
//   'Option 2',
//   'Option 3',
//   'Option 4',
//   'Option 5',
// ];

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

const EMPLOYEES_ARR = [
  {
    id: 23,
    profile_img: 'https://github.com/bryanmaraujo544.png',
    name: 'Bryan',
    roll: {
      title: 'Instrutor',
    },
    phone: 11990002676,
    wage: 225000,
    payment_date: '2022-08-02T22:37:15.143-03:00',
  },
  {
    id: 235,
    profile_img: 'https://github.com/bryanmaraujo544.png',
    name: 'Bryan',
    roll: {
      title: 'Instrutor',
    },
    phone: 11990002676,
    wage: 2235000,
    payment_date: '2022-08-02T22:37:15.143-03:00',
  },
  {
    id: 24,
    profile_img: 'https://github.com/diego3.png',
    name: 'Fernado martins',
    roll: {
      title: 'Professor',
    },
    phone: 11990002676,
    wage: 426000,
    payment_date: '2022-08-02T22:37:15.143-03:00',
  },
];

export const Employees = () => {
  // const [isFilterSelectOpen, setIsFilterSelectOpen] = useState(false);
  // const [filterSelected, setFilterSelected] = useState(0);
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
    setAllEmployees(EMPLOYEES_ARR);
  }, []);

  const sort = sortList[sortColumnSelected];

  const employeesSearched = useMemo(
    () =>
      allEmployees.filter((employee) =>
        Object.values(employee)
          .join('')
          .toLowerCase()
          .includes(searchContent.toLowerCase())
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
        />
      </Container>
      <CreateEmployeeModal
        isOpen={isCreateEmployeeModalOpen}
        setIsOpen={setIsCreateEmployeeModalOpen}
      />
    </>
  );
};
