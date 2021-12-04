import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ProkeyLink } from "link";
let p = new ProkeyLink();
const Popup = () => {
  const [count, setCount] = useState(0);
  const [initial, setInitial] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Array<any>>([]);
  const [currentURL, setCurrentURL] = useState<string>();
  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: count.toString() });
  }, [count]);
  useEffect(() => {
    p.AddGetInitialize((res) => {
      setInitial(res.response)
      onSuccess(JSON.stringify(res))
    })
  }, [p]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);
  const onSuccess = (text: string) => {
    setMessage([{ text, color: 'green' }, ...message])
  }
  const onError = (text: string) => {
    setMessage([{ text, color: 'red' }, ...message])
  }
  const onWarning = (text: string) => {
    setMessage([{ text, color: '#f3751c' }, ...message])
  }
  const connectProkey = async () => {
    try {
      setLoading(true);
      const prokey = await p.Connect();
      setLoading(false);
      onSuccess('connect' + JSON.stringify(prokey))
    } catch (error) {
      setLoading(false);
      onError(`connect error= ${error}`)
    }

  };
  const ping = async () => {
    try {
      setLoading(true);
      const pong = await p.Ping();
      setLoading(false);
      onSuccess('pong =' + JSON.stringify(pong))
    } catch (error) {
      setLoading(false);
      onError(`pong error= ${error}`)
    }
  };
  const getEthAddress = async () => {
    try {
      setLoading(true);
      const address = await p.GetAddress("Ethereum","m/44'/60'/0'/0/0", true);
      setLoading(false);
      onSuccess('getEthAddress =' + JSON.stringify(address))
    } catch (error) {
      setLoading(false);
      onError(`getEthAddress error= ${error}`)
    }
  };
  const getPublickKey = async () => {
    try {
      setLoading(true);
      const keys = await p.GetPublickKey("Ethereum",`m/44'/60'/0'/0/0`, true);
      setLoading(false);
      onSuccess('GetPublickKey =' + JSON.stringify(keys))
    } catch (error) {
      setLoading(false);
      onError(`GetPublickKey error= ${error}`)
    }
  };
  const signTransaction = async () => {
    try {
      setLoading(true);
      const transaction: any={
        to: "0x1678a085c290ebd122dc42cba69373b5953b831d",
        gasPrice: "0x77359400",
        gasLimit: "0x7b0d",
        nonce: "0x4b",
        value:
          "0x5f973e540f2d3c2f06d3725a626b75247593cb36477187ae07ecfe0a4db3cf57",
        address_n: ["0x1075EcD44063f7ffccE06df09763AEeefD9503e6"],
      }
      const keys = await p.SignTransaction("Ethereum",transaction);
      setLoading(false);
      onSuccess('signTransaction =' + JSON.stringify(keys))
    } catch (error) {
      setLoading(false);
      onError(`signTransaction error= ${error}`)
    }
  };

  return (
    <>
      {initial && <div>
        <h3>
          connect to the Prokey device {initial?.label}({initial?.device_id})
        </h3>
      </div>}
      <ul style={{
        minWidth: "400px",
        maxWidth: "400px",
        minHeight: "120px",
        maxHeight: "120px",
        overflow: "scroll"
      }}>
        {message.map((m: any, index: number) => (<li style={{ color: m.color }} key={m.text + index}>{m.text}</li>))}
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>

      {loading && <div style={{ color: "red" }}>Loading ....<br /></div>}
      <button style={{ margin: "5px" }} onClick={connectProkey}>Connect to the Prokey website</button>
      <button style={{ margin: "5px" }} onClick={ping}>Ping</button>
      <button style={{ margin: "5px" }} onClick={getEthAddress}>get Eth Address</button>
      <button style={{ margin: "5px" }} onClick={getPublickKey}>get Eth PublickKey</button>
      <button style={{ margin: "5px" }} onClick={signTransaction}>Sign Transaction</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
