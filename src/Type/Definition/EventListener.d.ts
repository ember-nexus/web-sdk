import { StoppableEvent } from '~/Type/Definition/StoppableEvent';

interface EventListener<EventType extends StoppableEvent> {
  triggerOnEvent(event: EventType): void;
}

export { EventListener };
