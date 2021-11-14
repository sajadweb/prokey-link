import { TransactionInput, TransactionOutput, RefTransaction, TransactionOptions } from './Prokey';

/** Command connect the Prokey website */
export enum Command {
    /** Command for check connect */
    PING = 'ping',
    /** Command for get address from device */
    GET_ADDRESS = 'get-address',
    /** Command for get publick key from device  */
    GET_PUBLICK_KEY = 'get-publick-key',
    /** Command for sign transaction with the Prokey  */
    SIGN_TRANSACTION = 'sign-transaction',
    INITIALIZE = 'initialize',
    CONNECT = 'connect',
    SIGN_MESSAGE = 'sign-message',
    VERIFY_MESSAGE = 'verify-message',
}

/** Message is Data to be sent to the other window
 * @example
 * ```ts
 * const msg:Message = {
 *   command: Command.CONNECT,
 *   data: {},
 * }
 * ```
 */
export interface Message {
    /** it is for connect the Prokey website */
    command: Command | string;
    /** data to be sent to the Prokey website */
    data?: any;
}

/** library type information */
export interface LibInformation {
    type: 'chrome' | 'firefox' | 'website';
    id?: string;
}

/** Coin type support */
export type CoinType = 'Ethereum' | 'Bitcoin';

/**  CoinPathParam
 * @example
 * ```ts
 * const sample: CoinPathParam = {
 *      coinBip44: 60,
 *      account: 0,
 *      numberOfAddress: 1,
 *      isSegwit: false,
 *      isChange: false,
 *      startIndex: 0
 *  }
 *
 * ```
 */
export interface CoinPathParam {
    coinBip44: number;
    /** Ethereum, each address is considered as an account */
    account: number;
    /** We only need an address*/
    numberOfAddress: number;
    /**  Segwit not defined so we should use 44' */
    isSegwit: boolean;
    /**  No change address defined in ethereum */
    isChange?: boolean;
    startIndex?: number;
}
/** Bitcoin Tx */
export interface BitcoinTx {
    coinName: string;
    inputs: Array<TransactionInput>;
    outputs: Array<TransactionOutput>;
    refTxs?: Array<RefTransaction>;
    options: TransactionOptions;
}

/** Ripple Transaction */
export type RippleTransaction = {
    address_n: Array<number>;
    fee?: number;
    flags?: number;
    sequence?: number;
    last_ledger_sequence?: number;
    payment: {
        amount: number;
        destination: string;
        destination_tag?: number;
    };
};
/** EthereumTx 
 * @example
 * ```ts
 * const sample: EthereumTx = {
 *     to: "0x1678a085c290ebd122dc42cba69373b5953b831d",
 *     gasPrice: "0x77359400",
 *     gasLimit: "0x7b0d",
 *     nonce: "0x4b",
 *     value:
"0x5f973e540f2d3c2f06d3725a626b75247593cb36477187ae07ecfe0a4db3cf57",
 *     address_n: ["0x1075EcD44063f7ffccE06df09763AEeefD9503e6"],
 *  }
 * 
 * ```
*/
export type EthereumTx = {
    address_n: Array<number>;
    to: string;
    value: string;
    gasPrice: string;
    gasLimit: string;
    nonce: string;
    data?: string;
    chainId?: number;
    txType?: number;
    v?: string;
    r?: string;
    s?: string;
};

/**  ICoinTransactionParam */
export type ICoinTransactionParam = BitcoinTx | EthereumTx | RippleTransaction;

export interface Manifest {
    appUrl: string;
    email: string;
}
