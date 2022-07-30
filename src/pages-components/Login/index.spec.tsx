/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { Login } from '.';
import '@testing-library/jest-dom';

describe('<Login />', () => {
  it('should renders Login component', () => {
    const { getByText } = render(<Login />);
    const container = getByText('oioi');
    expect(container).toBeInTheDocument();
  });
});
