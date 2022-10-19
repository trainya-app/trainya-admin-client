import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Members as MembersComponent } from 'pages-components/Members';
import { serverApi } from 'services/serverApi';
import nookies from 'nookies';

const Members: NextPage = () => <MembersComponent />;

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

export default Members;
