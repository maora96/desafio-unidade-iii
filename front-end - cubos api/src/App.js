import React from "react";
import "./App.css";
import Header from "./components/Header";
import Rodada from "./components/Rodada";
import Tabela from "./components/Tabela";
import Jogo from "./components/Jogo";

function App() {
  // token
  const [token, setToken] = React.useState(null);

  return (
    <div className="App">
      <Header token={token} setToken={setToken} />
      <main>
        <div className="main-wrapper">
          <div className="side-wrapper">
            <Rodada token={token} setToken={setToken} />
            {/*token ? <Jogo /> : ""*/}
          </div>

          <Tabela />
        </div>
      </main>
    </div>
  );
}

export default App;
