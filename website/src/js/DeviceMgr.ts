import { Device } from "@prokey-io/webcore"

/// Device manager class
export class DeviceMgr {
    private _connected: boolean = false;
    private _device: Device | null;

    async Connect() {
        if (this._connected)
            return;
        if (this._device == null)
        {
            this._device = new Device();
        }
        const res = await this._device.TransportConnect();
        if (!res.success)
            throw new Error(res.errorMessage);            
    }

    IsConnected(): boolean {
        return this._connected;
    }

    // Returns the blockchain wallet
    GetWallet() {

    }
}