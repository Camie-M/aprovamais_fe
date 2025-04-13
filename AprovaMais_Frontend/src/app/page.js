import styles from "./page.module.scss";

import Filters from "@/app/components/filters";
import Hero from "@/app/components/hero";
import Menu from "@/app/components/menu";

import { unicamp } from "@/mocks/test";

export default function Home() {
  console.log(
    unicamp.map((item) => {
      if (item.subject.includes("Inglês")) {
        return item.topic.map((itemTheme) => {
          return `(${item.subject[0]} / ${item.subject[1]}) - ${itemTheme}`;
        });
      }
    })
  );
  return (
    <main className={styles.wrapper}>
      <Menu />
      <Hero />
      <Filters />
    </main>
  );
}
