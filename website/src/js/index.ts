import * as $ from "jquery"
import { ConnectionMgr } from "./ConnectionMgr";
import { DeviceMgr } from "./DeviceMgr";

var _deviceMgr: DeviceMgr = new DeviceMgr();
var _connectionMgr: ConnectionMgr = new ConnectionMgr(_deviceMgr);

async function onConnect() {
    // console.log('index  onConnect')
    await _deviceMgr.Connect();
    $("#connect_button").fadeOut(100);
}

// when the page is ready
$(function () {
    $("#connect_button").on("click", onConnect);
    $("#other_button").on("click", _connectionMgr.othercommand.bind(_connectionMgr));
});