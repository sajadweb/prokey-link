import * as $ from "jquery"

function onConnect(): void 
{
    console.log("clicked");
}

$("#connect_button").on("click", onConnect);