import { Device, EthereumCommands } from "@prokey-io/webcore";
export interface BitcoinTx {
  coinName: string;
  inputs: Array<any>;
  outputs: Array<any>;
  refTxs?: Array<any>;
  options: any;
}
export declare type EthereumTx = {
  address_n: Array<number>;
  to: string;
  value: string;
  gasPrice: string;
  gasLimit: string;
  nonce: string;
  data?: string;
  chainId?: number;
  txType?: number;
  v?: string;
  r?: string;
  s?: string;
};
const log=(lable:string,color='green')=>{
  console.log(`%c ${lable}`, `color:${color};`);
}
/// Device manager class
export class DeviceMgr {
  private _connected: boolean = false;
  private _device: Device | null;
  private _source: any;
  private eth: EthereumCommands | null;

  constructor() {
    this.EventListener = this.EventListener.bind(this);
    log("DeviceMgr initial.");
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
  async EventListener(data: { command: string }) {
     log('EventListener v1 data=');
     log(JSON.stringify(data));
  }
  async Connect() {
    if (this._connected) return;
    if (this._device == null) {
      this._device = new Device();
    }
    const res = await this._device.TransportConnect();
    if (!res.success) throw new Error(res.errorMessage);
    this.eth = new EthereumCommands();
  }
//#region command
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
  getAddress() {
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
