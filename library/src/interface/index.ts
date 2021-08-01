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
 * List Command
 */
export enum Command{
    INITIAL="initial",
    GET_DEVICE_ID='get-device-id',
    GET_ADDRESS = "get-address",
    GET_PUBLICK_KEY = "get-publick-key",
    SIGN_TRANSACTION = "sign-transaction",
    INITIALIZE = "initialize",
    CONNECT = "connect",
}