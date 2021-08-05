import { Device, EthereumCommands } from "@prokey-io/webcore";
import { Features } from "@prokey-io/webcore/dist/src/models/Prokey";
import { Command, ICoin, ICoinParam } from "./interface";
import { Coin, EventEmitter, log } from "./utils";

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
    this.on(Command.CONNECT, async (res) => {
      log("DeviceMgr connect.");
      this.responseMessage(Command.CONNECT, {
        response: true,
        connect: true,
        error: null,
      });
    });
    //todo change after connect
    this.on(Command.INITIALIZE, async (res) => {
      console.log("Command.INITIALIZE", Command.INITIALIZE);
      this._initialize = await this.initialize();
      console.log("init", this._initialize);
      this.responseMessage(Command.INITIALIZE, {
        response: this._initialize,
        error: null,
      });
    });
    this.on(Command.PING, async (res) => {
      console.log(Command.PING);
      this.responseMessage(Command.PING, { response: true });
    });
    this.on(Command.GET_ADDRESS, async (res: any) => {
      console.log("address", res);
      const addresses = await this.getAddress(res);
      this.responseMessage(Command.GET_ADDRESS, { response: addresses });
    });
    this.on(Command.GET_PUBLICK_KEY, async (res) => {
      const keys = await this.getPublickKey(res);
      this.responseMessage(Command.GET_PUBLICK_KEY, { response: keys });
    });
    // this.on(Command.SIGN_TRANSACTION, async (res) => {
    //   const signTransaction = await this.signTransaction(res.data);
    //   this.responseMessage(Command.SIGN_TRANSACTION, {
    //     response: signTransaction,
    //   });
    // });
  }

  /**
   * Connect to prokey
   * @returns
   */
  async Connect() {
    log("Connect start");
    // if (this._connected) {
    //   this.emit(Command.INITIALIZE);
    //   return;
    // }
    if (!this._device) {
      this._device = new Device((res) => {
        console.log("device", res);
        this._connected = true;
        this.emit(Command.INITIALIZE);
      });
      this._device.AddOnFailureCallBack((res) => {
        if (confirm("Device not initialized!!!.\n Pleas rebot now?")) {
          this._device.RebootDevice();
        }
      });
      // this._device.AddOnButtonRequestCallBack((res) => {
      //   console.log("AddOnButtonRequestCallBack", res);
      // });
      // this._device.AddOnFailureCallBack((res) => {
      //   console.log("AddOnFailureCallBack", res);
      // });
      // this._device.AddOnPasspharaseRequestCallBack(() => {
      //   console.log("AddOnPasspharaseRequestCallBack");
      // });
      this._device.AddOnDeviceDisconnectCallBack(() => {
        this.emit(Command.DISCONNECT);
      });
    } else {
      this.emit(Command.INITIALIZE);
    }
    console.log("this._device", this._device);
    const res = await this._device.TransportConnect();
    console.log("this.TransportConnect", res);
    if (!res.success) {
      this.responseMessage(Command.INITIALIZE, {
        connect: false,
        error: res.errorMessage,
      });
      this._connected = false;
      throw new Error(res.errorMessage);
    }
  }
  //#region command

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
  signTransaction = (ethTx: any) => {
    return this.eth.SignTransaction(this._device, ethTx);
  };
  //#endregion
}
