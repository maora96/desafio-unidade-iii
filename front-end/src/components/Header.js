import React from "react";
import "../App.css";
import { fazerRequisicaoComBody } from "../utils/fetch";

export default function Header(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { token, setToken } = props;

  return (
    <div className="Wrapper">
      <header>
        <h1>Brasileirão</h1>
        {token !== null ? (
          <button onClick={() => setToken(null)}>Deslogar</button>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              fazerRequisicaoComBody("http://localhost:8081/auth", "POST", {
                email,
                password,
              })
                .then((res) => res.json())
                .then((resJson) => {
                  const novoToken = resJson.dados;
                  console.log(token);
                  setToken(novoToken);
                  setEmail("");
                  setPassword("");
                });
            }}
          >
            <label for="">
              Email
              <input
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </label>
            <label for="">
              Senha
              <input
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </label>
            <button className="log">Logar</button>
          </form>
        )}
      </header>
    </div>
  );
}
