export class ProkeyLink {
    private _window: Window | null = null;
    private _port: chrome.runtime.Port | null = null;

    /// This function opens the prokey-link website
    async Connect() {
        if (this._window == null) {
            const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                            width=0,height=0,left=-1000,top=-1000`;

            this._window = window.open('http://localhost:3000', 'prokey-link', params);
        }
        this._port = chrome.runtime.connect({name: "prokey-link"});
        this._port.postMessage({cmd: "Connect"});
    }
}
