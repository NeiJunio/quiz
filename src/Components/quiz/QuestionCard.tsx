import type { QuizQuestion } from "@/types/quiz";

import OptionButton from "./OptionButton";

import { useState, type SubmitEvent } from "react"

import styles from "./QuestionCard.module.css";

type QuestionCardProps = {
    pergunta: QuizQuestion;
    respostaSelecionada: string | null;
    onResponder: (resposta: string) => void;
}

export default function QuestionCard({ pergunta, respostaSelecionada, onResponder }: QuestionCardProps) {

    const [texto, setTexto] = useState(respostaSelecionada ?? "");
    const [erro, setErro] = useState("");

    function enviarTexto(event: SubmitEvent<HTMLFormElement>) {

        event.preventDefault();

        const resposta = texto.trim();

        if (resposta.length < 2) {
            setErro("Conta pelo menos um pouquinho");
            return;
        }

        setErro("");
        onResponder(resposta);
    }

    return (
        <section>
            <h2>{pergunta.prompt}</h2>

            {pergunta.type === "choice" ?
                (
                    <div className={styles.opcoes}>
                        {pergunta.options?.map((opcao, indice) => (
                            <OptionButton
                                key={opcao.value}
                                option={opcao}
                                index={indice}
                                selected={respostaSelecionada === opcao.value}
                                onSelect={onResponder}
                            />
                        ))}
                        {respostaSelecionada !== null && (
                            <p>Resposta selecionada: {respostaSelecionada}</p>
                        )}
                    </div>
                ) : (
                    <form onSubmit={enviarTexto} noValidate>
                        <label htmlFor="resposta-aberta">
                            Sua resposta:
                        </label>

                        <textarea
                            name="resposta-aberta"
                            id="resposta-aberta"
                            placeholder={pergunta.placeholder}
                            maxLength={pergunta.maxLength}
                            rows={4}
                            value={texto}
                            onChange={(e) => {
                                setTexto(e.target.value)
                                setErro("");
                            }}
                        />

                        <small>
                            {texto.length}/{pergunta.maxLength ?? 200} caracteres
                        </small>

                        {erro && (
                            <p role="alert">{erro}</p>
                        )}

                        <button type="submit">
                            Guardar resposta
                        </button>

                    </form>
                )
            }

        </section >

    )
}