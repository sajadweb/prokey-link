import {
  Device,
  EthereumCommands,
  BitcoinCommands
} from '../../../libs/prokey-webcore';
import {
  ICoin,
  ICoinParam,
  ICoinParamMessage,
  ICoinParamVerifyMessage,
  ICoinTransactionParam,
  IGetAddressResponse,
  IGetPublickKeyResponse
} from '../../interface';
import * as PathUtil from '../../../libs/prokey-webcore/dist/src/utils/pathUtils';
import { ICoinCommands } from '../../../libs/prokey-webcore/dist/src/device/ICoinCommand';
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
   * SignTransaction
   * @param {Device} device
   * @param {ICoinTransactionParam} param
   * @returns
   */
  async SignTransaction(
    device: Device,
    param: ICoinTransactionParam
  ): Promise<any> {
    try {
      const coin = this[param.coin];
      const transaction = param.transaction;
      const message = await coin.SignTransaction(device, transaction);
      return {
        error: false,
        message
      };
    } catch (error) {
      return {
        error: true,
        message: error?.message
      };
    }
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
      let path = PathUtil.getHDPath(args);
      
      return new Promise(async resolve => {
        if (!device) {
          return resolve({
            error: true,
            message: 'Device not initialized'
          });
        }
        const addr = await coin.GetAddress(device, path, param.showOnProkey);
        return resolve({
          error: false,
          message: addr
        });
      });
    } catch (error) {
      return {
        error: true,
        message: error?.message
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
    const coin = this[param.coin];
    const args = param.path;
    let path = PathUtil.getHDPath(args);

    return new Promise(async resolve => {
      if (!device) {
        return resolve({
          error: true,
          message: 'Device not initialized'
        });
      }
      const keys = await coin.GetPublicKey(device, path, param.showOnProkey);
      return resolve({
        error: false,
        message: keys
      });
    });
  }

  /**
   * Sign Message
   * @param device The prokey device
   * @param param ICoinParamMessage
   */
  async SignMessage(device: Device, param: ICoinParamMessage): Promise<any> {
    const coin = this[param?.coin];
    const path = PathUtil.getHDPath(param.path);
    const response = await coin.SignMessage(device, path, param.message);
    if (response) {
      return { error: false, message: response };
    }
    return { error: true };
  }
  /**
   * Verify Message
   * @param device The prokey device
   * @param param ICoinParamVerifyMessage
   */
  async VerifyMessage(
    device: Device,
    param: ICoinParamVerifyMessage
  ): Promise<any> {
    const coin = this[param?.coin];
    const response = await coin.VerifyMessage(
      device,
      param.address,
      param.message,
      param.signature
    );
    if (response) {
      return { error: false, message: response };
    }
    return { error: true };
  }
}
