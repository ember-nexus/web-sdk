interface StoppableEvent {
  /**
   * Function to check whether the event is stopped.
   *
   * **Note**: It is highly advised that stopped events are also resolved.
   */
  isPropagationStopped(): boolean;

  /**
   * Function to stop the event, no further event listeners will interact with this event.
   */
  stopPropagation(): void;
}

export { StoppableEvent };
