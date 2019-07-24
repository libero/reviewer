
import * as React from 'react';
import AppBarIcon from './AppBarIcon';
import { cleanup, render, RenderResult } from '@testing-library/react';

describe('AppBarIcon', (): void => {
    afterEach(cleanup)

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<AppBarIcon link='some-url' imgSrc='/somepath' altText='altText'/>)).not.toThrow();
    });
    
    it('should render wrapped text with correct attributes', (): void => {
      const { container } = render(<AppBarIcon link='some-url' imgSrc='/somepath' altText='altText'/>);
      expect(container.querySelector('.app-bar__icon-link')).toHaveAttribute('href', 'some-url')
      expect(container.querySelector('.app-bar__img')).toHaveAttribute('src', '/somepath')
      expect(container.querySelector('.app-bar__img')).toHaveAttribute('alt', 'altText')

    })
  })