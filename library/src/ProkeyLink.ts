export class ProkeyLink {
    private _window: Window | null = null;
    private _port: chrome.runtime.Port | null = null;
    private first = true;

    /// This function opens the prokey-link website
    async Connect() {
        console.log('%c Connect...', 'color:red;');
        if (this._window == null) {
            const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                            width=0,height=0,left=-120,top=-300`;

            this._window = window.open('http://localhost:3000', 'prokey-link', params);
        }

        chrome.runtime.onConnectExternal.addListener((port) => {
            this._port = port;
            console.log('port', this._port);
            if (this._port.name === 'prokey-link') {
                if (this.first) {
                    this._port.postMessage({ cmd: 'Connect' });
                }
                this._port.onMessage.addListener((msg) => {
                    this.first = false;
                    console.log('massage', msg);
                });
            }
        });
    }
}
