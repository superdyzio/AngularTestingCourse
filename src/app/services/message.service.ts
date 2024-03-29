import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {
  public messages: string[] = [];

  public add(message: string): void {
    this.messages.push(message);
  }

  public clear(): void {
    this.messages = [];
  }
}
