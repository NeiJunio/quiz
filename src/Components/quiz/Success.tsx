type SuccessProps = {
    nome: string;
}

export default function Success({ nome }: SuccessProps) {
    return (
        <section>
            <p>✨ Mistério revelado ✨</p>

            <h1>Prontinho, {nome}! 💜</h1>

            <h2>
                Agora posso te contar uma coisinha... 👀
            </h2>

            <p>
                Esse quiz todo foi só uma brincadeira que
                inventei para te conhecer um pouquinho melhor.
                Kkkkk 😅
            </p>

            <p>
                Queria descobrir um pouco mais sobre seus gostos,
                suas preferências e algumas coisinhas que talvez
                não surgissem numa conversa normal.
            </p>

            <p>
                Obrigado por entrar na brincadeira e dedicar
                um pouquinho do seu tempo para responder! ❤️
            </p>

            <p>
                <em>
                    No fim, a curiosidade era toda minha. 🤭
                </em>
            </p>

        </section>
    );
}