import React from 'react';
import { render } from '../../test-utils';
import '@testing-library/jest-dom';
import { SideBar } from '../../components/SideBar';
import 'jest-styled-components';

describe('<SideBar />', () => {
  it('should renders when page is not Login', () => {
    const { getByTestId } = render(<SideBar />);
    const sideBar = getByTestId('sidebar');
    expect(sideBar).toBeTruthy();
  });
});
