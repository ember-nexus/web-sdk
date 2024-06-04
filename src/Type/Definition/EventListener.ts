import { StoppableEvent } from './StoppableEvent.js';

interface EventListener<EventType extends StoppableEvent> {
  triggerOnEvent(event: EventType): void;
}

export { EventListener };
