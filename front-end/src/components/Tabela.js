import React from "react";
import "../App.css";
import { fazerRequisicaoComBody } from "../utils/fetch";

const colunas = [
  "nome",
  "pontos",
  "jogos",
  "vitorias",
  "empates",
  "derrotas",
  "golsFeitos",
  "golsSofridos",
  "saldo",
];

const legenda = {
  nome: "Time",
  pontos: "PTS",
  jogos: "J",
  vitorias: "V",
  empates: "E",
  derrotas: "D",
  golsFeitos: "GF",
  golsSofridos: "GS",
  saldo: "SG",
};

export default function Tabela() {
  const [tabela, setTabela] = React.useState([]);
  const [colunaOrdenada, setColunaOrdenada] = React.useState("pontos");
  const [ordem, setOrdem] = React.useState("descendente");

  React.useEffect(() => {
    fazerRequisicaoComBody(
      "https://desafio-3-back-cubos-academy.herokuapp.com/classificacao",
      "GET"
    )
      .then((res) => res.json())
      .then((resJson) => {
        const tabela = resJson.dados;
        tabela.forEach((time) => {
          time.saldo = time.golsFeitos - time.golsSofridos;
        });
        setTabela(tabela);
      });
  }, []);

  const dadosAscendentes = tabela.sort((t1, t2) => {
    if (
      typeof t1[colunaOrdenada] === "number" &&
      typeof t2[colunaOrdenada] === "number"
    ) {
      return (
        parseInt(t2[colunaOrdenada], 10) - parseInt(t1[colunaOrdenada], 10)
      );
    } else {
      return t1[colunaOrdenada].localeCompare(t2[colunaOrdenada]);
    }
  });

  const dadosOrdenados =
    ordem === "ascendente" ? dadosAscendentes : dadosAscendentes.reverse();

  return (
    <div className="Tabela">
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            {colunas.map((coluna) => (
              <th>
                {legenda[coluna]}
                <button
                  onClick={() => {
                    if (colunaOrdenada === coluna) {
                      setOrdem((ordem) =>
                        ordem === "descendente" ? "ascendente" : "descendente"
                      );
                    } else {
                      setColunaOrdenada(coluna);
                      setOrdem("descendente");
                    }
                  }}
                >
                  <img
                    src="https://systemuicons.com/images/icons/sort_alt.svg"
                    alt="arrow"
                  />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dadosOrdenados.map((time, i) => (
            <tr className={i <= 4 ? "top" : i < 16 ? "" : "bottom"}>
              <td>{i + 1}</td>
              {colunas.map((coluna) => (
                <td>{time[coluna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
