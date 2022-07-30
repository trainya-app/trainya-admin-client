import Image from 'next/image';
import { Container } from './styles';

export const Logo = () => {
  console.log('logo');

  return (
    <Container>
      <Image
        alt="trainya-app"
        src="/images/logo-light.svg"
        layout="fill"
        objectFit="contain"
      />
    </Container>
  );
};
