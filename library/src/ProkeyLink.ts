export class ProkeyLink {
    private _window?: Window | null;
    private _port: chrome.runtime.Port | null = null;
    private first = true;
    constructor() {
        chrome.tabs.onCreated.addListener((tab) => {
            console.log('tab', tab);
        });
    }
    /// This function opens the prokey-link website
    async Connect() {
        console.log('%c Connect...', 'color:red;');
        if (!this._window) {
            const params = `width=400,height=200,left=-120,top=-300`;
            this._window = window.open('http://localhost:3000', 'prokey-link', params);
        }
        // try {
        // chrome.tabs.query({ url: 'http://localhost:3000/' }, function (tabsArray) {
        //     const tab: any = tabsArray[0];
        //     console.log('tab', tab);
        //     chrome.tabs.sendMessage(tab?.id, { greeting: 'hello' }, function (response) {
        //         console.log('response', response);
        //         // WARNING! Might be evaluating an evil script!
        //         // var resp = eval('(' + response.farewell + ')');
        //     });
        //     // chrome.windows.get(tab.windowId, function (response: any) {
        //     //     console.log(response);
        //     // });
        // });
        // chrome.tabs.query({}, function (tabsArray) {
        //     console.log('all', tabsArray);
        //     tabsArray?.forEach((tabs: any) => {
        //         console.log('tab', tabs);
        //         console.log('tab', tabs?.url);
        //     });
        // });
        // chrome.windows.getAll({ populate: true }, (items) => {
        //     items.forEach((tabs:any)=>{
        //         tabs?.forEach((tab:any)=>{

        //         })
        //     })
        //     console.log('win', win);
        //   //  win?.postMessage('The is massage', 'http://localhost:3000');
        //     // });
        // } catch (error) {
        //     console.log(error);
        // }

        chrome.runtime.onMessageExternal.addListener((port) => {
            this._port = port;
            console.log('port', this._port);
            // if (this._port.name === 'prokey-link') {
            //     if (this.first) {
            //         this._port.postMessage("massage");
            //     }
            //     this._port.onMessage.addListener((msg) => {
            //         this.first = false;
            //         console.log('massage', msg);
            //     });
            // }
        });
    }

    async WindowSend() {
        // console.log('WindowSend', tab);
        //     // This does nothing, assuming the window hasn't changed its location.
        //    this._window?.postMessage("The user is 'bob' and the password is 'secret'", '*');
        //     // This will successfully queue a message to be sent to the popup, assuming
        //     // the window hasn't changed its location.
        //     this._window?.postMessage('hello there!', 'http://localhost:3000/');
        //     window.addEventListener(
        //         'message',
        //         (event) => {
        //             console.log('tab', event);
        //         },
        //         false,
        //     );
    }
}
