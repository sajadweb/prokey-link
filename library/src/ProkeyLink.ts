import { Command, Message } from './interface';
import { initialWindow, log, sleep } from './utils';
import { getInformationLib } from './utils/info';

export class ProkeyLink {
    private _window?: Window | null;
    private _port: chrome.runtime.Port | null = null;

    constructor() {
        this.WindowSend = this.WindowSend.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.initialEventListener = this.initialEventListener.bind(this);
        //initial EventListener
        this.initialEventListener();
    }

    /**
     * Connect Device Prokey
     */
    async Connect() {
        log('Connect...');
        this._window = initialWindow();
        await sleep(5000);
        log('sleep...', 'blue');
        this.postMessage(Command.INITIAL, getInformationLib());
    }

    async WindowSend() {
        this.postMessage(Command.GET_DEVICE_ID);
    }

    /**
     *
     * @param command
     * @param data
     */
    postMessage(command: Message['command'], data?: Message['data']): void {
        log(command + JSON.stringify(data));
        this._window?.postMessage({ command, data }, '*');
    }

    async onConnectExternal() {
        //TODO set for chrom extionsion
        chrome.runtime.onConnectExternal.addListener((port) => {
            this._port = port;
            console.log('port', this._port);
            if (this._port.name === 'prokey-link') {
                this._port.postMessage({ cmd: 'Connect' });
                this._port.onMessage.addListener((msg) => {
                    console.log('massage', msg);
                });
            }
        });
    }

    /**
     * EventListener
     * window can listen for dispatched messages by executing the following JavaScript
     */
    initialEventListener(): void {
        window?.addEventListener(
            'message',
            (event) => {
                if (event.source === window) return;
                log(JSON.stringify(event?.data),'red');
            },
            false,
        );
    }
}
