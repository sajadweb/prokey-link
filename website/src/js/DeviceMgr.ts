import { Device, EthereumCommands } from "@prokey-io/webcore";
import { Features } from "@prokey-io/webcore/dist/src/models/Prokey";
import { Command, EthereumTx, Message } from "./interface";
import { EventEmitter, log, sleep } from "./utils";

/// Device manager class
export class DeviceMgr extends EventEmitter {
  private _connected: boolean = false;
  private _device: Device | null;
  private _initialize: Features;
  private eth: EthereumCommands | null;

  constructor() {
    super();
    this.on(Command.CONNECT, async (res) => {
      log("DeviceMgr connect.");
      this.responseMessage(Command.CONNECT, { response: true });
    });
    //todo change after connect
    this.on(Command.INITIALIZE, async (res) => {
      const init = await this.initialize();
      console.log("Initialize",init)
      this.responseMessage(Command.INITIALIZE, { response: init });
    });
    this.on(Command.GET_ADDRESS, async (res) => {
      const addresses = await this.getEthAddress();
      this.responseMessage(Command.GET_ADDRESS, { response: addresses });
    });
    this.on(Command.GET_PUBLICK_KEY, async (res) => {
      const key = await this.getPublickKey();
      this.responseMessage(Command.GET_PUBLICK_KEY, { response: key });
    });
    this.on(Command.SIGN_TRANSACTION, async (res) => {
      const signTransaction = await this.signTransaction(res.data);
      this.responseMessage(Command.SIGN_TRANSACTION, {
        response: signTransaction,
      });
    });
  }

  /**
   * Connect to prokey
   * @returns
   */
  async Connect() {
    log("Connect start");
    if (this._connected) {
      // this.responseMessage(Command.CONNECT, { connect: true });
      return;
    }
    if (!this._device) {
      this._device = new Device((res) => {
        this.emit(Command.INITIALIZE);
      });
      this._device.AddOnButtonRequestCallBack((res) => {
        console.log("AddOnButtonRequestCallBack", res);
      });
      this._device.AddOnFailureCallBack((res) => {
        console.log("AddOnFailureCallBack", res);
      });
      this._device.AddOnPasspharaseRequestCallBack(() => {
        console.log("AddOnPasspharaseRequestCallBack");
      });
      this._device.AddOnDeviceDisconnectCallBack(() => {
        console.log("AddOnDeviceDisconnectCallBack");
      });
    }
    const res = await this._device.TransportConnect();
    console.log("TransportConnect ", res);
    if (!res.success) {
      this.responseMessage(Command.CONNECT, {
        connect: false,
        error: res.errorMessage,
      });
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
  getEthAddress = () => {
    return this.eth.GetAddress(this._device, []);
  };
  /**
   * Get Public key
   * @param device The prokey device
   * @param path BIP path
   * @param showOnProkey true means show the public key on prokey display
   */
  getPublickKey = () => {
    return this.eth.GetPublicKey(this._device, []);
  };
  /**
   * sign a transaction
   * @param device Prokey device instance
   * @param bitcoinTransaction transaction to be signed
   */
  signTransaction = (ethTx: EthereumTx) => {
    return this.eth.SignTransaction(this._device, ethTx);
  };
  //#endregion
}
