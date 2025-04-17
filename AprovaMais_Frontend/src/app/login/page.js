"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/formulario";
import styles from "./styles.module.scss";
import InputText from "../components/inputText";
import { useAuth } from "@/app/context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        setError("Erro ao buscar usuários.");
        return;
      }

      const users = await response.json();
      const user = users.find(
        (usuario) =>
          usuario.username === formData.username &&
          usuario.password === formData.password
      );

      if (user) {
        login(user); // Chamando a função login para salvar o usuário no contexto

        router.push("/"); // Redireciona após o login
      } else {
        setError("Usuário não encontrado ou senha incorreta.");
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
          label="username"
          type="text"
          register={register("username", { required: true })}
          placeholder="Digite seu username"
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
