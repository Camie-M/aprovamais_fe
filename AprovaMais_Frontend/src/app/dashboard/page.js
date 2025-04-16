"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const [storedQueries, setStoredQueries] = useState([]);

  useEffect(() => {
    const savedQueries =
      JSON.parse(localStorage.getItem("filterQueries")) || [];
    setStoredQueries(savedQueries);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem("filterQueries");
    setStoredQueries([]);
  };

  const handleRemoveOne = (indexToRemove) => {
    const updatedQueries = storedQueries.filter(
      (_, index) => index !== indexToRemove
    );
    localStorage.setItem("filterQueries", JSON.stringify(updatedQueries));
    setStoredQueries(updatedQueries);
  };

  const formatQueryReadable = (query) => {
    const params = new URLSearchParams(query);
    const readable = [];

    const labelMap = {
      university: "Universidade",
      theme: "Tema",
      subject: "Matéria",
      topic: "Tópicos",
      startYear: "Ano Inicial",
      endYear: "Ano Final",
    };

    for (const [key, value] of params.entries()) {
      const translatedLabel = labelMap[key] || key;
      const decodedValue = decodeURIComponent(value).replaceAll(",", ", ");
      readable.push({ label: translatedLabel, value: decodedValue });
    }

    return readable;
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <h2 className={styles.subtitle}>Filtros Salvos</h2>

      {storedQueries.length === 0 ? (
        <p className={styles.empty}>Nenhum filtro salvo ainda.</p>
      ) : (
        <>
          <ul className={styles.queryList}>
            {storedQueries.map((query, index) => {
              const readableQuery = formatQueryReadable(query);
              return (
                <li key={index} className={styles.queryItem}>
                  <div className={styles.queryCard}>
                    {readableQuery.map((item, idx) => (
                      <div key={idx} className={styles.queryField}>
                        <strong>{item.label}:</strong> {item.value}
                      </div>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => router.push(`/questoes?${query}`)}
                      className={styles.viewButton}
                    >
                      Visualizar
                    </button>
                    <button
                      onClick={() => handleRemoveOne(index)}
                      className={styles.removeButton}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button onClick={handleClearAll} className={styles.clearButton}>
            Limpar Tudo
          </button>
        </>
      )}
    </div>
  );
}
