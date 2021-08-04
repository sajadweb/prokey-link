import { Device, EthereumCommands, BitcoinCommands } from "@prokey-io/webcore";
import {
  CoinType,
  ICoin,
  IGetAddressParam,
  IGetAddressResponse,
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
    type: CoinType,
    param: IGetAddressParam
  ): Promise<IGetAddressResponse> {
    const coin = this[type];
    let path = PathUtil.GetListOfBipPath(...param.args);

    return new Promise(async (resolve) => {
      if (!device) {
        return resolve({
          error: true,
          message: "Device not initialized",
        });
      }
      const addr = await coin.GetAddress(
        device,
        path[0].path,
        param.showOnProkey
      );
      device.RemoveOnFailureCallBack(() => {});
      return resolve({
        error: false,
        message: addr,
      });
    });
  }
}
