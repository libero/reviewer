declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module '@testing-library/jest-dom';

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): CustomMatcherResult;
    toHaveAttribute(path: String, value: String): CustomMatcherResult;
    toHaveTextContent(content: String): CustomMatcherResult;
    toHaveClass(...classNames: string[]): CustomMatcherResult;
  }
}