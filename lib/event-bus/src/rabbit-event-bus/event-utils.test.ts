
import { EventUtils } from './event-utils';
import { EventIdentifier } from '../event-bus';

describe('event utils', () => {
  describe('exchange naming', () => {
    it('correctly names an event exchange', () => {
      const exampleDefinition: EventIdentifier = {
        kind: 'SampleEvent',
        namespace: 'testing',
      };
      expect(EventUtils.defToExchange(exampleDefinition)).toEqual('event__SampleEvent-testing');
    });
  });

});
