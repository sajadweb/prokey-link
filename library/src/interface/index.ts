/**
 * Data to be sent to the other window.
 */
export interface Message {
    command: Command | string;
    data?: any;
}

/**
 *library type information
 */
export interface LibInformation {
    type: 'chrome' | 'firefox' | 'website';
    id?: string;
}

/**
 * Command is use for connect in the Prokey website
 */
export enum Command {
    PING = 'ping',
    GET_ADDRESS = 'get-address',
    GET_PUBLICK_KEY = 'get-publick-key',
    SIGN_TRANSACTION = 'sign-transaction',
    INITIALIZE = 'initialize',
    CONNECT = 'connect',
}
/**
 * Coin type support
 */
export type CoinType = 'Ethereum' | 'Bitcoin';

/**
 * CoinGetAddresParam
 */
export interface CoinGetAddresParam {
    coinBip44: number;
    // Ethereum, each address is considered as an account
    account: number;
    // We only need an address
    numberOfAddress: number;
    // Segwit not defined so we should use 44'
    isSegwit: boolean;
    // No change address defined in ethereum
    isChange?: boolean;
    startIndex?: number;
}
