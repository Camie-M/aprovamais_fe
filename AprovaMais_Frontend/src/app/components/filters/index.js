import styles from "./styles.module.scss";

import CheckboxList from "@/app/components/checkbox-list";

import subjects from "@/mocks/subjects.json";
import themes from "@/mocks/themes.json";
import topics from "@/mocks/topics.json";
import universities from "@/mocks/universities.json";

export default function Filters() {
  return (
    <div className={styles.filters}>
      <CheckboxList items={universities} title="Universidades" />
      <CheckboxList items={themes} title="Assuntos" />
      <CheckboxList items={subjects} title="Matérias" />
    </div>
  );
}
