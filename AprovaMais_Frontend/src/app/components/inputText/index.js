import styles from "./styles.module.scss";

export default function InputText({ label, register, type, ...rest }) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputGroup__label}>{label}</label>
      <input
        className={styles.inputGroup__input}
        {...register}
        {...rest}
        type={type}
      />
    </div>
  );
}
