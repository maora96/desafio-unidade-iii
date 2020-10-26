import React from "react";
import "../App.css";

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
  const [ordem, setOrdem] = React.useState("ascendente");

  React.useEffect(() => {
    fetch("https://desafio-3-back-cubos-academy.herokuapp.com/classificacao")
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson.dados);
        const tabela = resJson.dados;
        tabela.forEach((time) => {
          time.saldo = time.golsFeitos - time.golsSofridos;
        });
        setTabela(tabela);
      });
  }, [tabela]);

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

  console.log(dadosOrdenados);
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
            <tr
              className={
                time.pontos <= 33
                  ? "bottom"
                  : time.pontos > 33 && time.pontos <= 64
                  ? ""
                  : "top"
              }
            >
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
