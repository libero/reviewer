import { Channel, channel } from 'rs-channel-node';
import { StateChange } from './types';

export interface ConnectionOwner {
  onDisconnect(): void;
  onConnect(): void;
  onStartReconnect(): void;
}

/**
 * ConnectionObserver handles the state changing to call back on the owner.
 *
 * @export
 * @class ConnectionObserver
 */
export class ConnectionObserver {
  private owner: ConnectionOwner;
  private flowing: boolean = false;
  private innerChannel: Channel<StateChange> = channel<StateChange>();

  constructor(owner: ConnectionOwner) {
    this.owner = owner;
    this.observeStateChange();
  }

  public get isConnected(): boolean {
    return this.flowing;
  }

  public get channel(): Channel<StateChange> {
    return this.innerChannel;
  }

  private async observeStateChange() {
    // tslint:disable-next-line: no-unused-expression
    const [, recv] = this.channel;
    while (true) {
      const payload = await recv();
      if (payload.newState === 'NOT_CONNECTED') {
        this.flowing = false;
        this.owner.onDisconnect();
        this.owner.onStartReconnect();
      } else if (payload.newState === 'CONNECTED') {
        // logger.info('connection confirmed');
        this.flowing = true;
        this.owner.onConnect();
      }
    }
  }
}
