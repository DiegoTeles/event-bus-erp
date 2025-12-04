import { Injectable } from '@nestjs/common';
import { BaseEvent } from './base-event';

type EventHandler<T extends BaseEvent> = (event: T) => void | Promise<void>;

@Injectable()
export class EventBus {
  private handlers: Map<string, EventHandler<BaseEvent>[]> = new Map();

  subscribe<T extends BaseEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler as EventHandler<BaseEvent>);
  }

  async publish<T extends BaseEvent>(event: T): Promise<void> {
    const eventName = event.eventName;
    const handlers = this.handlers.get(eventName) || [];

    await Promise.all(
      handlers.map((handler) => Promise.resolve(handler(event))),
    );
  }

  clear(): void {
    this.handlers.clear();
  }
}
