import styles from "./Success.module.css";

type SuccessProps = {
    nome: string;
};

export default function Success({ nome }: SuccessProps) {
    return (
        <section className={styles.card} aria-labelledby="titulo-sucesso">
            <div className={styles.burst} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
            </div>

            <p className={styles.eyebrow}>✦ Mistério revelado ✦</p>

            <h1 id="titulo-sucesso">
                Prontinho, <em>{nome}.</em>
            </h1>

            <p className={styles.lead}>Agora posso te contar uma coisinha…</p>

            <div className={styles.copy}>
                <p>
                    Esse quiz foi uma brincadeira que inventei para conhecer um
                    pouquinho melhor seus gostos, preferências e aquelas pequenas
                    coisas que nem sempre aparecem numa conversa normal.
                </p>
                <p>
                    Obrigado por entrar na brincadeira e dividir alguns minutos — e
                    onze boas pistas — comigo.
                </p>
            </div>

            <div className={styles.finalNote}>
                <span aria-hidden="true">11/11</span>
                <p>No fim, a curiosidade era toda minha.</p>
            </div>
        </section>
    );
}
