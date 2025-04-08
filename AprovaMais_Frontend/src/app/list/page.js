"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import BoxQuestoes from "../components/boxQuestoes";
import Questoes from "../components/questoes";
import Button from "../components/button";
import html2pdf from "html2pdf.js";

export default function List() {
  const [dadosGerais, setDadosGerais] = useState({
    year: "",
    fase: "",
    university: "",
    theme: [],
    subject: [],
    topic: [],
  });

  const [listaQuestoes, setListaQuestoes] = useState([]);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
  const [resultados, setResultados] = useState({});
  const [gabaritosExibidos, setGabaritosExibidos] = useState({});
  const [solucaoExibidos, setSolucaoExibidos] = useState({});
  const [dificuldades, setDificuldades] = useState({});

  const pdfRef = useRef(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("/mocks/test.json");
        const data = await response.json();

        if (data.length > 0) {
          // Extrai dados gerais da primeira questão
          const { year, fase, university, theme, subject, topic } = data[0];
          setDadosGerais({
            year,
            fase,
            university,
            theme: theme || [],
            subject: subject || [],
            topic: topic || [],
          });

          // Remove os campos duplicados das questões
          const questoesSemDadosGerais = data.map((q) => {
            const { question, image, alternatives, correct, solution } = q;
            return { question, image, alternatives, correct, solution };
          });

          setListaQuestoes(questoesSemDadosGerais);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchMockData();
  }, []);

  const verificaReposta = (questaoIndex) => {
    const questao = listaQuestoes[questaoIndex];
    const respostaUsuario = respostasSelecionadas[questaoIndex];

    if (!respostaUsuario) {
      alert("Você ainda não respondeu essa questão.");
      return;
    }

    const correta = respostaUsuario === questao.correct;

    setResultados((prev) => ({
      ...prev,
      [questaoIndex]: {
        respostaMarcada: respostaUsuario,
        respostaCerta: questao.correct,
        correta,
      },
    }));

    setGabaritosExibidos((prev) => ({
      ...prev,
      [questaoIndex]: true,
    }));
  };

  const selecionarResposta = (questaoIndex, letraSelecionada) => {
    setRespostasSelecionadas((prev) => ({
      ...prev,
      [questaoIndex]: letraSelecionada,
    }));

    setResultados((prev) => ({
      ...prev,
      [questaoIndex]: {
        ...prev[questaoIndex],
        respostaMarcada: letraSelecionada,
      },
    }));

    setGabaritosExibidos((prev) => ({
      ...prev,
      [questaoIndex]: false,
    }));
  };

  const alternarSolucao = (questaoIndex) => {
    setSolucaoExibidos((prev) => ({
      ...prev,
      [questaoIndex]: !prev[questaoIndex],
    }));
  };

  const salvarDificuldade = (value) => {
    if (!value) {
      alert("Selecione uma dificuldade antes de salvar.");
      return;
    }

    console.log("Dificuldade salva:", value);
  };

  const gerarPDF = () => {
    const input = pdfRef.current;
    if (!input) return;

    html2pdf()
      .set({
        margin: 10,
        filename: `Questoes_${dadosGerais.university}_${dadosGerais.year}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(input)
      .save();
  };

  return (
    <main className={styles.wrapper}>
      <Button texto={"Gerar PDF"} onClick={gerarPDF} />

      <div ref={pdfRef} className={styles.wrapper__pdf}>
        <BoxQuestoes>
          <p>
            Lista de questões da <b>{dadosGerais.university}</b>, ano{" "}
            <b>{dadosGerais.year}</b>, fase <b>{dadosGerais.fase}</b>, com tema{" "}
            <b>{dadosGerais.theme.join(", ")}</b>, da matéria{" "}
            <b>{dadosGerais.subject.join(", ")}</b> sobre os tópicos:{" "}
            <b>{dadosGerais.topic.join(", ")}</b>.
          </p>
        </BoxQuestoes>
        {listaQuestoes.map((item, i) => (
          <div className={styles.wrapper__pdf__questoes} key={i}>
            <BoxQuestoes>
              <Questoes
                questao={item}
                indexDaQuestao={i}
                onSelect={selecionarResposta}
                resultado={resultados[i]}
                mostrarGabarito={gabaritosExibidos[i]}
              />
            </BoxQuestoes>
            <div className={styles.wrapper__pdf__questoes__buttons}>
              <Button
                texto={"Mostrar Gabarito"}
                onClick={() => verificaReposta(i)}
              />
              <Button
                texto={
                  solucaoExibidos[i] ? "Esconder Solução" : "Mostrar Solução"
                }
                onClick={() => alternarSolucao(i)}
              />
              <div
                className={
                  styles.wrapper__pdf__questoes__buttons__inputContainer
                }
              >
                <select
                  name={`dificuldade-${i}`}
                  value={dificuldades[i] || ""}
                  onChange={(e) =>
                    setDificuldades((prev) => ({
                      ...prev,
                      [i]: e.target.value,
                    }))
                  }
                  className={
                    styles.wrapper__pdf__questoes__buttons__inputContainer__difficultySelect
                  }
                >
                  <option value="">Avalie a dificuldade</option>
                  <option value="1">1 - Muito fácil</option>
                  <option value="2">2 - Fácil</option>
                  <option value="3">3 - Médio</option>
                  <option value="4">4 - Difícil</option>
                  <option value="5">5 - Muito difícil</option>
                </select>
                <Button
                  texto={"Salvar"}
                  onClick={() => salvarDificuldade(dificuldades[i])}
                />
              </div>
            </div>
            {solucaoExibidos[i] && <div>{item.solution}</div>}
          </div>
        ))}
      </div>
    </main>
  );
}
