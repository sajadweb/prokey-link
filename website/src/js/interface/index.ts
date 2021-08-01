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
  type: "chrome" | "firefox" | "website";
  id?: string;
}

/**
 * List Command
 */
export enum Command {
  GET_ADDRESS = "get-address",
  GET_PUBLICK_KEY = "get-publick-key",
  SIGN_TRANSACTION = "sign-transaction",
  INITIALIZE = "initialize",
  CONNECT = "connect",
}

export interface BitcoinTx {
  coinName: string;
  inputs: Array<any>;
  outputs: Array<any>;
  refTxs?: Array<any>;
  options: any;
}
export declare type EthereumTx = {
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