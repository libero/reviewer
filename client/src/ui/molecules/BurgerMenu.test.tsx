import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import BurgerMenu from './BurgerMenu';

describe('NavMenu', (): void => {
  afterEach(cleanup);

  it('should render correctly', (): void => {
      expect((): RenderResult => render(<BurgerMenu />)).not.toThrow();
  });
  
});