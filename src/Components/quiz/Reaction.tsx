import styles from "./Reaction.module.css";

type ReactionProps = {
    text: string;
    symbol: string;
    tone: "quick" | "turn";
};

export default function Reaction({ text, symbol, tone }: ReactionProps) {
    return (
        <section
            className={`${styles.reaction} ${tone === "turn" ? styles.turn : ""}`}
            role="status"
            aria-live="polite"
        >
            <div className={styles.ripple} aria-hidden="true">
                <span>{symbol}</span>
            </div>

            <p className={styles.eyebrow}>Pista registrada</p>
            <p className={styles.message}>{text}</p>

            <div className={styles.wait} aria-hidden="true">
                <span />
                <span />
                <span />
            </div>
        </section>
    );
}
