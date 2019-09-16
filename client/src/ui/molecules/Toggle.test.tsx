import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import Toggle from './Toggle';

describe('Toggle', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
      expect((): RenderResult => render(<Toggle id="testId" toggleLabel="label"/>)).not.toThrow();
    });

    it('should display toggleLabel text', (): void => {
      const { getByText } = render(<Toggle id="testId" toggleLabel="Toggle Label Text"/>)
      expect(getByText('Toggle Label Text')).toBeInTheDocument()
    });

    it('should display nested children when passed open', (): void => {
      const { getByText } = render(<Toggle id="testId" toggleLabel="Toggle Label Text" open>NestedText</Toggle>)
      expect(getByText('NestedText')).toBeInTheDocument()
    });

    it('should not display nested children when not passed open', (): void => {
      const { container } = render(<Toggle id="testId" toggleLabel="Toggle Label Text"><span className="testSelectorSpan"/></Toggle>);
      expect(container.querySelector('.testSelectorSpan')).toBeNull()
    });

    it('should toggle the display of its children when checkbox is checked', async (): Promise<void> => {
      const { container } = render(<Toggle id="testId" toggleLabel="Toggle Label Text"><span className="testSelectorSpan"/></Toggle>);
      await fireEvent.click(container.querySelector('input[type="checkbox"]'));
      expect(container.querySelector('.testSelectorSpan')).toBeInTheDocument();
      await fireEvent.click(container.querySelector('input[type="checkbox"]'));
      expect(container.querySelector('.testSelectorSpan')).toBeNull();
    })
});