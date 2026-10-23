import Quiz from "@/Components/quiz/Quiz";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <Quiz />
        </main>
    );
}
