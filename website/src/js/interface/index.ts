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
 * @param showOnProkey true means show the public key on prokey display
 * @param path BIP path
 */
export interface ICoinParam {
  showOnProkey?: boolean;
  coin: CoinType;
  path: [number, number, number, boolean, boolean?, number?] | string;
}
export interface IGetAddressResponse {
  error: boolean;
  code?: number;
  message?: string | Object;
}
export interface IGetPublickKeyResponse {
  error: boolean;
  code?: number;
  message?: string| Object | PublicKey;
}
export type HDPubNode = {
  depth: number;
  fingerprint: number;
  child_num: number;
  chain_code: string;
  public_key: string;
};
export type PublicKey = {
  node: HDPubNode;
  xpub: string;
};
export interface ICoin {
  Bitcoin: ICoinCommands | null;
  Ethereum: ICoinCommands | null;
  // GetCoinInfo() : any;
  /**
   *
   * @param device : Device;
   * @param param : ICoinParam
   */
  GetAddress(
    device: Device,
    param: ICoinParam
  ): Promise<IGetAddressResponse>;

  /**
   * Get Public key
   * @param device The prokey device
   * @param param ICoinParam
   */
  GetPublicKey(device: Device, param: ICoinParam): Promise<IGetPublickKeyResponse>;

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
