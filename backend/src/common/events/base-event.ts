export abstract class BaseEvent {
  abstract readonly eventName: string;
  readonly timestamp: Date;

  constructor() {
    this.timestamp = new Date();
  }
}
