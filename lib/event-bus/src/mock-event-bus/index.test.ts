import { MockMessageQueue } from '.';
import { EventIdentifier, Event } from '../event-bus';

interface TestEventPayload {
  x: number;
  y: number;
}

describe('mock message queue', () => {
  describe('you can publish and subscribe', () => {
    it('can do the full flow', async () => {
      const testEventDef: EventIdentifier = {
        kind: 'some-event',
        namespace: 'testland',
      };

      const handlerMock = jest.fn(async () => true);

      // Mock bus
      const mockMq = await (new MockMessageQueue()).init([testEventDef, testEventDef], 'message-bus-test');

      mockMq.subscribe<TestEventPayload>(testEventDef, handlerMock);

      const event: Event<TestEventPayload> = {
        id: 'some-testing-event-id',
        created: new Date(),
        payload: {
          x: 10,
          y: 20,
        },
        ...testEventDef,
      };

      mockMq.publish(event);

      expect(handlerMock).toBeCalled();
      expect(handlerMock.mock.calls).toEqual([[event]]);
    });
  });
});
