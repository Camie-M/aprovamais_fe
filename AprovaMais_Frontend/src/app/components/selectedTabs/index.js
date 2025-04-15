import React from "react";
import styles from "./styles.module.scss";

export default function SelectedTabs({ selected, title }) {
  if (!selected.length) return null;

  return (
    <div className={styles.selectedTabs}>
      <span className={styles.title}>{title}:</span>
      <div className={styles.tabList}>
        {selected.map((item) => (
          <span key={item.id} className={styles.tab}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
