import { Service } from 'typedi';

import { EventListener } from '~/Type/Definition/EventListener';
import { StoppableEvent } from '~/Type/Definition/StoppableEvent';

@Service()
class RawValueToNormalizedValueEventManager {
  private eventListeners: [number, EventListener][] = [];

  constructor() {}

  registerEventListener(eventListener: EventListener, priority: number = 0): void {
    if (this.eventListeners.length == 0) {
      this.eventListeners.push([priority, eventListener]);
      return;
    }

    for (let index = 0; index < this.eventListeners.length; index++) {
      if (index == this.eventListeners.length - 1) {
        this.eventListeners.push([priority, eventListener]);
        return;
      }
      if (this.eventListeners[index][0] > priority) {
        this.eventListeners.splice(index, 0, [priority, eventListener]);
        return;
      }
    }
  }

  handleEvent(event: StoppableEvent): void {
    if (event.isPropagationStopped()) {
      return;
    }
    for (let index = this.eventListeners.length - 1; index >= 0; index--) {
      this.eventListeners[index][1].triggerOnEvent(event);
      if (event.isPropagationStopped()) {
        return;
      }
    }
  }
}

export { RawValueToNormalizedValueEventManager };
