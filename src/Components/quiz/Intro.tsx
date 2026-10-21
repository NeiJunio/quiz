type IntroProps = {
    nome: string;
    onStart: () => void;
    onBack: () => void;
}

export default function Intro({ nome, onStart, onBack }: IntroProps) {

    const inicial = nome.charAt(0).toUpperCase();

    return (
        <section>
            <p>Para · {nome}</p>
            <p>9 pistas</p>

            <span>{inicial}</span>

            <p>Um bilhete meio misterioso</p>

            <h1>
                <em>{nome},</em> tenho umas perguntinhas pra você
            </h1>

            <p>
                Nada comprometedor... eu acho
                <br />
                Prometo que é rapidinho.
            </p>

            <p>
                <small>
                    Seu nome e suas respostas serão enviados para
                    quem criou este quiz quando você terminar.
                </small>
            </p>

            <button type="button" onClick={onStart}>
                Começar
            </button>

            <button type="button" onClick={onBack}>
                Voltar
            </button>

            <p>De alguém um pouco curioso</p>
        </section>
    );

}