import { Device, EthereumCommands } from '../libs/prokey-webcore';
import { Features } from '../libs/prokey-webcore/dist/src/models/Prokey';
import { Command, FailureType, ICoin, ICoinParam } from './interface';
import { Coin, EventEmitter, log } from './utils';

/// Device manager class
export class DeviceMgr extends EventEmitter {
  private _connected: boolean = false;
  private _device: Device | null;
  private _initialize: Features;
  private eth: EthereumCommands | null;
  private coin: ICoin;

  constructor() {
    super();
    this.coin = new Coin();
    this.on(Command.CONNECT, async res => {
      this._initialize = await this.initialize();
      this.responseMessage(Command.CONNECT, {
        response: this._initialize,
        error: null
      });
    });
    this.on(Command.PING, async res => {
      console.log(Command.PING);
      this.responseMessage(Command.PING, { response: true });
    });
    this.on(Command.GET_ADDRESS, async (res: any) => {
      const addresses = await this.getAddress(res);
      this.responseMessage(Command.GET_ADDRESS, { response: addresses });
    });
    this.on(Command.SIGN_MESSAGE, async (res: any) => {
      const response = await this.signMessage(res);
      this.responseMessage(Command.SIGN_MESSAGE, response);
    });
    this.on(Command.VERIFY_MESSAGE, async (res: any) => {
      const response = await this.verifyMessage(res);
      this.responseMessage(Command.VERIFY_MESSAGE, response);
    });
    this.on(Command.GET_PUBLICK_KEY, async res => {
      const keys = await this.getPublickKey(res);
      this.responseMessage(Command.GET_PUBLICK_KEY, { response: keys });
    });
    this.on(Command.SIGN_TRANSACTION, async res => {
      const signTransaction = await this.signTransaction(res);
      this.responseMessage(Command.SIGN_TRANSACTION, {
        response: signTransaction
      });
    });
  }

  /**
   * Connect to prokey
   * @returns
   */
  async Connect() {
    if (!this._device) {
      this._device = new Device(res => {
        this._connected = true;
        this.emit(Command.CONNECT);
      });
      this._device.AddOnFailureCallBack(failureType => {
        if (
          failureType &&
          failureType.code === FailureType.Failure_NotInitialized
        ) {
          if (confirm('Device not initialized!!!.\n Pleas rebot now?')) {
            this._device.RebootDevice();
          }
        }
      });
      this._device.AddOnDeviceDisconnectCallBack(() => {
        this.emit(Command.DISCONNECT);
      });
    }
    const res = await this._device.TransportConnect();
    if (!res.success) {
      this.responseMessage(Command.CONNECT, {
        connect: false,
        error: res.errorMessage
      });
      this._connected = false;
      throw new Error(res.errorMessage);
    }
  }
  /**
   * check connect prokey device
   * @returns boolean
   */
  IsConnected(): boolean {
    return this._connected;
  }
  Disconnect(fn: () => void): void {
    this.on(Command.DISCONNECT, fn);
  }

  /**
   * Reset device to default state and ask for device details
   */
  initialize = (): Promise<Features> => {
    return this._device.Initialize();
  };

  /**
   * Get Bitcoin/Litecoin and etc address
   * @param device Prokey device instance
   * @param path BIP path
   * @param showOnProkey true means show the address on device display
   */
  getAddress = async (param: any) => {
    return this.coin.GetAddress(this._device, param);
  };
  /**
   * Get Public key
   * @param param ICoinParam{
   * @param device The prokey device
   * @param path BIP path
   * @param showOnProkey true means show the public key on prokey display
   * }
   */
  getPublickKey = (param: ICoinParam) => {
    return this.coin.GetPublicKey(this._device, param);
  };
  /**
   * sign a transaction
   * @param device Prokey device instance
   * @param bitcoinTransaction transaction to be signed
   */
  signTransaction = (params: any) => {
    return this.coin.SignTransaction(this._device, params);
  };

  /**
   * sign a Message
   * @param device Prokey device instance
   * @param bitcoinTransaction transaction to be signed
   */
  signMessage = (params: any) => {
    console.log('SignMessage 139',params);
    return this.coin.SignMessage(this._device, params);
  };
  /**
   * sign a transaction
   * @param device Prokey device instance
   * @param bitcoinTransaction transaction to be signed
   */
  verifyMessage = (params: any) => {
    return this.coin.VerifyMessage(this._device, params);
  };
}
