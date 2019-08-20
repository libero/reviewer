export default (firstWrapper: React.FC<{}>, ...restWrappers: React.FC<{}>[]) => restWrappers.reduce(
    (prevWrapper, nextWrapper) => value => prevWrapper({ children: nextWrapper(value) }),
    firstWrapper);
