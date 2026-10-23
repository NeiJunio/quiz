import styles from "./Intro.module.css";

type IntroProps = {
    nome: string;
    onStart: () => void;
    onBack: () => void;
};

export default function Intro({ nome, onStart, onBack }: IntroProps) {
    const inicial = nome.charAt(0).toUpperCase();

    return (
        <section className={styles.letter} aria-labelledby="titulo-bilhete">
            <header className={styles.letterHead}>
                <p>Para · {nome}</p>
                <p>11 pistas</p>
            </header>

            <div className={styles.seal} aria-hidden="true">
                <span>{inicial}</span>
            </div>

            <p className={styles.eyebrow}>Um bilhete meio misterioso</p>

            <h1 id="titulo-bilhete">
                <em>{nome},</em> tenho umas perguntas para você.
            </h1>

            <p className={styles.message}>
                Nada comprometedor… eu acho. São escolhas rápidas, pequenas pistas e
                um pouco de curiosidade até a revelação final.
            </p>

            <div className={styles.notice}>
                <span aria-hidden="true">i</span>
                <p>
                    Seu nome e suas respostas serão encaminhados para quem criou este
                    quiz quando você terminar.
                </p>
            </div>

            <div className={styles.actions}>
                <button className={styles.start} type="button" onClick={onStart}>
                    Começar pelas pistas <span aria-hidden="true">→</span>
                </button>
                <button className={styles.back} type="button" onClick={onBack}>
                    Voltar
                </button>
            </div>

            <footer className={styles.signature}>
                <span />
                <p>De alguém um pouco curioso</p>
            </footer>
        </section>
    );
}
