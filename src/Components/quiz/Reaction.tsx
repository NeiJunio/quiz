import styles from "./Reaction.module.css";

type ReactionProps = {
    text: string;
    tone: "quick" | "turn";
};

export default function Reaction({ text, tone, }: ReactionProps) {
    return (
        <section
            className={`${styles.reacao} ${tone === "turn" ? styles.transicao : ""
                }`}
            role="status"
            aria-live="polite"
        >
            <span aria-hidden="true">💬</span>

            <p className={styles.mensagem}>
                {text}
            </p>
        </section>
    );
}
