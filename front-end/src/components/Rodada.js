import React from "react";
import "../App.css";
import { fazerRequisicaoComBody } from "../utils/fetch";

export default function Rodada(props) {
  const { token, setToken } = props;
  const [golsCasa, setGolsCasa] = React.useState("");
  const [golsVisitante, setGolsVisitante] = React.useState("");
  const [editavel, setEditavel] = React.useState("");
  const [rodada, setRodada] = React.useState(1);
  const [rodadaDados, setRodadaDados] = React.useState([]);
  React.useEffect(() => {
    fetch(`https://desafio-3-back-cubos-academy.herokuapp.com/jogos/${rodada}`)
      .then((res) => res.json())
      .then((resJson) => {
        setRodadaDados(resJson.dados);
      });
  }, [rodada]);

  return (
    <div className="rodadas">
      <div className="rodadas-header">
        {rodada === 1 ? (
          <button disabled={true}>
            <img
              src="https://systemuicons.com/images/icons/arrow_left.svg"
              alt=""
            />
          </button>
        ) : (
          <button
            onClick={() => {
              const novaRodada = rodada - 1;
              if (novaRodada === 0) {
                setRodada(1);
              } else {
                setRodada(novaRodada);
                console.log(novaRodada);
              }
            }}
          >
            <img
              src="https://systemuicons.com/images/icons/arrow_left.svg"
              alt=""
            />
          </button>
        )}

        <h2>{rodada === 0 ? 1 : rodada}ª Rodada</h2>
        {rodada === 38 ? (
          <button disabled={true}>
            <img
              src="https://systemuicons.com/images/icons/arrow_right.svg"
              alt=""
            />
          </button>
        ) : (
          <button
            onClick={() => {
              const novaRodada = rodada + 1;
              setRodada(novaRodada);
            }}
          >
            <img
              src="https://systemuicons.com/images/icons/arrow_right.svg"
              alt=""
            />
          </button>
        )}
      </div>

      <div className="rodadas-content">
        <table>
          <tbody>
            {rodadaDados.map((dados) => (
              <tr>
                <td>{dados.time_casa}</td>
                <td className="gol">
                  {editavel === dados.id ? (
                    <input
                      value={golsCasa}
                      onChange={(event) => {
                        setGolsCasa(event.target.value);
                      }}
                    />
                  ) : (
                    dados.gols_casa
                  )}
                </td>
                <td className="versus">x</td>
                <td className="gol">
                  {editavel === dados.id ? (
                    <input
                      value={golsVisitante}
                      onChange={(event) => {
                        setGolsVisitante(event.target.value);
                      }}
                    />
                  ) : (
                    dados.gols_visitante
                  )}
                </td>
                <td>{dados.time_visitante}</td>
                {token ? (
                  <td>
                    <button
                      onClick={() => {
                        if (editavel) {
                          setEditavel("");
                          // chamar api pra editar
                          const id = dados.id;
                          console.log(
                            id,
                            parseInt(golsCasa),
                            parseInt(golsVisitante)
                          );
                          fazerRequisicaoComBody(
                            "https://desafio-3-back-cubos-academy.herokuapp.com/jogos",
                            "POST",
                            { id, golsCasa, golsVisitante },
                            token
                          )
                            .then((res) => res.json())
                            .then((resJson) => {
                              const novaRodada = [...rodadaDados];
                              const time = novaRodada.find(
                                (x) => x.id === dados.id
                              );

                              time.gols_casa = resJson.dados[0].gols_casa;
                              time.gols_visitante =
                                resJson.dados[0].gols_visitante;
                              console.log(novaRodada);
                              setRodadaDados(novaRodada);
                            });
                        } else {
                          setGolsCasa(dados.gols_casa);
                          setGolsVisitante(dados.gols_visitante);
                          setEditavel(dados.id);
                        }
                      }}
                    >
                      <img
                        src="https://systemuicons.com/images/icons/pen.svg"
                        alt=""
                      />
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
