"use client";
import React from "react";

import Link from "next/link";

import styles from "./styles.module.scss";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link href={"/list"}>Página de lista</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
