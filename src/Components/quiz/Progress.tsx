import type { QuizAct } from "@/types/quiz";

import styles from "./Progress.module.css";

type ProgressProps = {
    current: number;
    total: number;
    act: QuizAct;
    actTitle: string;
};

export default function Progress({ current, total, act, actTitle }: ProgressProps) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className={styles.container}>
            <div className={styles.actRow}>
                <p className={styles.act}>
                    <span>Ato {act}</span>
                    {actTitle}
                </p>
                <p className={styles.percentage}>{percentage}%</p>
            </div>

            <div className={styles.meta}>
                <p>
                    Pergunta <strong>{String(current).padStart(2, "0")}</strong>
                    <span aria-hidden="true"> / </span>
                    <span className={styles.srOnly}>de</span>
                    {String(total).padStart(2, "0")}
                </p>
            </div>

            <div
                className={styles.track}
                role="progressbar"
                aria-label="Progresso do quiz"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={current}
                aria-valuetext={`${current} de ${total} perguntas`}
            >
                <div
                    className={styles.bar}
                    style={{ width: `${percentage}%` }}
                >
                    <span aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}
