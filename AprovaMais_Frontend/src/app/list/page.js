"use client";
import styles from "./styles.module.scss";
import BoxQuestoes from "../components/boxQuestoes";
import Questoes from "../components/questoes";
import listaQuestoes from "../../mocks/mocksQuestões.json";
import Button from "../components/button";
export default function List() {
  const handleClick = () => {
    alert("Botão clicado!");
  };

  return (
    <div className={styles.container}>
      <h1>Lista de questões</h1>

      {listaQuestoes.map((item, i) => (
        <div className={styles.container__questoes} key={i}>
          <BoxQuestoes>
            <Questoes questao={item} />
          </BoxQuestoes>
          <div className={styles.container__questoes__buttons}>
            <Button texto={"Mostrar Gabarito"} onClick={handleClick} />
            <Button texto={"Mostrar Solução"} onClick={handleClick} />
            {/* <input></ <Button texto={"Mostrar Gabarito"} />input> */}
          </div>
        </div>
      ))}
    </div>
  );
}
