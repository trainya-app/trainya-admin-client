/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import { Container } from './styles';

export const EmployeesTable = () => {
  console.log('EmployeesTable');

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th />
            <th>Nome</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>Salário</th>
            <th>Data de Pag.</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => console.log('tr clicked')}>
            <td style={{ width: 0 }}>
              <div className="image">
                <Image
                  src="https://github.com/bryanmaraujo544.png"
                  alt=""
                  layout="fill"
                />
              </div>
            </td>
            <td>Bryan</td>
            <td>Instrutor</td>
            <td>(11) 990002676</td>
            <td>2.000</td>
            <td>13 Fev.</td>
          </tr>
          <tr>
            <td>
              <div className="image">
                <Image
                  src="https://github.com/bryanmaraujo544.png"
                  alt=""
                  layout="fill"
                />
              </div>
            </td>

            <td>Bryan</td>
            <td>Instrutor</td>
            <td>(11) 990002676</td>
            <td>2.000</td>
            <td>13 Fev.</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
