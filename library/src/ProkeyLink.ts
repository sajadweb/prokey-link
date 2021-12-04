import { CoinPathParam, CoinType, Command, ICoinTransactionParam, Manifest, Message } from './interface';
import { EventEmitter, initialWindow, log, sleep } from './utils';
import { getInformationLib } from './utils/info';

export class ProkeyLink extends EventEmitter {
    /**
     * @ignore
     */
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
        await sleep(3000);
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
     * @ignore
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
        console.log('prokey-link', {
            command: Command.GET_PUBLICK_KEY,
            coin,
            showOnProkey,
            path: typeof path === 'string' ? path : this.getPath(path),
        });
        return await this.postMessage(Command.GET_PUBLICK_KEY, {
            coin,
            showOnProkey,
            path: typeof path === 'string' ? path : this.getPath(path),
        });
    };

    /**
     * Sign Transaction
     * @description Sign Transaction
     * @param {string} coin CoinType;
     * @param {ICoinTransactionParam} transaction ICoinTransactionParam
     * @returns ICoinTransactionParam
     * @example
     * ```js
     *   const sample = {
      to: "0x1678a085c290ebd122dc42cba69373b5953b831d",
      gasPrice: "0x77359400",
      gasLimit: "0x7b0d",
      nonce: "0x4b",
      value:
        "0x5f973e540f2d3c2f06d3725a626b75247593cb36477187ae07ecfe0a4db3cf57",
      address_n: ["0x1075EcD44063f7ffccE06df09763AEeefD9503e6"],
    };
    const tr = await _deviceMgr.signTransaction({
      coin: "Ethereum",
      transaction: sample,
    });
     * 
     * ```
     */
    SignTransaction = async (coin: CoinType, transaction: ICoinTransactionParam) => {
        return await this.postMessage(Command.SIGN_TRANSACTION, {
            coin,
            transaction,
        });
    };
    SignMessage = async (coin: CoinType, path: string, message: Uint8Array) => {
        return await this.postMessage(Command.SIGN_MESSAGE, {
            coin,
            path,
            message,
        });
    };
    VerifyMessage = async (coin: CoinType, address: string, message: Uint8Array, signature: Uint8Array) => {
        return await this.postMessage(Command.VERIFY_MESSAGE, {
            coin,
            address,
            message,
            signature,
        });
    };
    /**
     * Connect External
     * @ignore
     */
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
