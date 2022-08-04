import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  isLoading?: boolean;
  onClick: any;
  variant?: 'primary' | 'outlined';
}

export const Button = ({
  children,
  isLoading,
  onClick,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  console.log('Button');

  return (
    <Container onClick={onClick} variant={variant} {...rest}>
      {isLoading ? <span>loading</span> : children}
    </Container>
  );
};
