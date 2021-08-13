import * as $ from "jquery";
import { DeviceMgr } from "./DeviceMgr";

// when the page is ready
$(function () {
  var _deviceMgr: DeviceMgr = new DeviceMgr();
  _deviceMgr.Disconnect(() => {
    return $("#connect_button").fadeIn(100);
  });
  async function onConnect() {
    await _deviceMgr.Connect();
    $("#connect_button").fadeOut(100);
  }
  $("#connect_button").on("click", onConnect);
});
