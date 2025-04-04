import { useState } from "react";
import styles from "./styles.module.scss";

export default function Questoes({
  questao,
  onSelect,
  indexDaQuestao,
  resultado,
  mostrarGabarito,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelect = (index) => {
    const textoSelecionado = questao.alternativas[index];
    setSelectedAnswer(index);
    onSelect(indexDaQuestao, textoSelecionado);
  };

  const getIcon = (alt, index) => {
    if (!mostrarGabarito || !resultado) return null;

    const isSelected = selectedAnswer === index;
    const isCorrect = alt === resultado.respostaCerta;

    if (isSelected && resultado.correta) return "✅";
    if (isSelected && !resultado.correta) return "❌";
    if (!resultado.correta && isCorrect) return "✅";

    return null;
  };

  return (
    <div className={styles.questaobox}>
      <h3 className={styles.questaobox__titulo}>{questao.questao}</h3>
      <ol className={styles.questaobox__lista} type="A">
        {questao.alternativas.map((alt, i) => (
          <li
            key={i}
            className={`${styles.questaobox__lista__item} ${
              selectedAnswer === i ? styles.selected : ""
            } ${
              mostrarGabarito &&
              resultado &&
              !resultado.correta &&
              alt === resultado.respostaCerta
                ? styles.certa
                : ""
            }`}
            onClick={() => handleSelect(i)}
          >
            {alt} {getIcon(alt, i)}
          </li>
        ))}
      </ol>
    </div>
  );
}
