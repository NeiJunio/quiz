import type { QuizOption } from "@/types/quiz";

import styles from "./QuestionCard.module.css";

type OptionButtonProps = {
    option: QuizOption;
    index: number;
    selected: boolean;
    disabled?: boolean;
    onSelect: (value: string) => void;
};

export default function OptionButton({
    option,
    index,
    selected,
    disabled = false,
    onSelect,
}: OptionButtonProps) {
    const letter = String.fromCharCode(65 + index);

    return (
        <button
            type="button"
            className={`${styles.option} ${selected ? styles.optionSelected : ""}`}
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onSelect(option.value)}
        >
            <span className={styles.optionLetter} aria-hidden="true">
                {letter}
            </span>
            <span className={styles.optionEmoji} aria-hidden="true">
                {option.emoji}
            </span>
            <span className={styles.optionLabel}>{option.label}</span>
            <span className={styles.optionCheck} aria-hidden="true">
                ✓
            </span>
        </button>
    );
}
