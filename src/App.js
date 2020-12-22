import logo from "./logo.svg";
import "./App.css";

const clientId = process.env.REACT_APP_V_ID;
const clientSecret = process.env.REACT_APP_V_SECRET;
const accessToken = process.env.REACT_APP_V_TOKEN;

let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(clientId, clientSecret, accessToken);

client.request(
  {
    method: "GET",
    path: "/me/videos", //"/tutorial",
  },
  function (error, body, status_code, headers) {
    if (error) {
      console.log(error);
    }

    console.log(body);
  }
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
