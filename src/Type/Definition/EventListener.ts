import { StoppableEvent } from './StoppableEvent';

interface EventListener<EventType extends StoppableEvent> {
  triggerOnEvent(event: EventType): void;
}

export { EventListener };
