import { Button } from 'components/Button';
import { HTMLAttributes } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export const BackButton = (props: HTMLAttributes<HTMLButtonElement>) => (
  <Button
    variant="white"
    className="w-16 h-16 flex items-center justify-center"
    {...props}
  >
    <FaArrowLeft className="text-2xl" />
  </Button>
);
