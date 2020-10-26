/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
const ordernarTabela = (tabela) => {
	tabela.sort((a, b) => {
		if (a.pontos > b.pontos) {
			return -1;
		} else if (b.pontos > a.pontos) {
			return 1;
		} else {
			// mesma quantidade de pontos -> checar vitórias
			if (a.vitorias > b.vitorias) {
				return -1;
			} else if (b.vitorias > a.vitorias) {
				return 1;
			} else {
				// mesma quantidade de vitórias -> checar saldo de gols
				const saldoA = a.golsFeitos - a.golsSofridos;
				const saldoB = b.golsFeitos - b.golsSofridos;
				if (saldoA > saldoB) {
					return -1;
				} else if (saldoB > saldoA) {
					return 1;
				} else {
					// mesmo saldo de gols -> checar gols feitos
					if (a.golsFeitos > b.golsFeitos) {
						return -1;
					} else if (b.golsFeitos > a.golsFeitos) {
						return 1;
					} else {
						// mesmo número de gols feitos -> checar alfabeticamente
						a.time.localeCompare(b.time);
					}
				}
			}
		}
	});
};

const inserirOuAtualizarTime = (
	time,
	pontos,
	golsFeitos,
	golsSofridos,
	tabela
) => {
	const timeEncontrado = tabela.find((t) => t.time === time);
	if (timeEncontrado) {
		timeEncontrado.pontos += pontos;
		timeEncontrado.jogos += 1;
		timeEncontrado.vitorias += pontos === 3 ? 1 : 0;
		timeEncontrado.derrotas += pontos === 0 ? 1 : 0;
		timeEncontrado.empates += pontos === 1 ? 1 : 0;
		timeEncontrado.golsFeitos += golsFeitos;
		timeEncontrado.golsSofridos += golsSofridos;
	} else {
		tabela.push({
			time,
			pontos,
			jogos: 1,
			vitorias: pontos === 3 ? 1 : 0,
			derrotas: pontos === 0 ? 1 : 0,
			empates: pontos === 1 ? 1 : 0,
			golsFeitos,
			golsSofridos,
		});
	}
};

const calcularTabela = (dados, tabela) => {
	// eslint-disable-next-line no-restricted-syntax
	for (jogo of dados) {
		if (jogo.gols_casa > jogo.gols_visitante) {
			// time casa ganhou
			inserirOuAtualizarTime(
				jogo.time_casa,
				3,
				jogo.gols_casa,
				jogo.gols_visitante,
				tabela
			);
			inserirOuAtualizarTime(
				jogo.time_visitante,
				0,
				jogo.gols_visitante,
				jogo.gols_casa,
				tabela
			);
		} else if (jogo.gols_casa < jogo.gols_visitante) {
			// time visitante ganhou
			inserirOuAtualizarTime(
				jogo.time_casa,
				0,
				jogo.gols_casa,
				jogo.gols_visitante,
				tabela
			);
			inserirOuAtualizarTime(
				jogo.time_visitante,
				3,
				jogo.gols_visitante,
				jogo.gols_casa,
				tabela
			);
		} else {
			// empate
			inserirOuAtualizarTime(
				jogo.time_casa,
				1,
				jogo.gols_casa,
				jogo.gols_visitante,
				tabela
			);
			inserirOuAtualizarTime(
				jogo.time_visitante,
				1,
				jogo.gols_visitante,
				jogo.gols_casa,
				tabela
			);
		}
	}
};

module.exports = { calcularTabela, ordernarTabela };
