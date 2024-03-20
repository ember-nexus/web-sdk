import { StoppableEvent } from '~/Type/Definition/StoppableEvent';

interface EventListener {
  triggerOnEvent(event: StoppableEvent): void;
}

export { EventListener };
