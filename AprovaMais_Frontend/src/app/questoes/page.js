"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import BoxQuestoes from "../components/boxQuestoes";
import Questoes from "../components/questoes";
import Button from "../components/button";
import html2pdf from "html2pdf.js";
import Menu from "@/app/components/menu";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function List() {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/dashboard", label: "Dashboard" },
  ];
  const searchParams = useSearchParams();

  const [dadosGerais, setDadosGerais] = useState({
    startYear: "",
    endYear: "",
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
  const [modoPDF, setModoPDF] = useState(false);
  const paramsObj = Object.fromEntries(searchParams.entries());
  const pdfRef = useRef(null);

  useEffect(() => {
    const parsedParams = {
      university: searchParams.get("university"),
      theme: searchParams.getAll("theme"),
      subject: searchParams.getAll("subject"),
      topic: searchParams.getAll("topic"),
      startYear: searchParams.get("startYear"),
      endYear: searchParams.get("endYear"),
    };
    console.log(parsedParams);

    const fetchMockData = async () => {
      try {
        const response = await fetch("http://localhost:3001/questions/filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedParams),
        });

        const lista = await response.json();
        if (!lista || lista.length === 0) return;

        const [header, ...restantes] = lista;

        const {
          startYear,
          endYear,
          university,
          theme = [],
          subject = [],
          topic = [],
        } = header;

        setDadosGerais({
          startYear,
          endYear,
          university,
          theme,
          subject,
          topic,
        });

        const questoes = lista.map(
          ({ question, image, alternatives, correct, solution }) => ({
            question,
            image,
            alternatives,
            correct,
            solution,
          })
        );

        setListaQuestoes(questoes);
      } catch (err) {
        console.error("Erro ao buscar questões:", err);
      }
    };

    fetchMockData();
  }, [searchParams]);

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

  const salvarDificuldade = (value, questionId) => {
    if (!value) {
      alert("Selecione uma dificuldade antes de salvar.");
      return;
    }

    console.log("Dificuldade salva:", value);
  };

  const gerarPDF = () => {
    setModoPDF(true);
    const input = pdfRef.current;
    if (!input) return;
    setTimeout(() => {
      const input = pdfRef.current;
      if (!input) return;
      html2pdf()
        .set({
          margin: 10,
          filename: `Questoes.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            autoSize: true,
          },
        })
        .from(input)
        .save();

      setModoPDF(false);
    }, 100);
  };

  return (
    <main className={styles.wrapper}>
      <Menu>
        {routes.map((route, index) => (
          <Link key={index} href={route.path}>
            {route.label}
          </Link>
        ))}
      </Menu>
      {listaQuestoes.length > 0 ? (
        <>
          <Button texto={"Gerar PDF"} onClick={gerarPDF} />
          <div className={styles.wrapper__cabecalho}>
            <BoxQuestoes>
              <p>
                Lista de questões da <b>{dadosGerais.university}</b>, ano{" "}
                <b>
                  {dadosGerais.startYear}
                  {dadosGerais.endYear ? `até ${dadosGerais.endYear}` : ""}
                </b>
                , com tema <b>{dadosGerais.theme.join(", ")}</b>, da matéria{" "}
                <b>{dadosGerais.subject.join(", ")}</b> sobre os tópicos:{" "}
                <b>{dadosGerais.topic.join(", ")}</b>.
              </p>
            </BoxQuestoes>
          </div>
          <div ref={pdfRef} className={styles.wrapper__pdf}>
            {listaQuestoes.map((item, i) => (
              <div className={styles.wrapper__pdf__questoes} key={i}>
                <BoxQuestoes>
                  <Questoes
                    questao={item}
                    indexDaQuestao={i}
                    onSelect={modoPDF ? undefined : selecionarResposta}
                    resultado={resultados[i]}
                    mostrarGabarito={gabaritosExibidos[i]}
                  />
                </BoxQuestoes>

                {!modoPDF && (
                  <div className={styles.wrapper__pdf__questoes__buttons}>
                    <Button
                      texto={"Mostrar Gabarito"}
                      onClick={() => verificaReposta(i)}
                    />
                    <Button
                      texto={
                        solucaoExibidos[i]
                          ? "Esconder Solução"
                          : "Mostrar Solução"
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
                )}

                {solucaoExibidos[i] && <div>{item.solution}</div>}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.wrapper__cabecalho}>
          <BoxQuestoes>
            <p>
              Algo deu errado durante a buscas das questões, recarregue a pagina
              ou entre em contato com o suporte.
            </p>
          </BoxQuestoes>
        </div>
      )}
    </main>
  );
}
