import { Device, EthereumCommands } from "@prokey-io/webcore";
import { Command, EthereumTx, Message } from "./interface";
import { EventEmitter, log, sleep } from "./utils";

/// Device manager class
export class DeviceMgr extends EventEmitter {
  private _connected: boolean = false;
  private _device: Device | null;
  private eth: EthereumCommands | null;

  constructor() {
    super();
    this.on(Command.GET_DEVICE_ID, async (res) => {
      log(`Listener command=>${Command.GET_DEVICE_ID}`);
      await sleep(3000);
      this.responseMessage(Command.GET_DEVICE_ID, { response: true });
    });
    this.on(Command.INITIAL, async (res) => {
      log(`Listener command=>${Command.GET_DEVICE_ID}`);
      await sleep(9000);
      this.responseMessage(Command.INITIAL, { response: true });
    });
    log("DeviceMgr initial.");
  }

  /**
   * Connect to prokey
   * @returns
   */
  async Connect() {
    log("Connect start");
    if (this._connected) {
      this.postMessage(Command.INITIAL, { connect: true });
      return;
    }
    if (!this._device) {
      this._device = new Device();
    }
    const res = await this._device.TransportConnect();
    console.log("TransportConnect ", res);
    if (!res.success) {
      this.postMessage(Command.INITIAL, {
        connect: false,
        error: res.errorMessage,
      });
      throw new Error(res.errorMessage);
    }
    this.postMessage(Command.INITIAL, { connect: true });
  }
  //#region command

  /**
   * check connect prokey device
   * @returns boolean
   */
  IsConnected(): boolean {
    return this._connected;
  }

  // Returns the blockchain wallet
  GetWallet() {}
  /**
   * Reset device to default state and ask for device details
   */
  initialize() {
    this._device.Initialize();
  }
  /**
   * Get Bitcoin/Litecoin and etc address
   * @param device Prokey device instance
   * @param path BIP path
   * @param showOnProkey true means show the address on device display
   */
  getEthAddress() {
    return this.eth.GetAddress(this._device, []);
  }
  /**
   * Get Public key
   * @param device The prokey device
   * @param path BIP path
   * @param showOnProkey true means show the public key on prokey display
   */
  getPublickKey() {
    return this.eth.GetPublicKey(this._device, []);
  }
  /**
   * sign a transaction
   * @param device Prokey device instance
   * @param bitcoinTransaction transaction to be signed
   */
  signTransaction(ethTx: EthereumTx) {
    return this.eth.SignTransaction(this._device, ethTx);
  }
  //#endregion
}
