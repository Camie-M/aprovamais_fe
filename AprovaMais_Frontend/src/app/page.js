import styles from "./page.module.scss";

import Filters from "@/app/components/filters";
import Hero from "@/app/components/hero";
import Menu from "@/app/components/menu";

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <Menu />
      <Hero />
      <Filters />
    </main>
  );
}
