type ProgressProps = {
    current: number;
    total: number;
}

import styles from "./Progress.module.css";

export default function Progress({ current, total }: ProgressProps) {
    const porcentagem = (current / total) * 100;

    return (
        <div className={styles.container}>
            <p className={styles.contador}>
                {String(current).padStart(2, "0")} —{" "}
                {String(total).padStart(2, "0")}
            </p>

            <div
                className={styles.trilha}
                role="progressbar"
                aria-label="Progresso do quiz"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={current}
            >
                <div
                    className={styles.barra}
                    style={{ width: `${porcentagem}%` }}
                />
            </div>
        </div>
    );
}