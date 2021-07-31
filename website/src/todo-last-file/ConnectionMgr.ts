/// <reference types="chrome"/>

import { DeviceMgr } from "./DeviceMgr";
var laserExtensionId = "golinjefegadnbegfjpmdccllggggmcj";
export class ConnectionMgr {
  private _deviceMgr: DeviceMgr;
  public port: any;
  public i = 0;

  constructor(devMgr: DeviceMgr) {
    this._deviceMgr = devMgr;
    this.port = chrome.runtime.connect(laserExtensionId, {
      name: "prokey-link",
    });

    console.log("onConnect", this.port);
    // this.port.postMessage({ massage: msg });
    this.port.onMessage.addListener((msg: any) => {
      if (msg?.cmd === "Connect") {
        console.log("index  onConnect");
        this.i = 0;
        this.onConnect();
        this.port.postMessage({ cmd: "Connect", error: false });
      }
    });
  }
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async onConnect() {
    try {
      console.log(this.i);
      console.log("onConnect", new Date());
      this.i++;
      await this.sleep(3000);
      await this._deviceMgr?.Connect();
     // $("#connect_button").fadeOut(100);
    } catch (error) {
      console.log(this.i, error);
      if (this.i < 5) this.onConnect();
    }
  }

  postMessage(cmd: string, data: Object) {
      this.port.postMessage({ cmd, ...data });
  }
  othercommand() {
    try {
      console.log('Othercommand')
      this.postMessage("Othercommand", { error: false });
    } catch (error) {
      console.log(error);
    }
  }
}
