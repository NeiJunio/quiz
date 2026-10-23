import { useId, useState, type SubmitEvent } from "react";

import type { QuizQuestion } from "@/types/quiz";

import OptionButton from "./OptionButton";
import styles from "./QuestionCard.module.css";

type QuestionCardProps = {
    pergunta: QuizQuestion;
    numero: number;
    respostaSelecionada: string | null;
    onResponder: (resposta: string) => void;
};

export default function QuestionCard({
    pergunta,
    numero,
    respostaSelecionada,
    onResponder,
}: QuestionCardProps) {
    const [texto, setTexto] = useState(respostaSelecionada ?? "");
    const [erro, setErro] = useState("");
    const tituloId = useId();
    const contadorId = useId();
    const erroId = useId();

    function enviarTexto(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const resposta = texto.trim();

        if (resposta.length < 2) {
            setErro("Conte pelo menos um pouquinho antes de continuar.");
            return;
        }

        setErro("");
        onResponder(resposta);
    }

    return (
        <section className={styles.card} aria-labelledby={tituloId}>
            <div className={styles.questionHead}>
                <p className={styles.questionNumber}>
                    Pista {String(numero).padStart(2, "0")}
                </p>
                <span aria-hidden="true">{String(numero).padStart(2, "0")}</span>
            </div>

            <h1 className={styles.prompt} id={tituloId}>
                {pergunta.prompt}
            </h1>

            {pergunta.type === "choice" ? (
                <div className={styles.options} role="group" aria-labelledby={tituloId}>
                    {pergunta.options.map((opcao, indice) => (
                        <OptionButton
                            key={opcao.value}
                            option={opcao}
                            index={indice}
                            selected={respostaSelecionada === opcao.value}
                            onSelect={onResponder}
                        />
                    ))}
                </div>
            ) : (
                <form className={styles.textForm} onSubmit={enviarTexto} noValidate>
                    <label htmlFor={`resposta-${pergunta.id}`}>Sua resposta</label>

                    <textarea
                        name={pergunta.id}
                        id={`resposta-${pergunta.id}`}
                        placeholder={pergunta.placeholder}
                        maxLength={pergunta.maxLength}
                        rows={5}
                        value={texto}
                        aria-invalid={Boolean(erro)}
                        aria-describedby={`${contadorId}${erro ? ` ${erroId}` : ""}`}
                        onChange={(event) => {
                            setTexto(event.target.value);
                            setErro("");
                        }}
                    />

                    <div className={styles.textMeta}>
                        <p className={styles.helper}>Escreva do seu jeito.</p>
                        <p id={contadorId} className={styles.counter} aria-live="polite">
                            {texto.length}/{pergunta.maxLength}
                        </p>
                    </div>

                    {erro && (
                        <p className={styles.error} id={erroId} role="alert">
                            {erro}
                        </p>
                    )}

                    <button className={styles.saveButton} type="submit">
                        Guardar resposta <span aria-hidden="true">→</span>
                    </button>
                </form>
            )}
        </section>
    );
}
