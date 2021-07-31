import { Command, Message } from './interface';
import { EventEmitter, initialWindow, log, sleep } from './utils';
import { getInformationLib } from './utils/info';

export class ProkeyLink extends EventEmitter {
    private _port: chrome.runtime.Port | null = null;

    constructor() {
        super();
        this.WindowSend = this.WindowSend.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    /**
     * Connect Device Prokey
     */
    async Connect() {
        log('Connect...');
        const _window = initialWindow();
        await sleep(5000);
        this.initializeEvent(_window);
        log('sleep...', 'blue');
        const init = await this.postMessage(Command.INITIAL, getInformationLib());
        console.log('initialize', init);
    }

    async WindowSend() {
        const back = await this.postMessage(Command.GET_DEVICE_ID);
        console.log('back', back);
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
}
