import * as React from 'react';
import AppBar from './AppBar';
import { cleanup, render, RenderResult } from '@testing-library/react';

describe('AppBar', (): void => {
    afterEach(cleanup)

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<AppBar />)).not.toThrow();
    });
    it('should render wrapped text', (): void => {
      const { getByText }: RenderResult = render(<AppBar>Hello!</AppBar>);
      expect(getByText('Hello!'))
    })
    it('should render wrapped component', (): void => {
      const { getByTestId }: RenderResult = render(<AppBar><div data-testid="testDiv">Hello!</div></AppBar>);
      expect(getByTestId('testDiv')).toBeInTheDocument()
    })
    it('should render multiple wrapped components', (): void => {
      const { getAllByTestId }: RenderResult = render(
        <AppBar>
          <div data-testid="testDiv">Hello!</div>
          <div data-testid="testDiv">Hello again!</div>
        </AppBar>
      );
      expect(getAllByTestId('testDiv')).toHaveLength(2)
    })
});
