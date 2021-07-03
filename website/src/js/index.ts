import * as $ from "jquery"
import { Device } from "@prokey-io/webcore"

function onConnect(): void {    
    var dev = new Device();
    dev.TransportConnect();
    console.log("clicked");
} 

$("#connect_button").on("click", onConnect);  