import { CoinPathParam, CoinType, Command, Message } from './interface';
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
     * @description calls connectHardware in background
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
     * @return The processed target boolean
     */
    Ping = () => {
        return this.postMessage(Command.PING);
    };

    /**
     * Initialize Device
     * @param fn it is void function
     */
    AddGetInitialize = (fn: (res: any) => void): void => {
        this.on(Command.INITIALIZE, fn);
    };

    /**
     * Get Address Coin
     * @description Get Address coin in proky device
     * @param coin CoinType;
     * @param path String | CoinPathParam;
     * @param showOnProkey Boolean;
     * @returns Address Coin
     * @example
     * ```js
     *  const address = await prokeyLink.GetAddress("Ethereum", {
        coinBip44: 60, account: 0, numberOfAddress: 1, isSegwit: false, isChange: false, startIndex: 0
      }, true);
     * 
     * ```
     * ```js
     *  const address = await prokeyLink.GetAddress("Ethereum",'m/44'/60'/0'/0', true);
     * 
     * ```
     */
    GetAddress = async (coin: CoinType, path: CoinPathParam | string, showOnProkey?: boolean) => {
        return await this.postMessage(Command.GET_ADDRESS, {
            coin,
            showOnProkey,
            path: typeof path === 'string' ? path : this.getPath(path),
        });
    };
    /**
     * Get Path
     * @ignore
     * @param path 
     * @returns Array
     */
    private getPath = (path: CoinPathParam) => {
        return [
            path.coinBip44,
            path.account, // Ethereum, each address is considered as an account
            path.numberOfAddress, // We only need an address
            path.isSegwit, // Segwit not defined so we should use 44'
            path.isChange || false, // No change address defined in ethereum
            path.startIndex,
        ];
    };

     /**
     * Get PublickKey Coin
     * @description Get PublickKey coin in proky device
     * @param coin CoinType;
     * @param path String | CoinPathParam;
     * @param showOnProkey Boolean;
     * @returns Address Coin
     * @example
     * ```js
     *  const key = await prokeyLink.GetPublickKey("Ethereum",'m/44'/60'/0'/0', true);
     * 
     * ```
     * ```js
     *  const key = await prokeyLink.GetPublickKey("Ethereum", {
        coinBip44: 60, account: 0, numberOfAddress: 1, isSegwit: false, isChange: false, startIndex: 0
      }, true);
     * 
     * ```
     */
    GetPublickKey = async (coin: CoinType, path: CoinPathParam | string, showOnProkey?: boolean) => {
        return await this.postMessage(Command.GET_PUBLICK_KEY, {
            coin,
            showOnProkey,
            path: typeof path === 'string' ? path : this.getPath(path),
        });
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
