import Image from 'next/image';
import { Container, Form, InputGroup } from './styles';
import LoginBg from '../../assets/login-bg.jpg';

export const Login = () => {
  console.log('login page');

  return (
    <Container>
      <div className="image-box">
        <Image src={LoginBg} layout="fill" objectFit="cover" alt="" />
      </div>
      <Form>
        <h2>Login</h2>
        <InputGroup>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </InputGroup>
      </Form>
    </Container>
  );
};
