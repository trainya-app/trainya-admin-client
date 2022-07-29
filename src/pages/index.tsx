import type { NextPage } from 'next';
import { Home as HomeComponent } from 'pages-components/Home';

const Home: NextPage = () => {
  console.log('home page');

  return <HomeComponent />;
};

export default Home;
