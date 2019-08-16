import React from 'react';
import App from './App';
import { render, RenderResult } from '@testing-library/react';

//need to declare the global vars, would be good to have this in setup script but that means making it a ts not js file.
declare global {
    namespace NodeJS {
      interface Global {
         API_HOST: string;
         fetch: Function
    }
  }
}

//mock fetch used by Apollo
global.fetch = jest.fn();
// mock webpack injected global
global.API_HOST = '';

describe('App', (): void => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<App />)).not.toThrow();
    });
});
