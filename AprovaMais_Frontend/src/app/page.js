"use client";
import styles from "./page.module.scss";

import Filters from "@/app/components/filters";
import Hero from "@/app/components/hero";
import Menu from "@/app/components/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // Importando o hook useAuth

export default function Home() {
  const { isLogged, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    const confirmed = window.confirm("Tem certeza que deseja sair?");
    if (confirmed) {
      logout();
      router.push("/login");
    }
  };

  return (
    <main className={styles.wrapper}>
      <Menu>
        {isLogged ? (
          <button onClick={handleLogout} className={styles["logout"]}>
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}

        <Link href="/dashboard">Dashboard</Link>
      </Menu>
      <Hero />
      <Filters />
    </main>
  );
}
