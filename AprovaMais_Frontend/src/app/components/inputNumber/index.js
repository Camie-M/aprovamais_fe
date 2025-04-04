import styles from "./styles.module.scss";

export default function InputNumber({ placeholder, label }) {
  return (
    <div className={styles.inputNumber}>
      <label htmlFor={label} className={styles.srOnly}>
        {label}
      </label>
      <input placeholder={placeholder} id={label} />
    </div>
  );
}
