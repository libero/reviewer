declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.jpg' {
    const content: any;
    export default content;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '@testing-library/jest-dom';

declare namespace jest {
    interface Matchers<R> {
        toBeInTheDocument(): CustomMatcherResult;
        toHaveAttribute(path: string, value: string): CustomMatcherResult;
        toHaveTextContent(content: string): CustomMatcherResult;
        toHaveClass(...classNames: string[]): CustomMatcherResult;
    }
}
