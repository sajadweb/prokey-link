import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ProkeyLink } from "link";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Array<string>>([]);
  const [currentURL, setCurrentURL] = useState<string>();
  let p = new ProkeyLink();
  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const connectProkey = async () => {
    try {
      setLoading(true);
      const prokey = await p.Connect();
      const pong = await p.Ping();
      setLoading(false);
      setMessage([...message, 'connect' + JSON.stringify(prokey), 'pong ' + JSON.stringify(pong)])
    } catch (error) {
      setLoading(false);
      setMessage([...message, `connect error= ${error}`])
    }

  };
  const ping = async () => {
    try {
      setLoading(true);
      console.log('p',p)
      const pong = await p.Ping();
      setLoading(false);
      setMessage([...message, 'pong ' + JSON.stringify(pong)])
    } catch (error) {
      setLoading(false);
      setMessage([...message, `pong error= ${error}`])
    }
  };

  return (
    <>
      <ul style={{ minWidth: "400px", minHeight: "120px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
        {message.map((m: string, index: number) => (<li key={m + index}>{m}</li>))}
      </ul>

      {loading && <div style={{ color: "red" }}>Loading ....<br /></div>}
      <button style={{ margin: "5px" }} onClick={connectProkey}>Connect to the Prokey website</button>
      <button style={{ margin: "5px" }} onClick={ping.bind(p)}>Ping</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
