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

/**  CoinPathParam */
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
/** EthereumTx */
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
