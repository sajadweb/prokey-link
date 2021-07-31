import * as Event from 'events';
import { Message } from '../interface';

export class EventEmitter extends Event {
    private source: any;
    constructor() {
        super();
        /**
         * EventListener
         * window can listen for dispatched messages by executing the following JavaScript
         */
        window.addEventListener(
            'message',
            (event: any) => {
                if (event.source === window) return;
                this.EventListener(event.data);
            },
            false,
        );
    }

    /**
     * Initial Window for post message
     * @param _source : Window
     */
    public initializeEvent = (_source: any) => {
        this.source = _source;
    };
    /**
     * Data to be sent to the other window.
     * @param command
     * @param data
     */
    postMessage = (command: Message['command'], data?: Message['data']): Promise<any> => {
        this.source?.postMessage({ command, data }, '*');
        return new Promise((resolve, reject) => {
            this.on(command, (args) => {
                resolve(args);
            });
            setTimeout(function () {
                reject('Timeout');
            }, 5000);
        });
    };
    /**
     * Data to be sent to the other window without listen back.
     * @param command
     * @param data
     */
    responseMessage = (command: Message['command'], data?: Message['data']): void => {
        this.source?.postMessage({ command, data }, '*');
    };
    async EventListener(message: Message) {
        this.emit(message.command, message?.data);
    }
}
