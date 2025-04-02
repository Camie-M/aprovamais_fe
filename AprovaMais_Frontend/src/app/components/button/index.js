import styles from "./styles.module.scss"; // Importação correta do SCSS

export default function Button({ texto, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {texto}
    </button>
  );
}
