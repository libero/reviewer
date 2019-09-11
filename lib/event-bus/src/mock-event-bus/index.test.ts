import { MockMessageQueue } from '.';
import { EventIdentifier, Event } from '../event-bus';

type TestEventPayload = {
  x: number;
  y: number;
};

describe("mock message queue", () => {
  describe("you can publish and subscribe", () => {
    it("can do the full flow", async () => {
      const test_event_def: EventIdentifier = {
        kind: "some-event",
        namespace: "testland",
      };

      const handler_mock = jest.fn(async () => true);

      // Mock bus
      const mock_mq = await (new MockMessageQueue()).init([test_event_def, test_event_def], "message-bus-test");

      mock_mq.subscribe<TestEventPayload>(test_event_def, handler_mock);

      const event: Event<TestEventPayload> = {
        id: 'some-testing-event-id',
        created: new Date(),
        payload: {
          x: 10,
          y: 20,
        },
        ...test_event_def
      }

      mock_mq.publish(event);

      expect(handler_mock).toBeCalled();
      expect(handler_mock.mock.calls).toEqual([[event]]);
    });
  });
});
