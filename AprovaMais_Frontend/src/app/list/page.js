"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import BoxQuestoes from "../components/boxQuestoes";
import Questoes from "../components/questoes";
import Button from "../components/button";
import html2pdf from "html2pdf.js";

export default function List() {
  const [dadosGerais, setDadosGerais] = useState({
    prova: "",
    anosSelecionados: "",
    materia: "",
    topicos: [],
  });
  const [listaQuestoes, setListaQuestoes] = useState([]);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
  const [resultados, setResultados] = useState({});
  const [gabaritosExibidos, setGabaritosExibidos] = useState({});
  const [solucaoExibidos, setSolucaoExibidos] = useState(false);
  const pdfRef = useRef(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("/mocks/mocksQuestoes.json");
        const data = await response.json();

        setDadosGerais({
          prova: data.prova || "Prova Desconhecida",
          anosSelecionados: data.anos || "Ano não informado",
          materia: data.materia || "Matéria não informada",
          topicos: data.questoes.flatMap((q) => q.topicos || []),
        });

        setListaQuestoes(data.questoes || []);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchMockData();
  }, []);

  const verificaReposta = (questaoIndex) => {
    const questao = listaQuestoes[questaoIndex];
    const respostaUsuario = respostasSelecionadas[questaoIndex];
    const correta = respostaUsuario === questao.resposta;

    if (!respostaUsuario) {
      alert("Você ainda não respondeu essa questão.");
      return;
    }

    setResultados((prev) => ({
      ...prev,
      [questaoIndex]: {
        correta,
        respostaCerta: questao.resposta,
      },
    }));

    setGabaritosExibidos((prev) => ({
      ...prev,
      [questaoIndex]: true,
    }));
  };

  const selecionarResposta = (questaoIndex, alternativaTexto) => {
    setRespostasSelecionadas((prev) => ({
      ...prev,
      [questaoIndex]: alternativaTexto,
    }));

    setGabaritosExibidos((prev) => ({
      ...prev,
      [questaoIndex]: false,
    }));
  };

  const gerarPDF = () => {
    const input = pdfRef.current;
    if (!input) return;

    html2pdf()
      .set({
        margin: 10,
        filename: `Questoes_${dadosGerais.prova}.pdf`,
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
            Lista de questões da <b>{dadosGerais.prova}</b> dos anos{" "}
            <b>{dadosGerais.anosSelecionados}</b> da matéria{" "}
            <b>{dadosGerais.materia}</b> sobre os tópicos{" "}
            <b>{dadosGerais.topicos.join(", ")}</b>.
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
                texto={solucaoExibidos ? "Esconder Solução" : "Mostrar Solução"}
                onClick={() => setSolucaoExibidos(!solucaoExibidos)}
              />
            </div>
            {solucaoExibidos ? <div>{item.solucao}</div> : ""}
          </div>
        ))}
      </div>
    </main>
  );
}
