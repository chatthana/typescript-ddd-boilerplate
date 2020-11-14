import { Message } from "./IMessage";

export interface IEvent extends Message {
  eventName: string;
}