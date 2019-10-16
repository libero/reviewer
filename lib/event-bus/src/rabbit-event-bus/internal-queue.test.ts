import { QueuedEvent, InternalMessageQueue } from './internal-queue';

describe('Internal Message Queue', () => {
  let mockPublisher;
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const createMockEvent = (): QueuedEvent => {
    return {
      event: {
        eventType: 'test',
        id: '123',
        created: new Date(),
        payload: {},
      },
      resolve: jest.fn(),
      reject: jest.fn(),
    };
  };

  beforeEach(() => {
    mockPublisher = {
      init: jest.fn(),
      publish: jest.fn(() => Promise.resolve(true)),
    };
  });

  it('can push events on the queue', async () => {
    const q = new InternalMessageQueue(mockPublisher);
    expect(q).toHaveLength(0);
    q.push(createMockEvent());
    expect(q).toHaveLength(1);
  });

  it('publishes events on the queue', async () => {
    const q = new InternalMessageQueue(mockPublisher);
    const mEvent1 = createMockEvent();
    const mEvent2 = createMockEvent();
    const mEvent3 = createMockEvent();
    q.push(mEvent1);
    q.push(mEvent2);
    q.push(mEvent3);
    expect(q).toHaveLength(3);
    q.publishQueue();
    expect(mockPublisher.publish).toHaveBeenCalledTimes(3);
    await timeout(1);
    expect(mEvent1.resolve).toHaveBeenCalledTimes(1);
    expect(mEvent2.resolve).toHaveBeenCalledTimes(1);
    expect(mEvent3.resolve).toHaveBeenCalledTimes(1);
  });
});
