"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

import CheckboxList from "@/app/components/checkbox-list";

import { subjects } from "@/mocks/subjects.js";
import { themes } from "@/mocks/themes.js";
import { topics } from "@/mocks/topics.js";
import { universities } from "@/mocks/universities.js";
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

  const router = useRouter();

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();

    if (selectedUniversities.length) {
      queryParams.set(
        "university",
        selectedUniversities.map((u) => u.label).join(",")
      );
    }

    if (selectedThemes.length) {
      queryParams.set("theme", selectedThemes.map((t) => t.label).join(","));
    }

    if (selectedSubjects.length) {
      queryParams.set(
        "subject",
        selectedSubjects.map((s) => s.label).join(",")
      );
    }

    if (selectedTopics.length) {
      queryParams.set("topic", selectedTopics.map((t) => t.label).join(","));
    }

    if (startYear.length) {
      queryParams.set("startYear", startYear);
    }

    if (endYear.length) {
      queryParams.set("endYear", endYear);
    }

    router.push(`/list?${queryParams.toString()}`);
  };

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
          <InputNumber
            placeholder="Ano inicial"
            label="Ano inicial"
            value={startYear}
            onChange={setStartYear}
          />

          <InputNumber
            placeholder="Ano final"
            label="Ano final"
            value={endYear}
            onChange={setEndYear}
          />
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

      <button onClick={handleApplyFilters} className={styles.applyButton}>
        Aplicar Filtros
      </button>
    </div>
  );
}
