"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";

const CheckboxList = ({ items, title }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleList = () => setShowOptions(!showOptions);

  return (
    <div className={styles.checkboxContainer}>
      <button
        className={`gradient-bg ${styles.buttonList}`}
        onClick={toggleList}
      >
        {title}
      </button>

      {showOptions && (
        <div className={styles.checkboxList}>
          {items.map((item) => (
            <label key={item.id} className={styles.checkboxItem}>
              <input type="checkbox" value={item.id} />
              {item.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxList;
