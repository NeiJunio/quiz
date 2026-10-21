type ConversationBeatProps = {
    lines: readonly string[];
}

import styles from "./ConversationBeat.module.css"

export default function ConversationBeat({ lines }: ConversationBeatProps) {
    return (
        <section className={styles.container}>
            <div className={styles.mensagens}>
                {lines.map((linha, indice) => (
                    <p
                        key={indice}
                        className={styles.linha}
                        style={{
                            animationDelay: `${indice * 900}ms`,
                        }}
                    >
                        {linha}
                    </p>
                ))}
            </div>
        </section>
    )
}