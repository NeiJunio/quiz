type NameStepProps = {
    nome: string;
    onNomeChange(novoNome: string): void;
    onContinuar: () => void;
    website: string;
    onWebsiteChange: (valor: string) => void;
}

export default function NameStep({ nome, onNomeChange, onContinuar, website, onWebsiteChange }: NameStepProps) {

    return (
        <section>

            <h1>Quiz Misterioso</h1>

            <p>Antes de começarmos, digite seu nome:</p>
            <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(event) => onNomeChange(event.target.value)}
            />


            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: "-10000px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                }}
            >
                <label htmlFor="website">
                    Seu site
                </label>

                <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    value={website}
                    onChange={(event) => {
                        onWebsiteChange(event.target.value);
                    }}
                />
            </div>


            <button
                type="button"
                onClick={onContinuar}
            >
                Avançar
            </button>
        </section>
    )

}