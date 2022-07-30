import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';

export const Logo = () => {
  console.log('logo');

  return (
    <Container>
      <Link href="/">
        <Image
          alt="trainya-app"
          src="/images/logo-light.svg"
          layout="fill"
          objectFit="contain"
        />
      </Link>
    </Container>
  );
};
