import { useState } from "react";
import styles from "./styles.module.scss";

export default function Questoes({ questao }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelect = (index) => {
    setSelectedAnswer(index);
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
            }`}
            onClick={() => handleSelect(i)}
          >
            {alt}
          </li>
        ))}
      </ol>
    </div>
  );
}
