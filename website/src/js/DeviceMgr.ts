import { Device, EthereumCommands } from "@prokey-io/webcore";
import { Features } from "@prokey-io/webcore/dist/src/models/Prokey";
import { Command, EthereumTx, Message } from "./interface";
import { EventEmitter, log, sleep } from "./utils";
import * as PathUtil from '@prokey-io/webcore/dist/src/utils/pathUtils';
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
      console.log("init", this._initialize );
      this.responseMessage(Command.INITIALIZE, {
        response: this._initialize , 
        error: null,
      });
    });
    this.on(Command.PING, async (res) => {
      console.log(Command.PING);
      this.responseMessage(Command.PING, { response: true });
    });
    this.on(Command.GET_ADDRESS, async (res) => {
      const addresses = await this.getEthAddress();
      this.responseMessage(Command.GET_ADDRESS, { response: addresses });
    });
    // this.on(Command.GET_PUBLICK_KEY, async (res) => {
    //   const key = await this.getPublickKey();
    //   this.responseMessage(Command.GET_PUBLICK_KEY, { response: key });
    // });
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
    this.eth=new EthereumCommands();
    let path = PathUtil.GetListOfBipPath(
      60,                 
      0,                      // Ethereum, each address is considered as an account
      1,                      // We only need an address
      false,                  // Segwit not defined so we should use 44'
      false,                  // No change address defined in ethereum
      0);
    return this.eth.GetAddress(this._device, path[0].path, true);
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
