/* eslint-disable react/destructuring-assignment */
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => (
  <input
    className={`px-4 h-[4.2rem] w-full bg-blue-50 rounded-2xl text-blue-800  focus:outline-blue-400 border${className}`}
    {...props}
  />
);
