import { useState, type FormEvent } from "react";

import styles from "./NameStep.module.css";

type NameStepProps = {
    nome: string;
    onNomeChange: (novoNome: string) => void;
    onContinuar: () => void;
    website: string;
    onWebsiteChange: (valor: string) => void;
};

export default function NameStep({
    nome,
    onNomeChange,
    onContinuar,
    website,
    onWebsiteChange,
}: NameStepProps) {
    const [tentouContinuar, setTentouContinuar] = useState(false);
    const nomeValido = nome.trim().length >= 2;
    const mostrarErro = tentouContinuar && !nomeValido;

    function continuar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setTentouContinuar(true);

        if (nomeValido) {
            onContinuar();
        }
    }

    return (
        <section className={styles.card} aria-labelledby="titulo-inicial">
            <div className={styles.index} aria-hidden="true">
                <span>ARQUIVO</span>
                <strong>00/11</strong>
            </div>

            <div className={styles.mark} aria-hidden="true">
                <span>?</span>
            </div>

            <p className={styles.eyebrow}>
                <span aria-hidden="true" /> Quiz Misterioso
            </p>

            <h1 id="titulo-inicial">
                Toda boa história começa com uma <em>primeira pista.</em>
            </h1>

            <p className={styles.intro}>
                Antes de abrir este pequeno mistério, preciso saber como chamar você.
            </p>

            <form className={styles.form} onSubmit={continuar} noValidate>
                <label htmlFor="nome">Seu nome</label>

                <div className={styles.inputWrap}>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        autoComplete="name"
                        autoFocus
                        minLength={2}
                        maxLength={80}
                        placeholder="Como posso te chamar?"
                        value={nome}
                        aria-invalid={mostrarErro}
                        aria-describedby={mostrarErro ? "erro-nome" : undefined}
                        onChange={(event) => {
                            onNomeChange(event.target.value);
                            setTentouContinuar(false);
                        }}
                    />
                    <span aria-hidden="true">↗</span>
                </div>

                {mostrarErro && (
                    <p className={styles.error} id="erro-nome" role="alert">
                        Digite pelo menos dois caracteres para continuar.
                    </p>
                )}

                <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="website">Seu site</label>
                    <input
                        id="website"
                        name="website"
                        type="text"
                        autoComplete="off"
                        tabIndex={-1}
                        value={website}
                        onChange={(event) => onWebsiteChange(event.target.value)}
                    />
                </div>

                <button className={styles.primaryButton} type="submit">
                    Abrir o mistério
                    <span aria-hidden="true">→</span>
                </button>
            </form>

            <p className={styles.footnote}>Leva só alguns minutos · 11 pistas</p>
        </section>
    );
}
