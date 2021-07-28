import * as $ from "jquery";
import { ConnectionMgr } from "./ConnectionMgr";
import { DeviceMgr } from "./DeviceMgr";

var _deviceMgr: DeviceMgr = new DeviceMgr();
var _connectionMgr: ConnectionMgr = new ConnectionMgr(_deviceMgr);

async function onConnect() {
  const bc2 = new BroadcastChannel("test_channel");
  bc2.postMessage("This is a test message.");
  console.log("index  onConnect");
  // await _deviceMgr.Connect();
  // $("#connect_button").fadeOut(100);
}
async function othercommand() {
  const bc2 = new BroadcastChannel("test_channel");
  bc2.postMessage("This is a test message.");
  console.log("othercommand");
  // await _deviceMgr.Connect();
  // $("#connect_button").fadeOut(100);
}

// when the page is ready
$(function () {
  
    window.addEventListener(
    "message",
    (event) => {
     // console.log('data',event);
      // console.log('data',event?.target);
      console.log('data',event?.data);
      // ...
    },
    false
  );
  $("#connect_button").on("click", onConnect);
  $("#other_button").on("click", othercommand);
});
