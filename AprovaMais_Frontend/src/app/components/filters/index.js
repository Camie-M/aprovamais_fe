"use client";

import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

import CheckboxList from "@/app/components/checkbox-list";

import subjects from "@/mocks/subjects.json";
import themes from "@/mocks/themes.json";
import topics from "@/mocks/topics.json";
import universities from "@/mocks/universities.json";
import InputNumber from "../inputNumber";

export default function Filters() {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedThemes, setSelectedSubjectsThemes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);

  useEffect(() => {
    const selectedSubjectLabels = selectedSubjects.map(
      (subject) => subject.label
    );

    const filteredTopics = topics
      .filter((topic) => selectedSubjectLabels.includes(topic.subject))
      .map((topic) => ({
        id: topic.id,
        label: `${topic.subject} - ${topic.topic}`,
      }));

    setTopicsList(filteredTopics);
  }, [selectedSubjects]);

  return (
    <div className={styles.filters}>
      <div className={styles.checkboxWrapper}>
        <CheckboxList
          items={universities}
          title="Universidades"
          setSelectedList={setSelectedUniversities}
        />

        <div
          className={`${styles.inputs} ${selectedUniversities.length ? styles.show : ""}`}
        >
          <InputNumber placeholder={"Ano inicial"} label={"Ano inicial"} />
          <InputNumber placeholder={"Ano final"} label={"Ano final"} />
        </div>
      </div>

      <CheckboxList
        items={themes}
        title="Assuntos"
        setSelectedList={setSelectedSubjectsThemes}
      />

      <div className={styles.checkboxWrapper}>
        <CheckboxList
          items={subjects}
          title="Matérias"
          setSelectedList={setSelectedSubjects}
        />

        <div
          className={`${styles.inputs} ${selectedSubjects.length ? styles.show : ""}`}
        >
          <CheckboxList
            items={topicsList}
            title="Tópicos"
            setSelectedList={setSelectedTopics}
          />
        </div>
      </div>
    </div>
  );
}
