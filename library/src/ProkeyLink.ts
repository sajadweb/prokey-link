import { Command, Message } from './interface';
import { EventEmitter, initialWindow, log, sleep } from './utils';
import { getInformationLib } from './utils/info';

export class ProkeyLink extends EventEmitter {
    private _port: chrome.runtime.Port | null = null;
    constructor() {
        super();
        this.Connect = this.Connect.bind(this);
        this.Ping = this.Ping.bind(this);
    }
    /**
     * Connect Device Prokey
     */
    async Connect() {
        log('Connect...');
        const _window = initialWindow();
        await sleep(5000);
        this.initializeEvent(_window);
        return await this.postMessage(Command.CONNECT, getInformationLib());
    }

    /**
     * Ping Website
     * @example
     * ```js
     * const lib = new ProkeyLink();
     * lib.ping().then(pong=>{
     *  console.log('pong :',pong)
     * }).catch(error=>{
     *  console.log('ping error:',error)
     * })
     * ```
     * @returns The processed target boolean
     */
    Ping() {
        console.log('start ping');
        return this.postMessage(Command.PING);
    }

    getAddress = async () => {
        const back = await this.postMessage(Command.GET_ADDRESS);
    };
    getPublickKey = async () => {
        const back = await this.postMessage(Command.GET_PUBLICK_KEY);
    };

    signTransaction = async () => {
        const back = await this.postMessage(Command.SIGN_TRANSACTION);
    };

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
