import { Device, EthereumCommands, BitcoinCommands } from "@prokey-io/webcore";
import {
  ICoin,
  ICoinParam,
  IGetAddressResponse,
  IGetPublickKeyResponse,
} from "../../interface";
import * as PathUtil from "@prokey-io/webcore/dist/src/utils/pathUtils";
import { ICoinCommands } from "@prokey-io/webcore/dist/src/device/ICoinCommand";
declare function bind<T, U extends any[], V>(
  f: (x: T, ...args: U) => V,
  x: T
): (...args: U) => V;
function call(f: any, args: any) {
  let fn: any;
  for (let i = 0; i < args.length; i++) {
    fn = bind(fn ? fn : f, args[i]);
  }
  return fn;
}

export class Coin implements ICoin {
  Bitcoin: ICoinCommands | null;
  Ethereum: ICoinCommands | null;

  constructor() {
    this.Bitcoin = new BitcoinCommands();
    this.Ethereum = new EthereumCommands();
  }
  /**
   *
   * @param device : Device;
   * @param type : CoinType;
   * @param param : IGetAddressParam
   * @returns
   */
  async GetAddress(
    device: Device,
    param: ICoinParam
  ): Promise<IGetAddressResponse> {
    try {
      const coin = this[param.coin];
      const args = param.path;
      let path: any;
      if (typeof args === "string") {
        path = PathUtil.getHDPath(args);
      } else {
        const list = PathUtil.GetListOfBipPath(...args);
        path = list[0].path;
      }
      return new Promise(async (resolve) => {
        if (!device) {
          return resolve({
            error: true,
            message: "Device not initialized",
          });
        }
        const addr = await coin.GetAddress(device, path, param.showOnProkey);
        return resolve({
          error: false,
          message: addr,
        });
      });
    } catch (error) {
      return {
        error: true,
        message: error?.message,
      };
    }
  }

  /**
   * Get Public key
   * @param device The prokey device
   * @param param ICoinParam
   */
  GetPublicKey(
    device: Device,
    param: ICoinParam
  ): Promise<IGetPublickKeyResponse> {
      console.log('GetPublicKey',{
        param
      })
    const coin = this[param.coin];
    const args = param.path;
    let path: any;
    if (typeof args === "string") {
      path = PathUtil.getHDPath(args);
    } else {
      const list = PathUtil.GetListOfBipPath(...args);
      path = list[0].path;
    }
    return new Promise(async (resolve) => {
      if (!device) {
        return resolve({
          error: true,
          message: "Device not initialized",
        });
      }
      const keys = await coin.GetPublicKey(device, path, param.showOnProkey);
      return resolve({
        error: false,
        message: keys,
      });
    });
  }
}
