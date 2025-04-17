"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

import CheckboxList from "@/app/components/checkbox-list";

/* import { subjects } from "@/mocks/subjects.js";
import { themes } from "@/mocks/themes.js";
import { topics } from "@/mocks/topics.js";
import { universities } from "@/mocks/universities.js"; */

import InputNumber from "../inputNumber";
import SelectedTabs from "../selectedTabs";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Filters() {
  const [listaQuestoes, setListaQuestoes] = useState([]);
  const [universitiesList, setUniversitiesList] = useState([]);
  const [themesList, setThemesList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const searchParams = useSearchParams();
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedThemes, setSelectedSubjectsThemes] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);
  const { isLogged } = useAuth(); // Usando o hook do contexto
  useEffect(() => {
    if (!selectedSubjects.length) {
      return;
    }

    const fetchTopics = async () => {
      try {
        // Topics
        const topicsArr = [];

        listaQuestoes.forEach((item) =>
          item.topic.forEach((subItem) => topicsArr.push(subItem))
        );

        const uniqueStringsTopics = topicsArr.reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setTopicsList(
          uniqueStringsTopics.map((item, index) => {
            return { id: index, label: item };
          })
        );

        // Themes
        const themesArr = [];
        listaQuestoes.forEach((item) =>
          item.theme.forEach((subItem) => themesArr.push(subItem))
        );
        const uniqueStringsTheme = themesArr.reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setThemesList(
          uniqueStringsTheme.map((item, index) => {
            return { id: index, label: item };
          })
        );
      } catch (err) {
        console.error("Erro ao buscar questões:", err);
      }
    };

    fetchTopics();
  }, [selectedSubjects, listaQuestoes]);

  useEffect(() => {
    const parsedParams = {
      university: searchParams.get("university"),
      theme: searchParams.getAll("theme"),
      subject: searchParams.getAll("subject"),
      topic: searchParams.getAll("topic"),
      startYear: searchParams.get("startYear"),
      endYear: searchParams.get("endYear"),
    };

    const fetchMockData = async () => {
      try {
        const response = await fetch("http://localhost:3001/questions/filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedParams),
        });

        const lista = await response.json();
        setListaQuestoes(lista);
        // Universities
        const universitiesArr = [];
        lista.forEach((item) => universitiesArr.push(item.university));
        const uniqueStringsUni = universitiesArr.reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setUniversitiesList(
          uniqueStringsUni.map((item, index) => {
            return { id: index, label: item };
          })
        );

        // Subjects
        const subjectsArr = [];
        lista.forEach((item) =>
          item.subject.forEach((subItem) => subjectsArr.push(subItem))
        );
        const uniqueStringsSubjects = subjectsArr.reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setSubjectsList(
          uniqueStringsSubjects.map((item, index) => {
            return { id: index, label: item };
          })
        );

        // Themes
        const themesArr = [];
        lista.forEach((item) =>
          item.theme.forEach((subItem) => themesArr.push(subItem))
        );
        const uniqueStringsTheme = themesArr.reduce((acc, current) => {
          if (!acc.includes(current)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setThemesList(
          uniqueStringsTheme.map((item, index) => {
            return { id: index, label: item };
          })
        );

        if (!lista || lista.length === 0) return;
      } catch (err) {
        console.error("Erro ao buscar questões:", err);
      }
    };

    fetchMockData();
  }, [searchParams]);

  const router = useRouter();

  const handleApplyFilters = () => {
    if (!isLogged) {
      router.push("/login");
      return;
    }
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
          items={themesList}
          title="Assuntos"
          setSelectedList={setSelectedSubjectsThemes}
        />
      </div>

      <div className={styles.filterSection}>
        <div className={styles.checkboxWrapper}>
          <CheckboxList
            items={subjectsList}
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
