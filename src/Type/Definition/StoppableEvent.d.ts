interface StoppableEvent {
  isPropagationStopped(): boolean;
  stopPropagation(): void;
}

export { StoppableEvent };
