"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ necessário para app router
import Form from "../components/formulario";
import styles from "./styles.module.scss";
import InputText from "../components/inputText";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Usuário não encontrado ou senha incorreta.");
        return;
      }

      const user = await response.json();

      if (user) {
        router.push("/");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <main className={styles["login-container"]}>
      <h1 className={styles["login-title"]}>
        <span className={styles["title-highlight"]}>Login</span> Aprova+
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
        {error && <p className={styles["form__error"]}>{error}</p>}
        <input type="submit" className={styles["form__submit"]} />
      </Form>
    </main>
  );
}
