import styles from "./styles.module.scss";

export default function Questoes({
  questao,
  onSelect,
  indexDaQuestao,
  resultado,
  mostrarGabarito,
}) {
  const handleSelect = (letra) => {
    onSelect(indexDaQuestao, letra); // passa a letra clicada, ex: "a"
  };

  const getIcon = (letra) => {
    if (!mostrarGabarito || !resultado) return null;

    const isSelected = resultado.respostaMarcada === letra;
    const isCorrect = letra === resultado.respostaCerta;

    if (isSelected && resultado.correta) return "✅";
    if (isSelected && !resultado.correta) return "❌";
    if (!resultado.correta && isCorrect) return "✅";

    return null;
  };

  return (
    <div className={styles.questaobox}>
      <h3 className={styles.questaobox__titulo}>{questao.question.text}</h3>

      <ol className={styles.questaobox__lista} type="A">
        {Object.entries(questao.alternatives).map(([letra, alt]) => (
          <li
            key={letra}
            className={`${styles.questaobox__lista__item} ${
              resultado?.respostaMarcada === letra ? styles.selected : ""
            } ${
              mostrarGabarito && letra === resultado?.respostaCerta
                ? styles.certa
                : ""
            }`}
            onClick={() => handleSelect(letra)}
          >
            {alt.text} {getIcon(letra)}
          </li>
        ))}
      </ol>
    </div>
  );
}
