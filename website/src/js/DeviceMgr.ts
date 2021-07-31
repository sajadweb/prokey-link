import { Device, EthereumCommands } from "@prokey-io/webcore";
import { Command, EthereumTx, Message } from "./interface";
import { log } from "./utils";

/// Device manager class
export class DeviceMgr {
  private _connected: boolean = false;
  private _device: Device | null;
  private _source: any;
  private eth: EthereumCommands | null;

  constructor() {
    this.EventListener = this.EventListener.bind(this);
    this.initialEventListener = this.initialEventListener.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.initialEventListener();
    log("DeviceMgr initial.");
  }
  async initialEventListener() {
    window.addEventListener(
      "message",
      (event: any) => {
        if (event.source === window) return;
        this._source = event.source;
        this.EventListener(event.data);
      },
      false
    );
  }
  async EventListener(message: Message) {
    log(`Listener command=${message?.command}`);
    switch (message.command) {
      case Command.GET_DEVICE_ID: {
        this.postMessage(Command.GET_DEVICE_ID, { message: "recived" });
        break;
      }
      case Command.INITIAL: {
        break;
      }
    }
  }
  /**
   * Data to be sent to the other window.
   * @param command
   * @param data
   */
  postMessage(command: Message["command"], data?: Message["data"]): void {
    log(command + JSON.stringify(data));
    this._source?.postMessage({ command, data }, "*");
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
