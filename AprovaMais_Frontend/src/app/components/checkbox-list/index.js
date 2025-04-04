"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";

const CheckboxList = ({ items, title, setSelectedList }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleList = () => setShowOptions(!showOptions);

  const handleCheckboxChange = (event) => {
    const value = Number(event.target.value);
    const { checked } = event.target;

    let updatedItems;
    if (checked) {
      const itemObject = items.find((item) => item.id === value);
      updatedItems = [...selectedItems, itemObject];
    } else {
      updatedItems = selectedItems.filter((item) => item.id !== value);
    }

    setSelectedItems(updatedItems);
    setSelectedList(updatedItems);
  };

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
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCheckboxChange}
                checked={selectedItems.some(
                  (selected) => selected.id === item.id
                )}
              />
              {item.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxList;
