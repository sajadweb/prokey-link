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
    PING='ping',
    GET_ADDRESS = "get-address",
    GET_PUBLICK_KEY = "get-publick-key",
    SIGN_TRANSACTION = "sign-transaction",
    INITIALIZE = "initialize",
    CONNECT = "connect",
}