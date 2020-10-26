import React from "react";
import "../App.css";
import { fazerRequisicaoComBody } from "../utils/fetch";

export default function Jogo(props) {
  const { token, setToken } = props;
  const { timeCasa, setTimeCasa } = React.useState("");
  const { timeVisitante, setTimeVisitante } = React.useState("");
  const { golsCasa, setGolsCasa } = React.useState(null);
  const { golsVisitante, setGolsVisitante } = React.useState(null);
  const { rodada, setRodada } = React.useState("");

  return (
    <div className="Jogo">
      <label for="">
        Time de Casa
        <input
          value={timeCasa}
          onChange={(event) => {
            setTimeCasa(event.target.value);
          }}
        />
      </label>

      <label for="">
        Time Visitante
        <input
          onChange={(event) => {
            setTimeVisitante(event.target.value);
          }}
        ></input>
      </label>

      <label for="">
        Gols do Time de Casa
        <input
          onChange={(event) => {
            setGolsCasa(event.target.value);
          }}
        ></input>
      </label>

      <label for="">
        Gols do Time Visitante
        <input
          onChange={(event) => {
            setGolsVisitante(event.target.value);
          }}
        ></input>
      </label>

      <label for="">
        Rodada
        <input
          onChange={(event) => {
            setRodada(event.target.value);
          }}
        ></input>
      </label>
      <button
        onClick={() => {
          if (
            timeCasa &&
            timeVisitante &&
            golsCasa &&
            golsVisitante &&
            rodada
          ) {
            fazerRequisicaoComBody(
              "http://localhost:8081/jogo",
              "POST",
              { timeCasa, timeVisitante, golsCasa, golsVisitante, rodada },
              token
            )
              .then((res) => res.json())
              .then((resJson) => {
                console.log(resJson);
                setTimeCasa("");
                setTimeVisitante("");
                setGolsCasa(null);
                setGolsVisitante(null);
                setRodada(null);
              });
          }
        }}
      >
        Criar
      </button>
    </div>
  );
}
