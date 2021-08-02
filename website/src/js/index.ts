import * as $ from "jquery";
import { DeviceMgr } from "./DeviceMgr";

// when the page is ready
$(function () {
 
  var _deviceMgr: DeviceMgr = new DeviceMgr();
  async function onConnect() {
    await _deviceMgr.Connect();
    $("#connect_button").fadeOut(100);
  }
  async function getEthAddress() {
   const address= await _deviceMgr.getEthAddress();
   console.log({address})
  }
  $("#connect_button").on("click", onConnect);
  $("#get_address_btn").on("click", getEthAddress);
});
