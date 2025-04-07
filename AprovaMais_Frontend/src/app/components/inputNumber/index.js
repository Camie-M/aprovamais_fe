import styles from "./styles.module.scss";

export default function InputNumber({ placeholder, label, value, onChange }) {
  const handleChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, ""); // remove caracteres não numéricos
    onChange?.(numericValue); // chama onChange se existir
  };

  return (
    <div className={styles.inputNumber}>
      <label htmlFor={label} className={styles.srOnly}>
        {label}
      </label>
      <input
        type="text"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
