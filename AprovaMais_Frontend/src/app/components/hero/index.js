"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const phrases = [
  "Cada página estudada é um passo a menos até a aprovação",
  "O esforço de hoje é o sucesso de amanhã",
  "A jornada pode ser difícil, mas a recompensa vale a pena.",
  "Você é mais capaz do que imagina",
  "Foque no seu objetivo",
  "A diferença entre um sonho e a realidade é a sua dedicação",
  "Não existe aprendizado perdido",
  "Sua dedicação vai te levar além do que você imagina",
  "Grandes conquistas exigem grandes esforços",
  "Você está plantando agora para colher um futuro",
  "Você é maior do que qualquer obstáculo!",
  "O sucesso não acontece por acaso",
  "Desacelere quando necessário",
  "Cada exercício resolvido é um músculo sendo fortalecido",
  "O mundo está cheio de oportunidades esperando por você",
  "Cada dia de estudo é um passo mais perto do seu sonho",
  "Você já superou tantos desafios",
  "A sua aprovação já está no horizonte.",
  "Dê o seu melhor e confie no processo!",
  "Você não está sozinho",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.quote}>{phrases[index]}</p>
    </div>
  );
};

export default Hero;
