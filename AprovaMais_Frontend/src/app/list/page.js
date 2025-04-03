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
  const pdfRef = useRef(null);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("/mocks/mocksQuestões.json");
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
    <>
      <Button texto={"Gerar PDF"} onClick={gerarPDF} />
      <div ref={pdfRef} className={styles.container}>
        <BoxQuestoes>
          <p>
            Lista de questões da <b>{dadosGerais.prova}</b> dos anos{" "}
            <b>{dadosGerais.anosSelecionados}</b> da matéria{" "}
            <b>{dadosGerais.materia}</b> sobre os tópicos{" "}
            <b>{dadosGerais.topicos.join(", ")}</b>.
          </p>
        </BoxQuestoes>

        {listaQuestoes.map((item, i) => (
          <div className={styles.container__questoes} key={i}>
            <BoxQuestoes>
              <Questoes questao={item} />
            </BoxQuestoes>
            <div className={styles.container__questoes__buttons}>
              <Button
                texto={"Mostrar Gabarito"}
                onClick={() => alert(item.resposta)}
              />
              <Button
                texto={"Mostrar Solução"}
                onClick={() => alert(item.solucao)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
