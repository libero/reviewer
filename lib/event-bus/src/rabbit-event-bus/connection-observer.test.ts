import { ConnectionObserver, ConnectionOwner } from './connection-observer';

describe('ConnectionObserver', () => {
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  let owner: ConnectionOwner;

  beforeEach(() => {
    owner = {
      onDisconnect: jest.fn(),
      onConnect: jest.fn(),
      onStartReconnect: jest.fn(),
    };
  });

  it('triggers connect', async () => {
    const observer: ConnectionObserver = new ConnectionObserver(owner);
    expect(observer.isConnected).toBe(false);

    // tslint:disable-next-line: no-unused-expression
    const [tx ] = observer.channel;
    tx({ newState: 'CONNECTED' });
    await timeout(1);
    expect(observer.isConnected).toBe(true);
    expect(owner.onConnect).toHaveBeenCalledTimes(1);
  });

  it('triggers disconnect and reconnect', async () => {
    const observer: ConnectionObserver = new ConnectionObserver(owner);
    expect(observer.isConnected).toBe(false);

    // tslint:disable-next-line: no-unused-expression
    const [tx ] = observer.channel;
    tx({ newState: 'CONNECTED' });
    await timeout(1);
    expect(observer.isConnected).toBe(true);
    expect(owner.onConnect).toHaveBeenCalledTimes(1);

    tx({ newState: 'NOT_CONNECTED' });
    await timeout(1);
    expect(observer.isConnected).toBe(false);
    expect(owner.onDisconnect).toHaveBeenCalledTimes(1);
    expect(owner.onStartReconnect).toHaveBeenCalledTimes(1);
  });

});
