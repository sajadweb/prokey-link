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
      args: [
        60,
        0, // Ethereum, each address is considered as an account
        1, // We only need an address
        false, // Segwit not defined so we should use 44'
        false, // No change address defined in ethereum
        0,
      ],
    });
    console.log("address", address);
  }
  $("#connect_button").on("click", onConnect);
  $("#get_address_btn").on("click", getEthAddress);
});
