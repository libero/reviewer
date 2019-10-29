
import { EventUtils } from './event-utils';

describe('event utils', () => {
  describe('exchange naming', () => {
    it('correctly names an event exchange', () => {
      const exampleDefinition: string = 'SampleEvent';
      expect(EventUtils.eventTypeToExchange(exampleDefinition)).toEqual('event__SampleEvent');
    });
  });

});
