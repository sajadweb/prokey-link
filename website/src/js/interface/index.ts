import { Device } from "@prokey-io/webcore";
import { ICoinCommands } from "@prokey-io/webcore/dist/src/device/ICoinCommand";

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
  PING = "ping",
  GET_ADDRESS = "get-address",
  GET_PUBLICK_KEY = "get-publick-key",
  SIGN_TRANSACTION = "sign-transaction",
  INITIALIZE = "initialize",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
}

/**
 * Coin Type Support
 */
export type CoinType = "Bitcoin" | "Ethereum";

/**
 * IGetAddress
 * @param  coinBip44: number;
 * @param  account: number;
 * @param  numberOfAddress: number;
 * @param  isSegwit: boolean;
 * @param  isChange? boolean
 * @param  startIndex?: number;
 */
export interface IGetAddressParam {
  showOnProkey?: boolean;
  args?: [number, number, number, boolean, boolean?, number?];
}
export interface IGetAddressResponse {
  error: boolean;
  code?: number;
  message?: string | Object;
}
export interface ICoin {
  Bitcoin: ICoinCommands | null;
  Ethereum: ICoinCommands | null;
  // GetCoinInfo() : any;
  GetAddress(
    device: Device,
    type: CoinType,
    param: IGetAddressParam
  ): Promise<IGetAddressResponse>;

  // GetAddresses(
  //     device: any,
  //     path: Array<Array<number> | string>,
  // ): Promise<any>;

  // GetPublicKey(
  //     device: any,
  //     path: Array<number> | string,
  //     showOnProkey?: boolean,
  // ): Promise<any>;

  // SignTransaction(
  //     device: any,
  //     transaction:any,
  // ): Promise<any>;

  // SignMessage(
  //     device: any,
  //     path: Array<number>,
  //     message: Uint8Array,
  //     coinName?: string
  // ): Promise<any>;

  // VerifyMessage(
  //     device: any,
  //     address: string,
  //     message: Uint8Array,
  //     signature: Uint8Array,
  //     coinName?: string,
  // ): Promise<any>;
}
