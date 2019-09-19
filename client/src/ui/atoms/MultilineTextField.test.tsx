import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import MultilineTextField from './MultilineTextField';

describe('MultilineTextField', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<MultilineTextField id="test" invalid={false} labelText="Some label" />),
        ).not.toThrow();
    });

    it('should render the label text', (): void => {
        const labelText = 'some label text';
        const { getByText } = render(<MultilineTextField id="test" invalid={false} labelText={labelText} />);
        expect(getByText(labelText)).toBeInTheDocument();
    });

    it('should render the helper text when it is passed in', (): void => {
        const helperText = 'some helper text';
        const { getByText } = render(
            <MultilineTextField id="test" invalid={false} labelText="some label" helperText={helperText} />,
        );
        expect(getByText(helperText)).toBeInTheDocument();
    });

    it('should render the error state', (): void => {
        const { getByText, getByLabelText } = render(
            <MultilineTextField id="test" invalid={true} labelText="some label" helperText="helper text" />,
        );
        expect(getByText('helper text')).toHaveClass('typography__label--error');
        expect(getByLabelText('some label')).toHaveClass('multiline-text-field__input--invalid');
    });

    it('should trigger onchange when callback is passed in', async (): Promise<void> => {
        const onChangeFn = jest.fn();
        const { container } = render(
            <MultilineTextField
                id="test"
                invalid={true}
                labelText="some label"
                helperText="helper text"
                onChange={onChangeFn}
            />,
        );
        await fireEvent.change(container.querySelector('textarea'), { target: { value: 'test' } });
        expect(onChangeFn).toHaveBeenCalled();
    });
});
