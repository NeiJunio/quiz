import styles from "./ConversationBeat.module.css";

type ConversationBeatProps = {
    lines: readonly string[];
};

export default function ConversationBeat({ lines }: ConversationBeatProps) {
    return (
        <section className={styles.container} aria-label="Preparando a revelação">
            <div className={styles.orbit} aria-hidden="true">
                <span />
            </div>

            <p className={styles.eyebrow}>Fim das pistas</p>

            <div className={styles.messages}>
                {lines.map((line, index) => (
                    <p
                        key={line}
                        className={styles.line}
                        style={{ animationDelay: `${index * 900}ms` }}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </section>
    );
}
