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
    return (
        <button
            type="button"
            className={styles.opcao}
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onSelect(option.value)}
        >
            <span aria-hidden="true">
                {index === 0 ? "A" : "B"}
            </span>

            {" "}

            <span aria-hidden="true">
                {option.emoji}
            </span>

            {" "}

            <span>{option.label}</span>

            {selected && (
                <span aria-hidden="true"> ✓</span>
            )}
        </button>
    );
}
