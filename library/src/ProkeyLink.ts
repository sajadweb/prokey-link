import { CoinGetAddresParam, CoinType, Command, Message } from './interface';
import { EventEmitter, initialWindow, log, sleep } from './utils';
import { getInformationLib } from './utils/info';

export class ProkeyLink extends EventEmitter {
    private _port: chrome.runtime.Port | null = null;
    constructor() {
        super();
        this.on(Command.INITIALIZE, (res) => {
            console.log(` ProkeyLink ${Command.INITIALIZE} =`, res);
        });
    }
    /**
     * Connect Device Prokey
     */
    Connect = async () => {
        const _window = initialWindow();
        await sleep(5000);
        this.initializeEvent(_window);
        return await this.postMessage(Command.CONNECT, getInformationLib());
    };

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
    Ping = () => {
        return this.postMessage(Command.PING);
    };

    /**
     * Initialize Device
     * @param fn
     */
    AddGetInitialize = (fn: (res: any) => void): void => {
        this.on(Command.INITIALIZE, fn);
    };

    /**
     * Get Address Coin
     * @param coin
     * @param args
     * @param showOnProkey
     * @returns Address Coin
     */
    GetAddress = async (coin: CoinType, args: CoinGetAddresParam, showOnProkey?: boolean) => {
        return await this.postMessage(Command.GET_ADDRESS, {
            coin,
            showOnProkey,
            args: [
                args.coinBip44,
                args.account, // Ethereum, each address is considered as an account
                args.numberOfAddress, // We only need an address
                args.isSegwit, // Segwit not defined so we should use 44'
                args.isChange || false, // No change address defined in ethereum
                args.startIndex,
            ],
        });
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
