import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('TextField', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Checkbox id="test" invalid={false} labelText="some label" />)).not.toThrow();
    });

    it('should render the label text', (): void => {
        const labelText = 'some label text';
        const { getByText } = render(<Checkbox id="test" invalid={false} labelText={labelText} />);
        expect(getByText(labelText)).toBeInTheDocument();
    });

    it('should render the helper text when it is passed in', (): void => {
        const helperText = 'some helper text';
        const { getByText } = render(
            <Checkbox id="test" invalid={false} labelText="some label" helperText={helperText} />,
        );
        expect(getByText(helperText)).toBeInTheDocument();
    });

    it('should render the error state', (): void => {
        const { getByText } = render(
            <Checkbox id="test" invalid={true} labelText="some label" helperText="helper text" />,
        );
        expect(getByText('helper text')).toHaveClass('typography__label--error');
        expect(getByText('some label')).toHaveClass('checkbox-field__label--invalid');
    });

    it('should load with checked value if initialValue true', async (): Promise<void> => {
        <Checkbox id="test" invalid={false} labelText="some label" />
        const { container } = render(<Checkbox id="test" invalid={false} labelText="some label" initialValue={true}/>);
        expect(container.querySelector('input').checked).toBe(true);
    })

    it('should load with unchecked value if initialValue false', async (): Promise<void> => {
        <Checkbox id="test" invalid={false} labelText="some label" />
        const { container } = render(<Checkbox id="test" invalid={false} labelText="some label" initialValue={false}/>);
        expect(container.querySelector('input').checked).toBe(false);
    })

    it('should update checked value of label when clicked', async (): Promise<void> => {
        <Checkbox id="test" invalid={false} labelText="some label" />
        const { container } = render(<Checkbox id="test" invalid={false} labelText="some label" initialValue={false}/>);
        expect(container.querySelector('input').checked).toBe(false);
        expect(container.querySelector('.checkbox-field__label--checked')).toBeNull();
        await fireEvent.click(container.querySelector('input'));
        expect(container.querySelector('input').checked).toBe(true);
        expect(container.querySelector('.checkbox-field__label--checked')).toBeInTheDocument()
    })

    it('should trigger onchange when callback is passed in', async (): Promise<void> => {
        const onChangeFn = jest.fn();
        const { container } = render(
            <Checkbox id="test" invalid={true} labelText="some label" helperText="helper text" onChange={onChangeFn} />,
        );
        await fireEvent.click(container.querySelector('input'));
        expect(onChangeFn).toHaveBeenCalled();
    });
});
