import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { Employees as EmployeesComponent } from 'pages-components/Employees';
import { serverApi } from 'services/serverApi';
import nookies from 'nookies';

const Employees: NextPage = () => <EmployeesComponent />;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { token } = nookies.get(ctx);

  try {
    await serverApi.get('/auth/employees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    serverApi.defaults.headers.Authorization = `Bearer ${token}`;

    return {
      props: {},
    };
  } catch (err: any) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default Employees;
