import React from 'react';
import { cleanup, render, RenderResult, fireEvent, waitForElement } from '@testing-library/react';
import SelectField from './SelectField';

describe('TextField', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<SelectField values={[]} id="test" invalid={false} labelText="some label" />),
        ).not.toThrow();
    });

    it('should render the label text', (): void => {
        const labelText = 'some label text';
        const { getByText } = render(<SelectField values={[]} id="test" invalid={false} labelText={labelText} />);
        expect(getByText(labelText)).toBeInTheDocument();
    });

    it('should render the helper text when it is passed in', (): void => {
        const helperText = 'some helper text';
        const { getByText } = render(
            <SelectField values={[]} id="test" invalid={false} labelText="some label" helperText={helperText} />,
        );
        expect(getByText(helperText)).toBeInTheDocument();
    });

    it('should render the error state', (): void => {
        const { getByText } = render(
            <SelectField values={[]} id="test" invalid={true} labelText="some label" helperText="helper text" />,
        );
        expect(getByText('helper text')).toHaveClass('typography__label--error');
    });

    it('should trigger onchange when callback is passed in', async (): Promise<void> => {
        const onChangeFn = jest.fn();
        const { container, getByText } = render(
            <SelectField
                values={[{ label: 'test-option', value: 'test' }]}
                id="test"
                invalid={true}
                labelText="some label"
                helperText="helper text"
                onChange={onChangeFn}
            />,
        );
        await fireEvent.keyDown(container.querySelector('.select-field'), { key: 'ArrowDown', keyCode: 40 });
        await waitForElement((): Element => getByText('test-option'));
        await fireEvent.click(getByText('test-option'));
        expect(onChangeFn).toHaveBeenCalled();
    });
});
