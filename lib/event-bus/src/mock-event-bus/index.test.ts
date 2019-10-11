import { MockEventBus } from '.';
import { EventType, Event } from '../event-bus';

interface TestEventPayload {
  x: number;
  y: number;
}

describe('mock message queue', () => {
  describe('you can publish and subscribe', () => {
    it('can do the full flow', async () => {
      const eventType: EventType = 'libero:mock:test';

      const handlerMock = jest.fn(async () => true);

      // Mock bus
      const mockMq = await (new MockEventBus()).init([eventType, eventType], 'message-bus-test');

      mockMq.subscribe<TestEventPayload>(eventType, handlerMock);

      const event: Event<TestEventPayload> = {
        eventType,
        id: 'some-testing-event-id',
        created: new Date(),
        payload: {
          x: 10,
          y: 20,
        },
      };

      mockMq.publish(event);

      expect(handlerMock).toBeCalled();
      expect(handlerMock.mock.calls).toEqual([[event]]);
    });
  });
});
