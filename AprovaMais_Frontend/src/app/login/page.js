"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Form from "../components/formulario";
import styles from "./styles.module.scss";
import InputText from "../components/inputText";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const onSubmit = (data) => {
    console.log("Dados submetidos:", data);
    setData(JSON.stringify(data));
  };

  return (
    <main className={styles["login-container"]}>
      <h1 className={styles["login-title"]}>
        <span className={styles["title-highlight"]}>Login</span> AprovaMais
      </h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label="email"
          type="email"
          register={register("email", { required: true })}
          placeholder="Digite seu email"
        />
        <InputText
          label="Senha"
          type="password"
          register={register("password", { required: true })}
          placeholder="Digite sua Senha"
        />

        <input type="submit" className={styles["form__submit"]} />
      </Form>
    </main>
  );
}
