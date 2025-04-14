"use client";
import React from "react";

import styles from "./styles.module.scss";

const Menu = ({ children }) => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>{children}</li>
      </ul>
    </nav>
  );
};

export default Menu;
