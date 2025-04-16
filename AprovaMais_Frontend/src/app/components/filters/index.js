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
import SelectedTabs from "../selectedTabs";

export default function Filters() {
  const [universitiesList, setUniversitiesList] = useState([]);
  const [themesList, setThemesList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);

  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedThemes, setSelectedSubjectsThemes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
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

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("http://localhost:3001/questions/filter", {
          method: "GET",
        });

        const lista = await response.json();

        const universitiesArr = [];
        lista.forEach((item) => universitiesArr.push(item));
        const uniqueStrings = strings.reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, []);

        setUniversitiesList(
          uniqueStrings.map((item) => {
            return { id: item, label: item };
          })
        );

        if (!lista || lista.length === 0) return;
      } catch (err) {
        console.error("Erro ao buscar questões:", err);
      }
    };

    fetchMockData();
  }, []);

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

    const queryString = queryParams.toString();

    const storedQueries =
      JSON.parse(localStorage.getItem("filterQueries")) || [];
    storedQueries.push(queryString);
    localStorage.setItem("filterQueries", JSON.stringify(storedQueries));

    router.push(`/questoes?${queryString}`);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterSection}>
        <div className={styles.checkboxWrapper}>
          <CheckboxList
            items={universitiesList}
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
      </div>

      <div className={styles.filterSection}>
        <CheckboxList
          items={themes}
          title="Assuntos"
          setSelectedList={setSelectedSubjectsThemes}
        />
      </div>

      <div className={styles.filterSection}>
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

      <div className={styles.selectedBox}>
        <div>
          <SelectedTabs selected={selectedUniversities} title="Universidades" />
          <SelectedTabs selected={selectedThemes} title="Temas" />
          <SelectedTabs selected={selectedSubjects} title="Matérias" />
          <SelectedTabs selected={selectedTopics} title="Tópicos" />
        </div>

        <button onClick={handleApplyFilters} className={styles.applyButton}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}
