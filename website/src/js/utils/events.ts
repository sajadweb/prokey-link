import * as Event from "events";
import { Message } from "../interface";

export class EventEmitter extends Event {
  private source: any;
  constructor() {
    super();
    window.addEventListener(
      "message",
      (event: any) => {
        if (event.source === window) return;
        this.initializeEvent(event.source);
        this.EventListener(event.data);
      },
      false
    );
  }

  public initializeEvent = (_source: any) => {
    this.source = _source;
  };
  /**
   * Data to be sent to the other window.
   * @param command
   * @param data
   */
  postMessage = (
    command: Message["command"],
    data?: Message["data"]
  ): Promise<any> => {
    this.source?.postMessage({ command, data }, "*");
    return new Promise((resolve, reject) => {
      this.on(command, (args) => {
        resolve(args);
      });
      setTimeout(function () {
        reject("Timeout");
      }, 5000);
    });
  };
  /**
   * Data to be sent to the other window without listen back.
   * @param command
   * @param data
   */
  responseMessage = (command: Message["command"], data?: Message["data"]): void => {
    this.source?.postMessage({ command, data }, "*");
  };

  async EventListener(message: Message) {
    console.log("message ",message)
    this.emit(message.command, message?.data);
  }
}