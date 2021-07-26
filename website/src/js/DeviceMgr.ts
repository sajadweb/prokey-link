import { Device, BitcoinCommands } from "@prokey-io/webcore";
export interface BitcoinTx {
    coinName: string;
    inputs: Array<any>;
    outputs: Array<any>;
    refTxs?: Array<any>;
    options: any;
}
/// Device manager class
export class DeviceMgr {
  private _connected: boolean = false;
  private _device: Device | null;
  private _btcn: BitcoinCommands | null;

  async Connect() {
    if (this._connected) return;
    if (this._device == null) {
      this._device = new Device();
    }
    const res = await this._device.TransportConnect();
    if (!res.success) throw new Error(res.errorMessage);
    this._btcn = new BitcoinCommands();
  }

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
    return this._btcn.GetAddress(this._device, []);
  }
  /**
   * Get Public key
   * @param device The prokey device
   * @param path BIP path
   * @param showOnProkey true means show the public key on prokey display
   */
  getPublickKey() {
    return this._btcn.GetPublicKey(this._device, []);
  }
  /**
   * sign a transaction
   * @param device Prokey device instance
   * @param bitcoinTransaction transaction to be signed
   */
  signTransaction(bitcoinTransaction: BitcoinTx) {
    return this._btcn.SignTransaction(this._device, bitcoinTransaction);
  }
}
