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
  async function getEthAddress() {
    const address = await _deviceMgr.getAddress({
      coin: "Ethereum",
      showOnProkey: true,
      path: `m/44'/60'/0'/0`,
    });
    console.log("address", address);
  }
  async function getPublickKey() {
    console.log("PublickKey")
    const address = await _deviceMgr.getPublickKey({
      coin: "Ethereum",
      showOnProkey: true,
      path: `m/44'/60'/0'/0`,
    });
    console.log("address", address);
  }
  $("#connect_button").on("click", onConnect);
  $("#get_address_btn").on("click", getEthAddress);
  $("#get_publick_key_btn").on("click", getPublickKey);
});
