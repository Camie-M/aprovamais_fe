import styles from "./styles.module.scss"; // Importação correta do SCSS

export default function BoxQuestoes({ children }) {
  return <div className={styles.container}>{children}</div>;
}
