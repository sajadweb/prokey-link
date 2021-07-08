/// <reference types="chrome"/>

import { DeviceMgr } from "./DeviceMgr";

export class ConnectionMgr {
    private _deviceMgr: DeviceMgr;

    constructor(devMgr: DeviceMgr) {
        this._deviceMgr = devMgr;
        chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
            if (port.name === "prokey-link") {
                port.onMessage.addListener((msg: any, port: chrome.runtime.Port) => {
                    // new message came from client
                });
            }
        });
    }
}