import React from "react";
import "./App.css";
import Header from "./components/Header";
import Rodada from "./components/Rodada";
import Tabela from "./components/Tabela";

function App() {
  // token
  const [token, setToken] = React.useState(null);

  return (
    <div className="App">
      <Header token={token} setToken={setToken} />
      <main>
        <div className="main-wrapper">
          <Rodada token={token} setToken={setToken} />
          <Tabela />
        </div>
      </main>
    </div>
  );
}

export default App;
